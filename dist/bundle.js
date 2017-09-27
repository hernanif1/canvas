/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = calculateParalelogramAndYellowCircle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maths__ = __webpack_require__(3);


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
/* harmony export (immutable) */ __webpack_exports__["a"] = Circles;


// Paralelogram class
const Paralelogram = () => {
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
    let newArea = Object(__WEBPACK_IMPORTED_MODULE_0__maths__["a" /* determinante */])([[x1, y1, 1], [x2, y2, 1], [x3, y3, 1]])
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
/* harmony export (immutable) */ __webpack_exports__["b"] = Paralelogram;


// After calculate the paralelogram area
// is necessary to use same area to create the yello circle
function calculateParalelogramAndYellowCircle (_circles, _paralelogram) {
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const writeInfos = (_circles, paralelogramAndYellowCircleArea, _selectedPointsTextField, _objectsAreaTextField) => {
  let strSelectedPoints = _circles.map((circle, index) => `${index + 1} x:${circle.x}, y:${circle.y} <br />`)
  _selectedPointsTextField.innerHTML = `Selected points: <br /> ${strSelectedPoints.join('')}`

  if (paralelogramAndYellowCircleArea) {
    _objectsAreaTextField.innerHTML = `Paralelogram and Circle area: ${paralelogramAndYellowCircleArea}`
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = writeInfos;


const resetCanvasContext = (_context, _canvas) => {
  _context.clearRect(0, 0, _canvas.width, _canvas.height)
  _context.fillStyle = 'white'
  _context.fillRect(0, 0, _canvas.width, _canvas.height)
}
/* harmony export (immutable) */ __webpack_exports__["a"] = resetCanvasContext;


const resetTextInfos = (_selectedPointsTextField, _objectsAreaTextField) => {
  _selectedPointsTextField.innerHTML = ''
  _objectsAreaTextField.innerHTML = ''
}
/* harmony export (immutable) */ __webpack_exports__["b"] = resetTextInfos;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userInteractions__ = __webpack_require__(4);




(function () {
  function init () {
    // Get screen elements
    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')
    const selectedPointsTextField = document.querySelector('div[data-js="selected-points"]')
    const objectsAreaTextField = document.querySelector('span[data-js="objects-area"]')

    // Initialize canvas board
    Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* resetCanvasContext */])(context, canvas)

    // Initialize shapes
    let circles = Object(__WEBPACK_IMPORTED_MODULE_0__shapes__["a" /* Circles */])()
    let paralelogram = Object(__WEBPACK_IMPORTED_MODULE_0__shapes__["b" /* Paralelogram */])()
    let boundries = canvas.getBoundingClientRect()

    // User interactions (create red circles)
    Object(__WEBPACK_IMPORTED_MODULE_2__userInteractions__["c" /* mouseUp */])(
      canvas,
      context,
      circles,
      paralelogram,
      __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* resetCanvasContext */],
      selectedPointsTextField,
      objectsAreaTextField,
      boundries
    )

    // On down check if is over a red circle
    Object(__WEBPACK_IMPORTED_MODULE_2__userInteractions__["a" /* mouseDown */])(canvas, circles, boundries)

    // On move over canvas
    Object(__WEBPACK_IMPORTED_MODULE_2__userInteractions__["b" /* mouseMove */])(
      canvas,
      context,
      circles,
      paralelogram,
      __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* resetCanvasContext */],
      selectedPointsTextField,
      objectsAreaTextField,
      boundries
    )

    // User reset
    const buttonReset = document.querySelector('a[data-js="reset"]')
    Object(__WEBPACK_IMPORTED_MODULE_2__userInteractions__["d" /* resetCanvas */])(
      buttonReset,
      context,
      canvas,
      selectedPointsTextField,
      objectsAreaTextField,
      circles,
      paralelogram,
      __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* resetCanvasContext */],
      __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* resetTextInfos */]
    )
  }
  init()
})()


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const determinante = (a) => {
  var ordem = a.length

  if (ordem === 1) {
    return a[0][0]
  }

  if (ordem === 2) {
    return a[0][0] * a[1][1] - a[0][1] * a[1][0]
  }

  var det = 0

  for (var j = 0; j < ordem; j++) {
    det += a[0][j] * cofator(a, 0, j)
  }

  return det
}
/* harmony export (immutable) */ __webpack_exports__["a"] = determinante;


function cofator (a, linha, coluna) {
  var subMatriz = []
  var ordem = a.length
  var m = 0

  for (var i = 1; i < ordem; i++) {
    subMatriz[m] = []

    for (var j = 0; j < ordem; j++) {
      if (j !== coluna) {
        subMatriz[m].push(a[i][j])
      }
    }
    m++
  }

  return (coluna % 2 ? -1 : 1) * determinante(subMatriz)
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mouseDown;
/* harmony export (immutable) */ __webpack_exports__["c"] = mouseUp;
/* harmony export (immutable) */ __webpack_exports__["b"] = mouseMove;
/* harmony export (immutable) */ __webpack_exports__["d"] = resetCanvas;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__draw__ = __webpack_require__(5);




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

  let {paralelogramPositions, yellowCicle} = Object(__WEBPACK_IMPORTED_MODULE_0__shapes__["c" /* calculateParalelogramAndYellowCircle */])(_circles, _paralelogram)
  Object(__WEBPACK_IMPORTED_MODULE_2__draw__["a" /* default */])(_canvas, _context, _circles.get(), paralelogramPositions || undefined, yellowCicle, _resetCanvasContext)
}

// handle mousedown events
function mouseDown (_canvas, _circles, boundries) {
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
function mouseUp (
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
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* writeInfos */])(_circles.get(), _paralelogram.area(), _selectedPointsTextField, _objectsAreaTextField)
    }
    // clear all the dragging flags
    dragging = false
    for (var i = 0; i < _circles.length(); i++) {
      _circles.get()[i].isDragging = false
    }
  })
}

// handle mouse moves
function mouseMove (
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
      let {paralelogramPositions, yellowCicle} = Object(__WEBPACK_IMPORTED_MODULE_0__shapes__["c" /* calculateParalelogramAndYellowCircle */])(_circles, _paralelogram)
      Object(__WEBPACK_IMPORTED_MODULE_2__draw__["a" /* default */])(_canvas, _context, _circles.get(), paralelogramPositions, yellowCicle, _resetCanvasContext)

      // rewrite new positions informations at screen
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* writeInfos */])(_circles.get(), _paralelogram.area(), _selectedPointsTextField, _objectsAreaTextField)

      // reset the starting mouse position for the next mousemove
      startX = mx
      startY = my
    }
  })
}

function resetCanvas (
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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Draw functions
 */
/* harmony default export */ __webpack_exports__["a"] = ((_canvas, _context, _circles, _paralelogram, _yellowCircle, _resetCanvasContext) => {
  _resetCanvasContext(_context, _canvas)

  // Draw Circles
  for (var i = 0; i < _circles.length; i++) {
    drawCircle(_context, _circles[i])
  }

  // Draw Paralelogram and Yellow Circle
  if (_paralelogram) drawParalelogram(_context, _paralelogram)
  if (_yellowCircle) drawYellowCircle(_context, _yellowCircle)
});

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


/***/ })
/******/ ]);