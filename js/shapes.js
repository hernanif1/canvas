import { determinante } from './maths'

// Circles class
export const Circles = () => {
  let circles = []
  return {
    addCircle: (x, y) => {
      var circle = {
        x,
        y,
        radius: 11 / 2,
        color: 'red',
        startAngle: 0,
        endAngle: Math.PI * 2,
        isDragging: false
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

// Paralelogram class
export const Paralelogram = () => {
  let paralelogram = {}

  // Find the median of the triagle
  const setCenter = (_x1, _y1, _x2, _y2) => {
    let mx = (_x1 + _x2) / 2
    let my = (_y1 + _y2) / 2
    paralelogram.center = { x: mx, y: my }
  }

  // Find the position of the 4º element by the median
  const setNewPoint = (_centerX, _centerY, _x, _y) => {
    let x = (2 * _centerX) - _x
    let y = (2 * _centerY) - _y
    paralelogram.points = [ ...paralelogram.points, { x, y } ]
  }

  // Set the area of paralelogram
  const setArea = (x1, y1, x2, y2, x3, y3) => {
    let newArea = determinante([[x1, y1, 1], [x2, y2, 1], [x3, y3, 1]])
    newArea = newArea < 0 ? newArea * -1 : newArea
    paralelogram.area = newArea
  }

  return {
    points: () => paralelogram.points,
    center: () => paralelogram.center,
    area: () => paralelogram.area,
    get: () => paralelogram,
    reset: () => { paralelogram = {} },
    create: (_points) => { // {[{x: Number, y: Number}]} Array of triangle positions
      paralelogram.points = _points
      setCenter(_points[0].x, _points[0].y, _points[2].x, _points[2].y) // [0].x and [0].y are the first point and [2].x and [2].y the last
      setNewPoint(paralelogram.center.x, paralelogram.center.y, _points[1].x, _points[1].y) // x and y are the middle points
      setArea(_points[0].x, _points[0].y, _points[1].x, _points[1].y, _points[2].x, _points[2].y)
      return paralelogram
    }
  }
}

// After calculate the paralelogram area
// is necessary to use same area to create the yello circle
export function calculateParalelogramAndYellowCircle (_circles, _paralelogram) {
  if (_circles.length() >= 3) {
    let positions = _circles.get()
    let trianglePositions = positions.map(o => ({x: o.x, y: o.y})) // calculate the triangles made by three cicles
    let paralelogramPositions = _paralelogram.create(trianglePositions) // with the triangle calculate the paralelogram
    let yellowCicle = calculateYellowCircleByArea(_paralelogram.area(), _paralelogram.center()) // use same area of paralelogram to yellowCircle
    return { paralelogramPositions, yellowCicle }
  }
  return { paralelogramPositions: undefined, yellowCicle: undefined }
}

// YellowCircle class
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
