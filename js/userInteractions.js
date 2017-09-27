import {calculateParalelogramAndYellowCircle} from './shapes'
import {writeInfos} from './utils'
import drawCanvas from './draw'

// drag related variables
var dragging = false
var startX
var startY

// handle creation of new circles when is just a user click
function userClickedOnCanvas (
  _x,
  _y,
  _canvas,
  _context,
  _circles,
  _paralelogram,
  _resetCanvasContext,
  _selectedPointsTextField,
  _objectsAreaTextField,
  _boundries
) {
  let x = _x - _boundries.left // get x position clicked relative to canvas
  let y = _y - _boundries.top // get y position clicked relative to canvas
  if (_circles.length() === 3) _circles.removeCircle()
  _circles.addCircle(x, y)

  let {paralelogramPositions, yellowCicle} = calculateParalelogramAndYellowCircle(_circles, _paralelogram)
  drawCanvas(_canvas, _context, _circles.get(), paralelogramPositions || undefined, yellowCicle, _resetCanvasContext)
}

// handle mousedown events
export function mouseDown (_canvas, _circles, boundries) {
  // tell the browser we're handling this mouse event
  _canvas.addEventListener('mousedown', function (e) {
    e.preventDefault()
    e.stopPropagation()

    // get the current mouse position
    var mx = parseInt(e.clientX - boundries.left)
    var my = parseInt(e.clientY - boundries.top)

    // test each circle to see if mouse is inside
    dragging = false
    for (var i = 0; i < _circles.length(); i++) {
      var circle = _circles.get()[i]
      let isMouseOverXCirclePosition = mx >= circle.x - (circle.radius * 2) && mx < circle.x + (circle.radius * 2)
      let isMouseOverYCirclePosition = my >= circle.y - (circle.radius * 2) && my <= circle.y + (circle.radius * 2)

      if (isMouseOverXCirclePosition && isMouseOverYCirclePosition) {
      // if yes, set that circle isDragging=true
        dragging = true
        circle.isDragging = true
      }
    }
    // save the current mouse position
    startX = mx
    startY = my
  })
}

// handle mouseup events
export function mouseUp (
  _canvas,
  _context,
  _circles,
  _paralelogram,
  _resetCanvasContext,
  _selectedPointsTextField,
  _objectsAreaTextField,
  _boundries
) {
  // tell the browser we're handling this mouse event
  _canvas.addEventListener('mouseup', function (e) {
    e.preventDefault()
    e.stopPropagation()

    if (dragging === false) {
      userClickedOnCanvas(
        e.clientX,
        e.clientY,
        _canvas,
        _context,
        _circles,
        _paralelogram,
        _resetCanvasContext,
        _selectedPointsTextField,
        _objectsAreaTextField,
        _boundries
      )
      // set positions informations on screen
      writeInfos(_circles.get(), _paralelogram.area(), _selectedPointsTextField, _objectsAreaTextField)
    }
    // clear all the dragging flags
    dragging = false
    for (var i = 0; i < _circles.length(); i++) {
      _circles.get()[i].isDragging = false
    }
  })
}

// handle mouse moves
export function mouseMove (
  _canvas,
  _context,
  _circles,
  _paralelogram,
  _resetCanvasContext,
  _selectedPointsTextField,
  _objectsAreaTextField,
  boundries
) {
  // tell the browser we're handling this mouse event
  _canvas.addEventListener('mousemove', function (e) {
    // if we're dragging anything...
    if (dragging) {
      e.preventDefault()
      e.stopPropagation()

      // get the current mouse position
      var mx = parseInt(e.clientX - boundries.left)
      var my = parseInt(e.clientY - boundries.top)

      // calculate the distance the mouse has moved
      // since the last mousemove
      var dx = mx - startX
      var dy = my - startY

      // move each circle that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      for (var i = 0; i < _circles.length(); i++) {
        var circle = _circles.get()[i]
        if (circle.isDragging) {
          circle.x += dx
          circle.y += dy
        }
      }

      // redraw the scene with the new circle positions
      let {paralelogramPositions, yellowCicle} = calculateParalelogramAndYellowCircle(_circles, _paralelogram)
      drawCanvas(_canvas, _context, _circles.get(), paralelogramPositions, yellowCicle, _resetCanvasContext)

      // rewrite new positions informations at screen
      writeInfos(_circles.get(), _paralelogram.area(), _selectedPointsTextField, _objectsAreaTextField)

      // reset the starting mouse position for the next mousemove
      startX = mx
      startY = my
    }
  })
}

export function resetCanvas (
  button,
  _context,
  _canvas,
  _selectedPointsTextField,
  _objectsAreaTextField,
  _circles,
  _paralelogram,
  _resetCanvasContext,
  _resetTextInfos
) {
  button.addEventListener('click', function (event) {
    _resetCanvasContext(_context, _canvas)
    _resetTextInfos(_selectedPointsTextField, _objectsAreaTextField)
    _circles.reset()
    _paralelogram.reset()
  })
}
