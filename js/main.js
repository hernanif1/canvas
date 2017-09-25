(function () {
  // Circles class
  const Circles = () => {
    let circles = []
    return {
      addCircle: (x, y) => {
        var circle = {
          x,
          y,
          radius: 11 / 2,
          color: 'red',
          startAngle: 0,
          endAngle: Math.PI * 2
        }
        circles.push(circle)
      },
      get: () => circles,
      removeCircle: () => circles.shift(),
      reset: () => { circles = [] },
      length: () => {
        return circles.length
      }
    }
  }

  // YellowCircle
  const calculateYellowCircleByArea = (_area, {x, y}) => {
    return {
      x,
      y,
      radius: Math.sqrt(_area / Math.PI),
      color: 'yellow',
      startAngle: 0,
      endAngle: Math.PI * 2,
      area: _area
    }
  }

  // YellowCircle
  const Paralelogram = () => {
    let paralelogram = {}

    const setCenter = (_x1, _y1, _x2, _y2) => { // Find the median of the triagle
      let mx = (_x1 + _x2) / 2
      let my = (_y1 + _y2) / 2
      paralelogram.center = { x: mx, y: my }
    }
    const setNewPoint = (_centerX, _centerY, _x, _y) => { // Find the position of the 4º element by the median
      let x = (2 * _centerX) - _x
      let y = (2 * _centerY) - _y
      paralelogram.points = [ ...paralelogram.points, { x, y } ]
    }
    const setArea = (_firstY, _secondY, _secondX, _thirdX) => { // Set the area of paralelogram
      let base = _secondX - _thirdX
      base = (base < 0) ? base * -1 : base
      let height = _secondY - _firstY
      height = (height < 0) ? height * -1 : height
      paralelogram.area = base * height
    }

    return {
      points: () => paralelogram.points,
      center: () => paralelogram.center,
      area: () => paralelogram.area,
      get: () => paralelogram,
      create: (_points) => { // {[{x: Number, y: Number}]} Array of triangle positions
        paralelogram.points = _points
        setCenter(_points[0].x, _points[0].y, _points[2].x, _points[2].y) // [0].x and [0].y are the first point and [2].x and [2].y the last
        setNewPoint(paralelogram.center.x, paralelogram.center.y, _points[1].x, _points[1].y) // x and y are the middle points
        setArea(_points[0].y, _points[1].y, _points[1].x, _points[2].x)
        return paralelogram
      }
    }
  }

  /**
   * Draw functions
  */
  function drawCanvas (_canvas, _context, _circles, _paralelogram, _yellowCircle, _resetCanvasContext) {
    // Clear canvas
    _resetCanvasContext(_context, _canvas)

    // Circles
    for (var i = 0; i < _circles.length; i++) {
      drawCircle(_context, _circles[i])
    }

    // Paralelogram and Yellow Circle
    if (_paralelogram) drawParalelogram(_context, _paralelogram)
    if (_yellowCircle) drawYellowCircle(_context, _yellowCircle)
  }

  function drawCircle (_context, { color, x, y, radius, startAngle, endAngle }) {
    _context.fillStyle = color
    _context.beginPath()
    _context.arc(x, y, radius, startAngle, endAngle)
    _context.fill()
    _context.closePath()
  }

  function drawParalelogram (_context, _paralelogram) {
    _context.beginPath()
    _context.moveTo(_paralelogram.points[0].x, _paralelogram.points[0].y)
    _context.lineTo(_paralelogram.points[1].x, _paralelogram.points[1].y)
    _context.lineTo(_paralelogram.points[2].x, _paralelogram.points[2].y)
    _context.lineTo(_paralelogram.points[3].x, _paralelogram.points[3].y)
    _context.strokeStyle = 'blue'
    _context.lineWidth = 2
    _context.closePath()
    _context.stroke()
  }

  function drawYellowCircle (_context, { color, x, y, radius, startAngle, endAngle }) {
    _context.beginPath()
    _context.arc(x, y, radius, startAngle, endAngle)
    _context.strokeStyle = color
    _context.lineWidth = 2
    _context.closePath()
    _context.stroke()
  }
  // End of draws functions

  function userClickedOnCanvas (_x, _y, _canvas, _context, _circles, _paralelogram, _resetCanvasContext, _selectedPointsTextField, _objectsAreaTextField) {
    let rect = _canvas.getBoundingClientRect()
    let x = _x - rect.left // get x position clicked relative to canvas
    let y = _y - rect.top // get y position clicked relative to canvas
    let paralelogramPositions = null
    let yellowCicle = null

    if (_circles.length() === 3) _circles.removeCircle()
    _circles.addCircle(x, y)

    if (_circles.length() >= 3) {
      let positions = _circles.get()
      let trianglePositions = positions.map(o => ({x: o.x, y: o.y}))
      paralelogramPositions = _paralelogram.create(trianglePositions)
      yellowCicle = calculateYellowCircleByArea(_paralelogram.area(), _paralelogram.center())
    }
    drawCanvas(_canvas, _context, _circles.get(), paralelogramPositions, yellowCicle, _resetCanvasContext)
  }

  function writeInfos (_circles, paralelogramAndYellowCircleArea, _selectedPointsTextField, _objectsAreaTextField) {
    let strSelectedPoints = _circles.map((circle, index) => `${index + 1} x:${circle.x}, y:${circle.y} <br />`)
    _selectedPointsTextField.innerHTML = `Selected points: <br /> ${strSelectedPoints.join('')}`

    if (paralelogramAndYellowCircleArea) {
      _objectsAreaTextField.innerHTML = `Paralelogram and Circle area: ${paralelogramAndYellowCircleArea}`
    }
  }

  function resetCanvasContext (_context, _canvas) {
    _context.clearRect(0, 0, _canvas.width, _canvas.height)
    _context.fillStyle = 'white'
    _context.fillRect(0, 0, _canvas.width, _canvas.height)
  }

  function resetTextInfos (_selectedPointsTextField, _objectsAreaTextField) {
    _selectedPointsTextField.innerHTML = ''
    _objectsAreaTextField.innerHTML = ''
  }

  function init () {
    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')
    resetCanvasContext(context, canvas)

    let circlesObj = Circles()
    let paralelogramObj = Paralelogram()
    let selectedPointsTextField = document.querySelector('div[data-js="selected-points"]')
    let objectsAreaTextField = document.querySelector('span[data-js="objects-area"]')

    // User interaction
    canvas.addEventListener('click', function (event) {
      userClickedOnCanvas(
        event.clientX,
        event.clientY,
        canvas,
        context,
        circlesObj,
        paralelogramObj,
        resetCanvasContext,
        selectedPointsTextField,
        objectsAreaTextField
      )
      writeInfos(circlesObj.get(), paralelogramObj.area(), selectedPointsTextField, objectsAreaTextField)
    })

    // User reset
    const reset = document.querySelector('a[data-js="reset"]')
    reset.addEventListener('click', function (event) {
      resetCanvasContext(context, canvas)
      resetTextInfos(selectedPointsTextField, objectsAreaTextField)
      circlesObj.reset()
    })
  }
  init()
})()
