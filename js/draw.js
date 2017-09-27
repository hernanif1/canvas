
/**
 * Draw functions
 */
export default (_canvas, _context, _circles, _paralelogram, _yellowCircle, _resetCanvasContext) => {
  _resetCanvasContext(_context, _canvas)

  // Draw Circles
  for (var i = 0; i < _circles.length; i++) {
    drawCircle(_context, _circles[i])
  }

  // Draw Paralelogram and Yellow Circle
  if (_paralelogram) drawParalelogram(_context, _paralelogram)
  if (_yellowCircle) drawYellowCircle(_context, _yellowCircle)
}

const drawCircle = (_context, { color, x, y, radius, startAngle, endAngle }) => {
  _context.fillStyle = color
  _context.beginPath()
  _context.arc(x, y, radius, startAngle, endAngle)
  _context.fill()
  _context.closePath()
}

const drawParalelogram = (_context, _paralelogram) => {
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

const drawYellowCircle = (_context, { color, x, y, radius, startAngle, endAngle }) => {
  _context.beginPath()
  _context.arc(x, y, radius, startAngle, endAngle)
  _context.strokeStyle = color
  _context.lineWidth = 2
  _context.closePath()
  _context.stroke()
}
