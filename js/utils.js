
export const writeInfos = (_circles, paralelogramAndYellowCircleArea, _selectedPointsTextField, _objectsAreaTextField) => {
  let strSelectedPoints = _circles.map((circle, index) => `${index + 1} x:${circle.x}, y:${circle.y} <br />`)
  _selectedPointsTextField.innerHTML = `Selected points: <br /> ${strSelectedPoints.join('')}`

  if (paralelogramAndYellowCircleArea) {
    _objectsAreaTextField.innerHTML = `Paralelogram and Circle area: ${paralelogramAndYellowCircleArea}`
  }
}

export const resetCanvasContext = (_context, _canvas) => {
  _context.clearRect(0, 0, _canvas.width, _canvas.height)
  _context.fillStyle = 'white'
  _context.fillRect(0, 0, _canvas.width, _canvas.height)
}

export const resetTextInfos = (_selectedPointsTextField, _objectsAreaTextField) => {
  _selectedPointsTextField.innerHTML = ''
  _objectsAreaTextField.innerHTML = ''
}
