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
    // calculate the module of vertices of a triangle but without divide / 2 will be a paralelogram area
    let newArea = Object(__WEBPACK_IMPORTED_MODULE_0__maths__["a" /* determinant */])([[x1, y1, 1], [x2, y2, 1], [x3, y3, 1]])
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
// Infos about positions and circles at screen
const writeInfos = (_circles, paralelogramAndYellowCircleArea, _selectedPointsTextField, _objectsAreaTextField) => {
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
/* harmony export (immutable) */ __webpack_exports__["c"] = writeInfos;


// Remove all informations a point at canvas
const resetCanvasContext = (_context, _canvas) => {
  _context.clearRect(0, 0, _canvas.width, _canvas.height)
  _context.fillStyle = 'white'
  _context.fillRect(0, 0, _canvas.width, _canvas.height)
}
/* harmony export (immutable) */ __webpack_exports__["a"] = resetCanvasContext;


// Clear text outside canvas
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Find the module of triangle array x and y
const determinant = (a) => {
  var order = a.length

  if (order === 1) {
    return a[0][0]
  }

  if (order === 2) {
    return a[0][0] * a[1][1] - a[0][1] * a[1][0]
  }

  var det = 0
  for (var j = 0; j < order; j++) {
    det += a[0][j] * cofactor(a, j)
  }
  return det
}
/* harmony export (immutable) */ __webpack_exports__["a"] = determinant;

// Default cofactor of a given matrix
function cofactor (a, column) {
  var subMatrix = []
  var order = a.length
  var m = 0

  for (var i = 1; i < order; i++) {
    subMatrix[m] = []
    for (var j = 0; j < order; j++) {
      if (j !== column) {
        subMatrix[m].push(a[i][j])
      }
    }
    m++
  }

  return (column % 2 ? -1 : 1) * determinant(subMatrix)
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

// Handle creation of new circles when is just a user click
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
  let x = _x - _boundries.left // Get x position clicked relative to canvas
  let y = _y - _boundries.top // Get y position clicked relative to canvas
  if (_circles.length() === 3) _circles.removeCircle()
  _circles.addCircle(x, y)

  let {paralelogramPositions, yellowCicle} = Object(__WEBPACK_IMPORTED_MODULE_0__shapes__["c" /* calculateParalelogramAndYellowCircle */])(_circles, _paralelogram)
  Object(__WEBPACK_IMPORTED_MODULE_2__draw__["a" /* default */])(_canvas, _context, _circles.get(), paralelogramPositions || undefined, yellowCicle, _resetCanvasContext)
}

// Handle mousedown events
function mouseDown (_canvas, _circles, boundries) {
  // Tell the browser we're handling this mouse event
  _canvas.addEventListener('mousedown', function (e) {
    e.preventDefault()
    e.stopPropagation()

    // Get the current mouse position
    var mx = parseInt(e.clientX - boundries.left)
    var my = parseInt(e.clientY - boundries.top)

    // Test each circle to see if mouse is inside
    dragging = false
    for (var i = 0; i < _circles.length(); i++) {
      var circle = _circles.get()[i]
      let isMouseOverXCirclePosition = mx >= circle.x - (circle.radius * 2) && mx < circle.x + (circle.radius * 2)
      let isMouseOverYCirclePosition = my >= circle.y - (circle.radius * 2) && my <= circle.y + (circle.radius * 2)

      if (isMouseOverXCirclePosition && isMouseOverYCirclePosition) {
      // If yes, set that circle isDragging=true
        dragging = true
        circle.isDragging = true
      }
    }
    // Save the current mouse position
    startX = mx
    startY = my
  })
}

// Handle mouseup events
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
  // Tell the browser we're handling this mouse event
  _canvas.addEventListener('mouseup', function (e) {
    e.preventDefault()
    e.stopPropagation()

    if (dragging === false) {
      // Create a new red circle
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
      // Set positions informations on screen
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* writeInfos */])(_circles.get(), _paralelogram.area(), _selectedPointsTextField, _objectsAreaTextField)
    }
    // Clear all the dragging flags
    dragging = false
    for (var i = 0; i < _circles.length(); i++) {
      _circles.get()[i].isDragging = false
    }
  })
}

// Handle mouse moves
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
  // Tell the browser we're handling this mouse event
  _canvas.addEventListener('mousemove', function (e) {
    // If we're dragging anything...
    if (dragging) {
      e.preventDefault()
      e.stopPropagation()

      // Get the current mouse position
      var mx = parseInt(e.clientX - boundries.left)
      var my = parseInt(e.clientY - boundries.top)

      // Calculate the distance the mouse has moved
      // Since the last mousemove
      var dx = mx - startX
      var dy = my - startY

      // Move each circle that isDragging
      // By the distance the mouse has moved
      // Since the last mousemove
      for (var i = 0; i < _circles.length(); i++) {
        var circle = _circles.get()[i]
        if (circle.isDragging) {
          circle.x += dx
          circle.y += dy
        }
      }

      // Redraw the scene with the new circle positions
      let {paralelogramPositions, yellowCicle} = Object(__WEBPACK_IMPORTED_MODULE_0__shapes__["c" /* calculateParalelogramAndYellowCircle */])(_circles, _paralelogram)
      Object(__WEBPACK_IMPORTED_MODULE_2__draw__["a" /* default */])(_canvas, _context, _circles.get(), paralelogramPositions, yellowCicle, _resetCanvasContext)

      // Rewrite new positions informations at screen
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* writeInfos */])(_circles.get(), _paralelogram.area(), _selectedPointsTextField, _objectsAreaTextField)

      // Reset the starting mouse position for the next mousemove
      startX = mx
      startY = my
    }
  })
}

