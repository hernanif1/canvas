// Infos about positions and circles at screen
export const writeInfos = (_circles, paralelogramAndYellowCircleArea, _selectedPointsTextField, _objectsAreaTextField) => {
  let strSelectedPoints = _circles.map((circle, index) => {
    let x = parseInt(circle.x)
    let y = parseInt(circle.y)
    return `${index + 1} x:${x}, y:${y} <br />`
  })
  _selectedPointsTextField.innerHTML = `Selected points: <br /> ${strSelectedPoints.join('')}`

  if (paralelogramAndYellowCircleArea) {
    _objectsAreaTextField.innerHTML = `Paralelogram and Circle area: ${paralelogramAndYellowCircleArea}`
  }
}

// Remove all informations a point at canvas
export const resetCanvasContext = (_context, _canvas) => {
  _context.clearRect(0, 0, _canvas.width, _canvas.height)
  _context.fillStyle = 'white'
  _context.fillRect(0, 0, _canvas.width, _canvas.height)
}

// Clear text outside canvas
export const resetTextInfos = (_selectedPointsTextField, _objectsAreaTextField) => {
  _selectedPointsTextField.innerHTML = ''
  _objectsAreaTextField.innerHTML = ''
}