// Call functions to remove and clear elements at screen
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjU3Y2U0ZmE1NDk4NWQ0ZGQ4ODgiLCJ3ZWJwYWNrOi8vLy4vanMvc2hhcGVzLmpzIiwid2VicGFjazovLy8uL2pzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbWF0aHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvdXNlckludGVyYWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9kcmF3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esa0JBQWtCLGVBQWU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELE9BQU87QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixxQkFBcUI7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsNENBQTRDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjU3Y2U0ZmE1NDk4NWQ0ZGQ4ODgiLCJpbXBvcnQgeyBkZXRlcm1pbmFudCB9IGZyb20gJy4vbWF0aHMnXG5cbi8vIENpcmNsZXMgY2xhc3NcbmV4cG9ydCBjb25zdCBDaXJjbGVzID0gKCkgPT4ge1xuICBsZXQgY2lyY2xlcyA9IFtdXG4gIHJldHVybiB7XG4gICAgYWRkQ2lyY2xlOiAoeCwgeSkgPT4ge1xuICAgICAgdmFyIGNpcmNsZSA9IHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgcmFkaXVzOiAxMSAvIDIsXG4gICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgc3RhcnRBbmdsZTogMCxcbiAgICAgICAgZW5kQW5nbGU6IE1hdGguUEkgKiAyLFxuICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZVxuICAgICAgfVxuICAgICAgY2lyY2xlcy5wdXNoKGNpcmNsZSlcbiAgICB9LFxuICAgIGdldDogKCkgPT4gY2lyY2xlcyxcbiAgICByZW1vdmVDaXJjbGU6ICgpID0+IGNpcmNsZXMuc2hpZnQoKSxcbiAgICByZXNldDogKCkgPT4geyBjaXJjbGVzID0gW10gfSxcbiAgICBsZW5ndGg6ICgpID0+IHtcbiAgICAgIHJldHVybiBjaXJjbGVzLmxlbmd0aFxuICAgIH1cbiAgfVxufVxuXG4vLyBQYXJhbGVsb2dyYW0gY2xhc3NcbmV4cG9ydCBjb25zdCBQYXJhbGVsb2dyYW0gPSAoKSA9PiB7XG4gIGxldCBwYXJhbGVsb2dyYW0gPSB7fVxuXG4gIC8vIEZpbmQgdGhlIG1lZGlhbiBvZiB0aGUgdHJpYWdsZVxuICBjb25zdCBzZXRDZW50ZXIgPSAoX3gxLCBfeTEsIF94MiwgX3kyKSA9PiB7XG4gICAgbGV0IG14ID0gKF94MSArIF94MikgLyAyXG4gICAgbGV0IG15ID0gKF95MSArIF95MikgLyAyXG4gICAgcGFyYWxlbG9ncmFtLmNlbnRlciA9IHsgeDogbXgsIHk6IG15IH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIHBvc2l0aW9uIG9mIHRoZSA0wrogZWxlbWVudCBieSB0aGUgbWVkaWFuXG4gIGNvbnN0IHNldE5ld1BvaW50ID0gKF9jZW50ZXJYLCBfY2VudGVyWSwgX3gsIF95KSA9PiB7XG4gICAgbGV0IHggPSAoMiAqIF9jZW50ZXJYKSAtIF94XG4gICAgbGV0IHkgPSAoMiAqIF9jZW50ZXJZKSAtIF95XG4gICAgcGFyYWxlbG9ncmFtLnBvaW50cyA9IFsgLi4ucGFyYWxlbG9ncmFtLnBvaW50cywgeyB4LCB5IH0gXVxuICB9XG5cbiAgLy8gU2V0IHRoZSBhcmVhIG9mIHBhcmFsZWxvZ3JhbVxuICBjb25zdCBzZXRBcmVhID0gKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpID0+IHtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIG1vZHVsZSBvZiB2ZXJ0aWNlcyBvZiBhIHRyaWFuZ2xlIGJ1dCB3aXRob3V0IGRpdmlkZSAvIDIgd2lsbCBiZSBhIHBhcmFsZWxvZ3JhbSBhcmVhXG4gICAgbGV0IG5ld0FyZWEgPSBkZXRlcm1pbmFudChbW3gxLCB5MSwgMV0sIFt4MiwgeTIsIDFdLCBbeDMsIHkzLCAxXV0pXG4gICAgbmV3QXJlYSA9IG5ld0FyZWEgPCAwID8gbmV3QXJlYSAqIC0xIDogbmV3QXJlYVxuICAgIHBhcmFsZWxvZ3JhbS5hcmVhID0gbmV3QXJlYVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwb2ludHM6ICgpID0+IHBhcmFsZWxvZ3JhbS5wb2ludHMsXG4gICAgY2VudGVyOiAoKSA9PiBwYXJhbGVsb2dyYW0uY2VudGVyLFxuICAgIGFyZWE6ICgpID0+IHBhcmFsZWxvZ3JhbS5hcmVhLFxuICAgIGdldDogKCkgPT4gcGFyYWxlbG9ncmFtLFxuICAgIHJlc2V0OiAoKSA9PiB7IHBhcmFsZWxvZ3JhbSA9IHt9IH0sXG4gICAgY3JlYXRlOiAoX3BvaW50cykgPT4geyAvLyB7W3t4OiBOdW1iZXIsIHk6IE51bWJlcn1dfSBBcnJheSBvZiB0cmlhbmdsZSBwb3NpdGlvbnNcbiAgICAgIHBhcmFsZWxvZ3JhbS5wb2ludHMgPSBfcG9pbnRzXG4gICAgICBzZXRDZW50ZXIoX3BvaW50c1swXS54LCBfcG9pbnRzWzBdLnksIF9wb2ludHNbMl0ueCwgX3BvaW50c1syXS55KSAvLyBbMF0ueCBhbmQgWzBdLnkgYXJlIHRoZSBmaXJzdCBwb2ludCBhbmQgWzJdLnggYW5kIFsyXS55IHRoZSBsYXN0XG4gICAgICBzZXROZXdQb2ludChwYXJhbGVsb2dyYW0uY2VudGVyLngsIHBhcmFsZWxvZ3JhbS5jZW50ZXIueSwgX3BvaW50c1sxXS54LCBfcG9pbnRzWzFdLnkpIC8vIHggYW5kIHkgYXJlIHRoZSBtaWRkbGUgcG9pbnRzXG4gICAgICBzZXRBcmVhKF9wb2ludHNbMF0ueCwgX3BvaW50c1swXS55LCBfcG9pbnRzWzFdLngsIF9wb2ludHNbMV0ueSwgX3BvaW50c1syXS54LCBfcG9pbnRzWzJdLnkpXG4gICAgICByZXR1cm4gcGFyYWxlbG9ncmFtXG4gICAgfVxuICB9XG59XG5cbi8vIEFmdGVyIGNhbGN1bGF0ZSB0aGUgcGFyYWxlbG9ncmFtIGFyZWFcbi8vIGlzIG5lY2Vzc2FyeSB0byB1c2Ugc2FtZSBhcmVhIHRvIGNyZWF0ZSB0aGUgeWVsbG8gY2lyY2xlXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUGFyYWxlbG9ncmFtQW5kWWVsbG93Q2lyY2xlIChfY2lyY2xlcywgX3BhcmFsZWxvZ3JhbSkge1xuICBpZiAoX2NpcmNsZXMubGVuZ3RoKCkgPj0gMykge1xuICAgIGxldCBwb3NpdGlvbnMgPSBfY2lyY2xlcy5nZXQoKVxuICAgIGxldCB0cmlhbmdsZVBvc2l0aW9ucyA9IHBvc2l0aW9ucy5tYXAobyA9PiAoe3g6IG8ueCwgeTogby55fSkpIC8vIGNhbGN1bGF0ZSB0aGUgdHJpYW5nbGVzIG1hZGUgYnkgdGhyZWUgY2ljbGVzXG4gICAgbGV0IHBhcmFsZWxvZ3JhbVBvc2l0aW9ucyA9IF9wYXJhbGVsb2dyYW0uY3JlYXRlKHRyaWFuZ2xlUG9zaXRpb25zKSAvLyB3aXRoIHRoZSB0cmlhbmdsZSBjYWxjdWxhdGUgdGhlIHBhcmFsZWxvZ3JhbVxuICAgIGxldCB5ZWxsb3dDaWNsZSA9IGNhbGN1bGF0ZVllbGxvd0NpcmNsZUJ5QXJlYShfcGFyYWxlbG9ncmFtLmFyZWEoKSwgX3BhcmFsZWxvZ3JhbS5jZW50ZXIoKSkgLy8gdXNlIHNhbWUgYXJlYSBvZiBwYXJhbGVsb2dyYW0gdG8geWVsbG93Q2lyY2xlXG4gICAgcmV0dXJuIHsgcGFyYWxlbG9ncmFtUG9zaXRpb25zLCB5ZWxsb3dDaWNsZSB9XG4gIH1cbiAgcmV0dXJuIHsgcGFyYWxlbG9ncmFtUG9zaXRpb25zOiB1bmRlZmluZWQsIHllbGxvd0NpY2xlOiB1bmRlZmluZWQgfVxufVxuXG4vLyBZZWxsb3dDaXJjbGUgY2xhc3NcbmNvbnN0IGNhbGN1bGF0ZVllbGxvd0NpcmNsZUJ5QXJlYSA9IChfYXJlYSwge3gsIHl9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgeCxcbiAgICB5LFxuICAgIHJhZGl1czogTWF0aC5zcXJ0KF9hcmVhIC8gTWF0aC5QSSksXG4gICAgY29sb3I6ICd5ZWxsb3cnLFxuICAgIHN0YXJ0QW5nbGU6IDAsXG4gICAgZW5kQW5nbGU6IE1hdGguUEkgKiAyLFxuICAgIGFyZWE6IF9hcmVhXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvc2hhcGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEluZm9zIGFib3V0IHBvc2l0aW9ucyBhbmQgY2lyY2xlcyBhdCBzY3JlZW5cbmV4cG9ydCBjb25zdCB3cml0ZUluZm9zID0gKF9jaXJjbGVzLCBwYXJhbGVsb2dyYW1BbmRZZWxsb3dDaXJjbGVBcmVhLCBfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQsIF9vYmplY3RzQXJlYVRleHRGaWVsZCkgPT4ge1xuICBsZXQgc3RyU2VsZWN0ZWRQb2ludHMgPSBfY2lyY2xlcy5tYXAoKGNpcmNsZSwgaW5kZXgpID0+IHtcbiAgICBsZXQgeCA9IHBhcnNlSW50KGNpcmNsZS54KVxuICAgIGxldCB5ID0gcGFyc2VJbnQoY2lyY2xlLnkpXG4gICAgcmV0dXJuIGAke2luZGV4ICsgMX0geDoke3h9LCB5OiR7eX0gPGJyIC8+YFxuICB9KVxuICBfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQuaW5uZXJIVE1MID0gYFNlbGVjdGVkIHBvaW50czogPGJyIC8+ICR7c3RyU2VsZWN0ZWRQb2ludHMuam9pbignJyl9YFxuXG4gIGlmIChwYXJhbGVsb2dyYW1BbmRZZWxsb3dDaXJjbGVBcmVhKSB7XG4gICAgX29iamVjdHNBcmVhVGV4dEZpZWxkLmlubmVySFRNTCA9IGBQYXJhbGVsb2dyYW0gYW5kIENpcmNsZSBhcmVhOiAke3BhcmFsZWxvZ3JhbUFuZFllbGxvd0NpcmNsZUFyZWF9YFxuICB9XG59XG5cbi8vIFJlbW92ZSBhbGwgaW5mb3JtYXRpb25zIGEgcG9pbnQgYXQgY2FudmFzXG5leHBvcnQgY29uc3QgcmVzZXRDYW52YXNDb250ZXh0ID0gKF9jb250ZXh0LCBfY2FudmFzKSA9PiB7XG4gIF9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBfY2FudmFzLndpZHRoLCBfY2FudmFzLmhlaWdodClcbiAgX2NvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJ1xuICBfY29udGV4dC5maWxsUmVjdCgwLCAwLCBfY2FudmFzLndpZHRoLCBfY2FudmFzLmhlaWdodClcbn1cblxuLy8gQ2xlYXIgdGV4dCBvdXRzaWRlIGNhbnZhc1xuZXhwb3J0IGNvbnN0IHJlc2V0VGV4dEluZm9zID0gKF9zZWxlY3RlZFBvaW50c1RleHRGaWVsZCwgX29iamVjdHNBcmVhVGV4dEZpZWxkKSA9PiB7XG4gIF9zZWxlY3RlZFBvaW50c1RleHRGaWVsZC5pbm5lckhUTUwgPSAnJ1xuICBfb2JqZWN0c0FyZWFUZXh0RmllbGQuaW5uZXJIVE1MID0gJydcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtDaXJjbGVzLCBQYXJhbGVsb2dyYW19IGZyb20gJy4vc2hhcGVzJ1xuaW1wb3J0IHtyZXNldENhbnZhc0NvbnRleHQsIHJlc2V0VGV4dEluZm9zfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHtyZXNldENhbnZhcywgbW91c2VNb3ZlLCBtb3VzZURvd24sIG1vdXNlVXB9IGZyb20gJy4vdXNlckludGVyYWN0aW9ucydcblxuZnVuY3Rpb24gaW5pdCAoKSB7XG4gIC8vIEdldCBzY3JlZW4gZWxlbWVudHNcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpXG4gIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICBjb25zdCBzZWxlY3RlZFBvaW50c1RleHRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltkYXRhLWpzPVwic2VsZWN0ZWQtcG9pbnRzXCJdJylcbiAgY29uc3Qgb2JqZWN0c0FyZWFUZXh0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuW2RhdGEtanM9XCJvYmplY3RzLWFyZWFcIl0nKVxuXG4gIC8vIEluaXRpYWxpemUgY2FudmFzIGJvYXJkXG4gIHJlc2V0Q2FudmFzQ29udGV4dChjb250ZXh0LCBjYW52YXMpXG5cbiAgLy8gSW5pdGlhbGl6ZSBzaGFwZXNcbiAgbGV0IGNpcmNsZXMgPSBDaXJjbGVzKClcbiAgbGV0IHBhcmFsZWxvZ3JhbSA9IFBhcmFsZWxvZ3JhbSgpXG4gIGxldCBib3VuZHJpZXMgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAvLyBVc2VyIGludGVyYWN0aW9ucyAoY3JlYXRlIHJlZCBjaXJjbGVzKVxuICBtb3VzZVVwKFxuICAgIGNhbnZhcyxcbiAgICBjb250ZXh0LFxuICAgIGNpcmNsZXMsXG4gICAgcGFyYWxlbG9ncmFtLFxuICAgIHJlc2V0Q2FudmFzQ29udGV4dCxcbiAgICBzZWxlY3RlZFBvaW50c1RleHRGaWVsZCxcbiAgICBvYmplY3RzQXJlYVRleHRGaWVsZCxcbiAgICBib3VuZHJpZXNcbiAgKVxuXG4gIC8vIE9uIGRvd24gY2hlY2sgaWYgaXMgb3ZlciBhIHJlZCBjaXJjbGVcbiAgbW91c2VEb3duKGNhbnZhcywgY2lyY2xlcywgYm91bmRyaWVzKVxuXG4gIC8vIE9uIG1vdmUgb3ZlciBjYW52YXNcbiAgbW91c2VNb3ZlKFxuICAgIGNhbnZhcyxcbiAgICBjb250ZXh0LFxuICAgIGNpcmNsZXMsXG4gICAgcGFyYWxlbG9ncmFtLFxuICAgIHJlc2V0Q2FudmFzQ29udGV4dCxcbiAgICBzZWxlY3RlZFBvaW50c1RleHRGaWVsZCxcbiAgICBvYmplY3RzQXJlYVRleHRGaWVsZCxcbiAgICBib3VuZHJpZXNcbiAgKVxuXG4gIC8vIFVzZXIgcmVzZXRcbiAgY29uc3QgYnV0dG9uUmVzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhW2RhdGEtanM9XCJyZXNldFwiXScpXG4gIHJlc2V0Q2FudmFzKFxuICAgIGJ1dHRvblJlc2V0LFxuICAgIGNvbnRleHQsXG4gICAgY2FudmFzLFxuICAgIHNlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLFxuICAgIG9iamVjdHNBcmVhVGV4dEZpZWxkLFxuICAgIGNpcmNsZXMsXG4gICAgcGFyYWxlbG9ncmFtLFxuICAgIHJlc2V0Q2FudmFzQ29udGV4dCxcbiAgICByZXNldFRleHRJbmZvc1xuICApXG59XG5pbml0KClcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBGaW5kIHRoZSBtb2R1bGUgb2YgdHJpYW5nbGUgYXJyYXkgeCBhbmQgeVxuZXhwb3J0IGNvbnN0IGRldGVybWluYW50ID0gKGEpID0+IHtcbiAgdmFyIG9yZGVyID0gYS5sZW5ndGhcblxuICBpZiAob3JkZXIgPT09IDEpIHtcbiAgICByZXR1cm4gYVswXVswXVxuICB9XG5cbiAgaWYgKG9yZGVyID09PSAyKSB7XG4gICAgcmV0dXJuIGFbMF1bMF0gKiBhWzFdWzFdIC0gYVswXVsxXSAqIGFbMV1bMF1cbiAgfVxuXG4gIHZhciBkZXQgPSAwXG4gIGZvciAodmFyIGogPSAwOyBqIDwgb3JkZXI7IGorKykge1xuICAgIGRldCArPSBhWzBdW2pdICogY29mYWN0b3IoYSwgailcbiAgfVxuICByZXR1cm4gZGV0XG59XG4vLyBEZWZhdWx0IGNvZmFjdG9yIG9mIGEgZ2l2ZW4gbWF0cml4XG5mdW5jdGlvbiBjb2ZhY3RvciAoYSwgY29sdW1uKSB7XG4gIHZhciBzdWJNYXRyaXggPSBbXVxuICB2YXIgb3JkZXIgPSBhLmxlbmd0aFxuICB2YXIgbSA9IDBcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IG9yZGVyOyBpKyspIHtcbiAgICBzdWJNYXRyaXhbbV0gPSBbXVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgb3JkZXI7IGorKykge1xuICAgICAgaWYgKGogIT09IGNvbHVtbikge1xuICAgICAgICBzdWJNYXRyaXhbbV0ucHVzaChhW2ldW2pdKVxuICAgICAgfVxuICAgIH1cbiAgICBtKytcbiAgfVxuXG4gIHJldHVybiAoY29sdW1uICUgMiA/IC0xIDogMSkgKiBkZXRlcm1pbmFudChzdWJNYXRyaXgpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21hdGhzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y2FsY3VsYXRlUGFyYWxlbG9ncmFtQW5kWWVsbG93Q2lyY2xlfSBmcm9tICcuL3NoYXBlcydcbmltcG9ydCB7d3JpdGVJbmZvc30gZnJvbSAnLi91dGlscydcbmltcG9ydCBkcmF3Q2FudmFzIGZyb20gJy4vZHJhdydcblxuLy8gZHJhZyByZWxhdGVkIHZhcmlhYmxlc1xudmFyIGRyYWdnaW5nID0gZmFsc2VcbnZhciBzdGFydFhcbnZhciBzdGFydFlcblxuLy8gSGFuZGxlIGNyZWF0aW9uIG9mIG5ldyBjaXJjbGVzIHdoZW4gaXMganVzdCBhIHVzZXIgY2xpY2tcbmZ1bmN0aW9uIHVzZXJDbGlja2VkT25DYW52YXMgKFxuICBfeCxcbiAgX3ksXG4gIF9jYW52YXMsXG4gIF9jb250ZXh0LFxuICBfY2lyY2xlcyxcbiAgX3BhcmFsZWxvZ3JhbSxcbiAgX3Jlc2V0Q2FudmFzQ29udGV4dCxcbiAgX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLFxuICBfb2JqZWN0c0FyZWFUZXh0RmllbGQsXG4gIF9ib3VuZHJpZXNcbikge1xuICBsZXQgeCA9IF94IC0gX2JvdW5kcmllcy5sZWZ0IC8vIEdldCB4IHBvc2l0aW9uIGNsaWNrZWQgcmVsYXRpdmUgdG8gY2FudmFzXG4gIGxldCB5ID0gX3kgLSBfYm91bmRyaWVzLnRvcCAvLyBHZXQgeSBwb3NpdGlvbiBjbGlja2VkIHJlbGF0aXZlIHRvIGNhbnZhc1xuICBpZiAoX2NpcmNsZXMubGVuZ3RoKCkgPT09IDMpIF9jaXJjbGVzLnJlbW92ZUNpcmNsZSgpXG4gIF9jaXJjbGVzLmFkZENpcmNsZSh4LCB5KVxuXG4gIGxldCB7cGFyYWxlbG9ncmFtUG9zaXRpb25zLCB5ZWxsb3dDaWNsZX0gPSBjYWxjdWxhdGVQYXJhbGVsb2dyYW1BbmRZZWxsb3dDaXJjbGUoX2NpcmNsZXMsIF9wYXJhbGVsb2dyYW0pXG4gIGRyYXdDYW52YXMoX2NhbnZhcywgX2NvbnRleHQsIF9jaXJjbGVzLmdldCgpLCBwYXJhbGVsb2dyYW1Qb3NpdGlvbnMgfHwgdW5kZWZpbmVkLCB5ZWxsb3dDaWNsZSwgX3Jlc2V0Q2FudmFzQ29udGV4dClcbn1cblxuLy8gSGFuZGxlIG1vdXNlZG93biBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBtb3VzZURvd24gKF9jYW52YXMsIF9jaXJjbGVzLCBib3VuZHJpZXMpIHtcbiAgLy8gVGVsbCB0aGUgYnJvd3NlciB3ZSdyZSBoYW5kbGluZyB0aGlzIG1vdXNlIGV2ZW50XG4gIF9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cbiAgICB2YXIgbXggPSBwYXJzZUludChlLmNsaWVudFggLSBib3VuZHJpZXMubGVmdClcbiAgICB2YXIgbXkgPSBwYXJzZUludChlLmNsaWVudFkgLSBib3VuZHJpZXMudG9wKVxuXG4gICAgLy8gVGVzdCBlYWNoIGNpcmNsZSB0byBzZWUgaWYgbW91c2UgaXMgaW5zaWRlXG4gICAgZHJhZ2dpbmcgPSBmYWxzZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2NpcmNsZXMubGVuZ3RoKCk7IGkrKykge1xuICAgICAgdmFyIGNpcmNsZSA9IF9jaXJjbGVzLmdldCgpW2ldXG4gICAgICBsZXQgaXNNb3VzZU92ZXJYQ2lyY2xlUG9zaXRpb24gPSBteCA+PSBjaXJjbGUueCAtIChjaXJjbGUucmFkaXVzICogMikgJiYgbXggPCBjaXJjbGUueCArIChjaXJjbGUucmFkaXVzICogMilcbiAgICAgIGxldCBpc01vdXNlT3ZlcllDaXJjbGVQb3NpdGlvbiA9IG15ID49IGNpcmNsZS55IC0gKGNpcmNsZS5yYWRpdXMgKiAyKSAmJiBteSA8PSBjaXJjbGUueSArIChjaXJjbGUucmFkaXVzICogMilcblxuICAgICAgaWYgKGlzTW91c2VPdmVyWENpcmNsZVBvc2l0aW9uICYmIGlzTW91c2VPdmVyWUNpcmNsZVBvc2l0aW9uKSB7XG4gICAgICAvLyBJZiB5ZXMsIHNldCB0aGF0IGNpcmNsZSBpc0RyYWdnaW5nPXRydWVcbiAgICAgICAgZHJhZ2dpbmcgPSB0cnVlXG4gICAgICAgIGNpcmNsZS5pc0RyYWdnaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBTYXZlIHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgc3RhcnRYID0gbXhcbiAgICBzdGFydFkgPSBteVxuICB9KVxufVxuXG4vLyBIYW5kbGUgbW91c2V1cCBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBtb3VzZVVwIChcbiAgX2NhbnZhcyxcbiAgX2NvbnRleHQsXG4gIF9jaXJjbGVzLFxuICBfcGFyYWxlbG9ncmFtLFxuICBfcmVzZXRDYW52YXNDb250ZXh0LFxuICBfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQsXG4gIF9vYmplY3RzQXJlYVRleHRGaWVsZCxcbiAgX2JvdW5kcmllc1xuKSB7XG4gIC8vIFRlbGwgdGhlIGJyb3dzZXIgd2UncmUgaGFuZGxpbmcgdGhpcyBtb3VzZSBldmVudFxuICBfY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGlmIChkcmFnZ2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIENyZWF0ZSBhIG5ldyByZWQgY2lyY2xlXG4gICAgICB1c2VyQ2xpY2tlZE9uQ2FudmFzKFxuICAgICAgICBlLmNsaWVudFgsXG4gICAgICAgIGUuY2xpZW50WSxcbiAgICAgICAgX2NhbnZhcyxcbiAgICAgICAgX2NvbnRleHQsXG4gICAgICAgIF9jaXJjbGVzLFxuICAgICAgICBfcGFyYWxlbG9ncmFtLFxuICAgICAgICBfcmVzZXRDYW52YXNDb250ZXh0LFxuICAgICAgICBfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQsXG4gICAgICAgIF9vYmplY3RzQXJlYVRleHRGaWVsZCxcbiAgICAgICAgX2JvdW5kcmllc1xuICAgICAgKVxuICAgICAgLy8gU2V0IHBvc2l0aW9ucyBpbmZvcm1hdGlvbnMgb24gc2NyZWVuXG4gICAgICB3cml0ZUluZm9zKF9jaXJjbGVzLmdldCgpLCBfcGFyYWxlbG9ncmFtLmFyZWEoKSwgX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLCBfb2JqZWN0c0FyZWFUZXh0RmllbGQpXG4gICAgfVxuICAgIC8vIENsZWFyIGFsbCB0aGUgZHJhZ2dpbmcgZmxhZ3NcbiAgICBkcmFnZ2luZyA9IGZhbHNlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfY2lyY2xlcy5sZW5ndGgoKTsgaSsrKSB7XG4gICAgICBfY2lyY2xlcy5nZXQoKVtpXS5pc0RyYWdnaW5nID0gZmFsc2VcbiAgICB9XG4gIH0pXG59XG5cbi8vIEhhbmRsZSBtb3VzZSBtb3Zlc1xuZXhwb3J0IGZ1bmN0aW9uIG1vdXNlTW92ZSAoXG4gIF9jYW52YXMsXG4gIF9jb250ZXh0LFxuICBfY2lyY2xlcyxcbiAgX3BhcmFsZWxvZ3JhbSxcbiAgX3Jlc2V0Q2FudmFzQ29udGV4dCxcbiAgX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLFxuICBfb2JqZWN0c0FyZWFUZXh0RmllbGQsXG4gIGJvdW5kcmllc1xuKSB7XG4gIC8vIFRlbGwgdGhlIGJyb3dzZXIgd2UncmUgaGFuZGxpbmcgdGhpcyBtb3VzZSBldmVudFxuICBfY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gSWYgd2UncmUgZHJhZ2dpbmcgYW55dGhpbmcuLi5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cbiAgICAgIHZhciBteCA9IHBhcnNlSW50KGUuY2xpZW50WCAtIGJvdW5kcmllcy5sZWZ0KVxuICAgICAgdmFyIG15ID0gcGFyc2VJbnQoZS5jbGllbnRZIC0gYm91bmRyaWVzLnRvcClcblxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkaXN0YW5jZSB0aGUgbW91c2UgaGFzIG1vdmVkXG4gICAgICAvLyBTaW5jZSB0aGUgbGFzdCBtb3VzZW1vdmVcbiAgICAgIHZhciBkeCA9IG14IC0gc3RhcnRYXG4gICAgICB2YXIgZHkgPSBteSAtIHN0YXJ0WVxuXG4gICAgICAvLyBNb3ZlIGVhY2ggY2lyY2xlIHRoYXQgaXNEcmFnZ2luZ1xuICAgICAgLy8gQnkgdGhlIGRpc3RhbmNlIHRoZSBtb3VzZSBoYXMgbW92ZWRcbiAgICAgIC8vIFNpbmNlIHRoZSBsYXN0IG1vdXNlbW92ZVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfY2lyY2xlcy5sZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgIHZhciBjaXJjbGUgPSBfY2lyY2xlcy5nZXQoKVtpXVxuICAgICAgICBpZiAoY2lyY2xlLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjaXJjbGUueCArPSBkeFxuICAgICAgICAgIGNpcmNsZS55ICs9IGR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUmVkcmF3IHRoZSBzY2VuZSB3aXRoIHRoZSBuZXcgY2lyY2xlIHBvc2l0aW9uc1xuICAgICAgbGV0IHtwYXJhbGVsb2dyYW1Qb3NpdGlvbnMsIHllbGxvd0NpY2xlfSA9IGNhbGN1bGF0ZVBhcmFsZWxvZ3JhbUFuZFllbGxvd0NpcmNsZShfY2lyY2xlcywgX3BhcmFsZWxvZ3JhbSlcbiAgICAgIGRyYXdDYW52YXMoX2NhbnZhcywgX2NvbnRleHQsIF9jaXJjbGVzLmdldCgpLCBwYXJhbGVsb2dyYW1Qb3NpdGlvbnMsIHllbGxvd0NpY2xlLCBfcmVzZXRDYW52YXNDb250ZXh0KVxuXG4gICAgICAvLyBSZXdyaXRlIG5ldyBwb3NpdGlvbnMgaW5mb3JtYXRpb25zIGF0IHNjcmVlblxuICAgICAgd3JpdGVJbmZvcyhfY2lyY2xlcy5nZXQoKSwgX3BhcmFsZWxvZ3JhbS5hcmVhKCksIF9zZWxlY3RlZFBvaW50c1RleHRGaWVsZCwgX29iamVjdHNBcmVhVGV4dEZpZWxkKVxuXG4gICAgICAvLyBSZXNldCB0aGUgc3RhcnRpbmcgbW91c2UgcG9zaXRpb24gZm9yIHRoZSBuZXh0IG1vdXNlbW92ZVxuICAgICAgc3RhcnRYID0gbXhcbiAgICAgIHN0YXJ0WSA9IG15XG4gICAgfVxuICB9KVxufVxuXG4vLyBDYWxsIGZ1bmN0aW9ucyB0byByZW1vdmUgYW5kIGNsZWFyIGVsZW1lbnRzIGF0IHNjcmVlblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Q2FudmFzIChcbiAgYnV0dG9uLFxuICBfY29udGV4dCxcbiAgX2NhbnZhcyxcbiAgX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLFxuICBfb2JqZWN0c0FyZWFUZXh0RmllbGQsXG4gIF9jaXJjbGVzLFxuICBfcGFyYWxlbG9ncmFtLFxuICBfcmVzZXRDYW52YXNDb250ZXh0LFxuICBfcmVzZXRUZXh0SW5mb3Ncbikge1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBfcmVzZXRDYW52YXNDb250ZXh0KF9jb250ZXh0LCBfY2FudmFzKVxuICAgIF9yZXNldFRleHRJbmZvcyhfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQsIF9vYmplY3RzQXJlYVRleHRGaWVsZClcbiAgICBfY2lyY2xlcy5yZXNldCgpXG4gICAgX3BhcmFsZWxvZ3JhbS5yZXNldCgpXG4gIH0pXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3VzZXJJbnRlcmFjdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIERyYXcgZnVuY3Rpb25zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChfY2FudmFzLCBfY29udGV4dCwgX2NpcmNsZXMsIF9wYXJhbGVsb2dyYW0sIF95ZWxsb3dDaXJjbGUsIF9yZXNldENhbnZhc0NvbnRleHQpID0+IHtcbiAgX3Jlc2V0Q2FudmFzQ29udGV4dChfY29udGV4dCwgX2NhbnZhcylcblxuICAvLyBEcmF3IENpcmNsZXNcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfY2lyY2xlcy5sZW5ndGg7IGkrKykge1xuICAgIGRyYXdDaXJjbGUoX2NvbnRleHQsIF9jaXJjbGVzW2ldKVxuICB9XG5cbiAgLy8gRHJhdyBQYXJhbGVsb2dyYW0gYW5kIFllbGxvdyBDaXJjbGVcbiAgaWYgKF9wYXJhbGVsb2dyYW0pIGRyYXdQYXJhbGVsb2dyYW0oX2NvbnRleHQsIF9wYXJhbGVsb2dyYW0pXG4gIGlmIChfeWVsbG93Q2lyY2xlKSBkcmF3WWVsbG93Q2lyY2xlKF9jb250ZXh0LCBfeWVsbG93Q2lyY2xlKVxufVxuXG5jb25zdCBkcmF3Q2lyY2xlID0gKF9jb250ZXh0LCB7IGNvbG9yLCB4LCB5LCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlIH0pID0+IHtcbiAgX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3JcbiAgX2NvbnRleHQuYmVnaW5QYXRoKClcbiAgX2NvbnRleHQuYXJjKHgsIHksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpXG4gIF9jb250ZXh0LmZpbGwoKVxuICBfY29udGV4dC5jbG9zZVBhdGgoKVxufVxuXG5jb25zdCBkcmF3UGFyYWxlbG9ncmFtID0gKF9jb250ZXh0LCBfcGFyYWxlbG9ncmFtKSA9PiB7XG4gIF9jb250ZXh0LmJlZ2luUGF0aCgpXG4gIF9jb250ZXh0Lm1vdmVUbyhfcGFyYWxlbG9ncmFtLnBvaW50c1swXS54LCBfcGFyYWxlbG9ncmFtLnBvaW50c1swXS55KVxuICBfY29udGV4dC5saW5lVG8oX3BhcmFsZWxvZ3JhbS5wb2ludHNbMV0ueCwgX3BhcmFsZWxvZ3JhbS5wb2ludHNbMV0ueSlcbiAgX2NvbnRleHQubGluZVRvKF9wYXJhbGVsb2dyYW0ucG9pbnRzWzJdLngsIF9wYXJhbGVsb2dyYW0ucG9pbnRzWzJdLnkpXG4gIF9jb250ZXh0LmxpbmVUbyhfcGFyYWxlbG9ncmFtLnBvaW50c1szXS54LCBfcGFyYWxlbG9ncmFtLnBvaW50c1szXS55KVxuICBfY29udGV4dC5zdHJva2VTdHlsZSA9ICdibHVlJ1xuICBfY29udGV4dC5saW5lV2lkdGggPSAyXG4gIF9jb250ZXh0LmNsb3NlUGF0aCgpXG4gIF9jb250ZXh0LnN0cm9rZSgpXG59XG5cbmNvbnN0IGRyYXdZZWxsb3dDaXJjbGUgPSAoX2NvbnRleHQsIHsgY29sb3IsIHgsIHksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUgfSkgPT4ge1xuICBfY29udGV4dC5iZWdpblBhdGgoKVxuICBfY29udGV4dC5hcmMoeCwgeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSlcbiAgX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvclxuICBfY29udGV4dC5saW5lV2lkdGggPSAyXG4gIF9jb250ZXh0LmNsb3NlUGF0aCgpXG4gIF9jb250ZXh0LnN0cm9rZSgpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2RyYXcuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==