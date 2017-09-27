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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _shapes = __webpack_require__(1);

var _utils = __webpack_require__(2);

var _userInteractions = __webpack_require__(5);

(function () {
  function init() {
    // Get screen elements
    var canvas = document.querySelector('#canvas');
    var context = canvas.getContext('2d');
    var selectedPointsTextField = document.querySelector('div[data-js="selected-points"]');
    var objectsAreaTextField = document.querySelector('span[data-js="objects-area"]');

    // Initialize canvas board
    (0, _utils.resetCanvasContext)(context, canvas);

    // Initialize shapes
    var circles = (0, _shapes.Circles)();
    var paralelogram = (0, _shapes.Paralelogram)();
    var boundries = canvas.getBoundingClientRect();

    // User interactions (create red circles)
    (0, _userInteractions.mouseUp)(canvas, context, circles, paralelogram, _utils.resetCanvasContext, selectedPointsTextField, objectsAreaTextField, boundries);

    // On down check if is over a red circle
    (0, _userInteractions.mouseDown)(canvas, circles, boundries);

    // On move over canvas
    (0, _userInteractions.mouseMove)(canvas, context, circles, paralelogram, _utils.resetCanvasContext, selectedPointsTextField, objectsAreaTextField, boundries);

    // User reset
    var buttonReset = document.querySelector('a[data-js="reset"]');
    (0, _userInteractions.resetCanvas)(buttonReset, context, canvas, selectedPointsTextField, objectsAreaTextField, circles, paralelogram, _utils.resetCanvasContext, _utils.resetTextInfos);
  }
  init();
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paralelogram = exports.Circles = undefined;
exports.calculateParalelogramAndYellowCircle = calculateParalelogramAndYellowCircle;

var _maths = __webpack_require__(4);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Circles class
var Circles = exports.Circles = function Circles() {
  var circles = [];
  return {
    addCircle: function addCircle(x, y) {
      var circle = {
        x: x,
        y: y,
        radius: 11 / 2,
        color: 'red',
        startAngle: 0,
        endAngle: Math.PI * 2,
        isDragging: false
      };
      circles.push(circle);
    },
    get: function get() {
      return circles;
    },
    removeCircle: function removeCircle() {
      return circles.shift();
    },
    reset: function reset() {
      circles = [];
    },
    length: function length() {
      return circles.length;
    }
  };
};

// Paralelogram class
var Paralelogram = exports.Paralelogram = function Paralelogram() {
  var paralelogram = {};

  // Find the median of the triagle
  var setCenter = function setCenter(_x1, _y1, _x2, _y2) {
    var mx = (_x1 + _x2) / 2;
    var my = (_y1 + _y2) / 2;
    paralelogram.center = { x: mx, y: my };
  };

  // Find the position of the 4º element by the median
  var setNewPoint = function setNewPoint(_centerX, _centerY, _x, _y) {
    var x = 2 * _centerX - _x;
    var y = 2 * _centerY - _y;
    paralelogram.points = [].concat(_toConsumableArray(paralelogram.points), [{ x: x, y: y }]);
  };

  // Set the area of paralelogram
  var setArea = function setArea(x1, y1, x2, y2, x3, y3) {
    var newArea = (0, _maths.determinante)([[x1, y1, 1], [x2, y2, 1], [x3, y3, 1]]);
    newArea = newArea < 0 ? newArea * -1 : newArea;
    paralelogram.area = newArea;
  };

  return {
    points: function points() {
      return paralelogram.points;
    },
    center: function center() {
      return paralelogram.center;
    },
    area: function area() {
      return paralelogram.area;
    },
    get: function get() {
      return paralelogram;
    },
    reset: function reset() {
      paralelogram = {};
    },
    create: function create(_points) {
      // {[{x: Number, y: Number}]} Array of triangle positions
      paralelogram.points = _points;
      setCenter(_points[0].x, _points[0].y, _points[2].x, _points[2].y); // [0].x and [0].y are the first point and [2].x and [2].y the last
      setNewPoint(paralelogram.center.x, paralelogram.center.y, _points[1].x, _points[1].y); // x and y are the middle points
      setArea(_points[0].x, _points[0].y, _points[1].x, _points[1].y, _points[2].x, _points[2].y);
      return paralelogram;
    }
  };
};

// After calculate the paralelogram area
// is necessary to use same area to create the yello circle
function calculateParalelogramAndYellowCircle(_circles, _paralelogram) {
  if (_circles.length() >= 3) {
    var positions = _circles.get();
    var trianglePositions = positions.map(function (o) {
      return { x: o.x, y: o.y };
    }); // calculate the triangles made by three cicles
    var paralelogramPositions = _paralelogram.create(trianglePositions); // with the triangle calculate the paralelogram
    var yellowCicle = calculateYellowCircleByArea(_paralelogram.area(), _paralelogram.center()); // use same area of paralelogram to yellowCircle
    return { paralelogramPositions: paralelogramPositions, yellowCicle: yellowCicle };
  }
  return { paralelogramPositions: undefined, yellowCicle: undefined };
}

// YellowCircle class
var calculateYellowCircleByArea = function calculateYellowCircleByArea(_area, _ref) {
  var x = _ref.x,
      y = _ref.y;

  return {
    x: x,
    y: y,
    radius: Math.sqrt(_area / Math.PI),
    color: 'yellow',
    startAngle: 0,
    endAngle: Math.PI * 2,
    area: _area
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var writeInfos = exports.writeInfos = function writeInfos(_circles, paralelogramAndYellowCircleArea, _selectedPointsTextField, _objectsAreaTextField) {
  var strSelectedPoints = _circles.map(function (circle, index) {
    return index + 1 + ' x:' + circle.x + ', y:' + circle.y + ' <br />';
  });
  _selectedPointsTextField.innerHTML = 'Selected points: <br /> ' + strSelectedPoints.join('');

  if (paralelogramAndYellowCircleArea) {
    _objectsAreaTextField.innerHTML = 'Paralelogram and Circle area: ' + paralelogramAndYellowCircleArea;
  }
};

var resetCanvasContext = exports.resetCanvasContext = function resetCanvasContext(_context, _canvas) {
  _context.clearRect(0, 0, _canvas.width, _canvas.height);
  _context.fillStyle = 'white';
  _context.fillRect(0, 0, _canvas.width, _canvas.height);
};

var resetTextInfos = exports.resetTextInfos = function resetTextInfos(_selectedPointsTextField, _objectsAreaTextField) {
  _selectedPointsTextField.innerHTML = '';
  _objectsAreaTextField.innerHTML = '';
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Draw functions
 */
exports.default = function (_canvas, _context, _circles, _paralelogram, _yellowCircle, _resetCanvasContext) {
  _resetCanvasContext(_context, _canvas);

  // Draw Circles
  for (var i = 0; i < _circles.length; i++) {
    drawCircle(_context, _circles[i]);
  }

  // Draw Paralelogram and Yellow Circle
  if (_paralelogram) drawParalelogram(_context, _paralelogram);
  if (_yellowCircle) drawYellowCircle(_context, _yellowCircle);
};

var drawCircle = function drawCircle(_context, _ref) {
  var color = _ref.color,
      x = _ref.x,
      y = _ref.y,
      radius = _ref.radius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle;

  _context.fillStyle = color;
  _context.beginPath();
  _context.arc(x, y, radius, startAngle, endAngle);
  _context.fill();
  _context.closePath();
};

var drawParalelogram = function drawParalelogram(_context, _paralelogram) {
  _context.beginPath();
  _context.moveTo(_paralelogram.points[0].x, _paralelogram.points[0].y);
  _context.lineTo(_paralelogram.points[1].x, _paralelogram.points[1].y);
  _context.lineTo(_paralelogram.points[2].x, _paralelogram.points[2].y);
  _context.lineTo(_paralelogram.points[3].x, _paralelogram.points[3].y);
  _context.strokeStyle = 'blue';
  _context.lineWidth = 2;
  _context.closePath();
  _context.stroke();
};

var drawYellowCircle = function drawYellowCircle(_context, _ref2) {
  var color = _ref2.color,
      x = _ref2.x,
      y = _ref2.y,
      radius = _ref2.radius,
      startAngle = _ref2.startAngle,
      endAngle = _ref2.endAngle;

  _context.beginPath();
  _context.arc(x, y, radius, startAngle, endAngle);
  _context.strokeStyle = color;
  _context.lineWidth = 2;
  _context.closePath();
  _context.stroke();
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var determinante = exports.determinante = function determinante(a) {
  var ordem = a.length;

  if (ordem === 1) {
    return a[0][0];
  }

  if (ordem === 2) {
    return a[0][0] * a[1][1] - a[0][1] * a[1][0];
  }

  var det = 0;

  for (var j = 0; j < ordem; j++) {
    det += a[0][j] * cofator(a, 0, j);
  }

  return det;
};

function cofator(a, linha, coluna) {
  var subMatriz = [];
  var ordem = a.length;
  var m = 0;

  for (var i = 1; i < ordem; i++) {
    subMatriz[m] = [];

    for (var j = 0; j < ordem; j++) {
      if (j !== coluna) {
        subMatriz[m].push(a[i][j]);
      }
    }
    m++;
  }

  return (coluna % 2 ? -1 : 1) * determinante(subMatriz);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mouseDown = mouseDown;
exports.mouseUp = mouseUp;
exports.mouseMove = mouseMove;
exports.resetCanvas = resetCanvas;

var _shapes = __webpack_require__(1);

var _utils = __webpack_require__(2);

var _draw = __webpack_require__(3);

var _draw2 = _interopRequireDefault(_draw);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// drag related variables
var dragging = false;
var startX;
var startY;

// handle creation of new circles when is just a user click
function userClickedOnCanvas(_x, _y, _canvas, _context, _circles, _paralelogram, _resetCanvasContext, _selectedPointsTextField, _objectsAreaTextField, _boundries) {
  var x = _x - _boundries.left; // get x position clicked relative to canvas
  var y = _y - _boundries.top; // get y position clicked relative to canvas
  if (_circles.length() === 3) _circles.removeCircle();
  _circles.addCircle(x, y);

  var _calculateParalelogra = (0, _shapes.calculateParalelogramAndYellowCircle)(_circles, _paralelogram),
      paralelogramPositions = _calculateParalelogra.paralelogramPositions,
      yellowCicle = _calculateParalelogra.yellowCicle;

  (0, _draw2.default)(_canvas, _context, _circles.get(), paralelogramPositions || undefined, yellowCicle, _resetCanvasContext);
}

// handle mousedown events
function mouseDown(_canvas, _circles, boundries) {
  // tell the browser we're handling this mouse event
  _canvas.addEventListener('mousedown', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - boundries.left);
    var my = parseInt(e.clientY - boundries.top);

    // test each circle to see if mouse is inside
    dragging = false;
    for (var i = 0; i < _circles.length(); i++) {
      var circle = _circles.get()[i];
      var isMouseOverXCirclePosition = mx >= circle.x - circle.radius * 2 && mx < circle.x + circle.radius * 2;
      var isMouseOverYCirclePosition = my >= circle.y - circle.radius * 2 && my <= circle.y + circle.radius * 2;

      if (isMouseOverXCirclePosition && isMouseOverYCirclePosition) {
        // if yes, set that circle isDragging=true
        dragging = true;
        circle.isDragging = true;
      }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
  });
}

// handle mouseup events
function mouseUp(_canvas, _context, _circles, _paralelogram, _resetCanvasContext, _selectedPointsTextField, _objectsAreaTextField, _boundries) {
  // tell the browser we're handling this mouse event
  _canvas.addEventListener('mouseup', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (dragging === false) {
      userClickedOnCanvas(e.clientX, e.clientY, _canvas, _context, _circles, _paralelogram, _resetCanvasContext, _selectedPointsTextField, _objectsAreaTextField, _boundries);
      // set positions informations on screen
      (0, _utils.writeInfos)(_circles.get(), _paralelogram.area(), _selectedPointsTextField, _objectsAreaTextField);
    }
    // clear all the dragging flags
    dragging = false;
    for (var i = 0; i < _circles.length(); i++) {
      _circles.get()[i].isDragging = false;
    }
  });
}

// handle mouse moves
function mouseMove(_canvas, _context, _circles, _paralelogram, _resetCanvasContext, _selectedPointsTextField, _objectsAreaTextField, boundries) {
  // tell the browser we're handling this mouse event
  _canvas.addEventListener('mousemove', function (e) {
    // if we're dragging anything...
    if (dragging) {
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      var mx = parseInt(e.clientX - boundries.left);
      var my = parseInt(e.clientY - boundries.top);

      // calculate the distance the mouse has moved
      // since the last mousemove
      var dx = mx - startX;
      var dy = my - startY;

      // move each circle that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      for (var i = 0; i < _circles.length(); i++) {
        var circle = _circles.get()[i];
        if (circle.isDragging) {
          circle.x += dx;
          circle.y += dy;
        }
      }

      // redraw the scene with the new circle positions

      var _calculateParalelogra2 = (0, _shapes.calculateParalelogramAndYellowCircle)(_circles, _paralelogram),
          paralelogramPositions = _calculateParalelogra2.paralelogramPositions,
          yellowCicle = _calculateParalelogra2.yellowCicle;

      (0, _draw2.default)(_canvas, _context, _circles.get(), paralelogramPositions, yellowCicle, _resetCanvasContext);

      // rewrite new positions informations at screen
      (0, _utils.writeInfos)(_circles.get(), _paralelogram.area(), _selectedPointsTextField, _objectsAreaTextField);

      // reset the starting mouse position for the next mousemove
      startX = mx;
      startY = my;
    }
  });
}

function resetCanvas(button, _context, _canvas, _selectedPointsTextField, _objectsAreaTextField, _circles, _paralelogram, _resetCanvasContext, _resetTextInfos) {
  button.addEventListener('click', function (event) {
    _resetCanvasContext(_context, _canvas);
    _resetTextInfos(_selectedPointsTextField, _objectsAreaTextField);
    _circles.reset();
    _paralelogram.reset();
  });
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDIwYzlhOWI5OWNjMWVlMjRhZTYiLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zaGFwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZHJhdy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tYXRocy5qcyIsIndlYnBhY2s6Ly8vLi9qcy91c2VySW50ZXJhY3Rpb25zLmpzIl0sIm5hbWVzIjpbImluaXQiLCJjYW52YXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInNlbGVjdGVkUG9pbnRzVGV4dEZpZWxkIiwib2JqZWN0c0FyZWFUZXh0RmllbGQiLCJjaXJjbGVzIiwicGFyYWxlbG9ncmFtIiwiYm91bmRyaWVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYnV0dG9uUmVzZXQiLCJjYWxjdWxhdGVQYXJhbGVsb2dyYW1BbmRZZWxsb3dDaXJjbGUiLCJDaXJjbGVzIiwiYWRkQ2lyY2xlIiwieCIsInkiLCJjaXJjbGUiLCJyYWRpdXMiLCJjb2xvciIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsIk1hdGgiLCJQSSIsImlzRHJhZ2dpbmciLCJwdXNoIiwiZ2V0IiwicmVtb3ZlQ2lyY2xlIiwic2hpZnQiLCJyZXNldCIsImxlbmd0aCIsIlBhcmFsZWxvZ3JhbSIsInNldENlbnRlciIsIl94MSIsIl95MSIsIl94MiIsIl95MiIsIm14IiwibXkiLCJjZW50ZXIiLCJzZXROZXdQb2ludCIsIl9jZW50ZXJYIiwiX2NlbnRlclkiLCJfeCIsIl95IiwicG9pbnRzIiwic2V0QXJlYSIsIngxIiwieTEiLCJ4MiIsInkyIiwieDMiLCJ5MyIsIm5ld0FyZWEiLCJhcmVhIiwiY3JlYXRlIiwiX3BvaW50cyIsIl9jaXJjbGVzIiwiX3BhcmFsZWxvZ3JhbSIsInBvc2l0aW9ucyIsInRyaWFuZ2xlUG9zaXRpb25zIiwibWFwIiwibyIsInBhcmFsZWxvZ3JhbVBvc2l0aW9ucyIsInllbGxvd0NpY2xlIiwiY2FsY3VsYXRlWWVsbG93Q2lyY2xlQnlBcmVhIiwidW5kZWZpbmVkIiwiX2FyZWEiLCJzcXJ0Iiwid3JpdGVJbmZvcyIsInBhcmFsZWxvZ3JhbUFuZFllbGxvd0NpcmNsZUFyZWEiLCJfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQiLCJfb2JqZWN0c0FyZWFUZXh0RmllbGQiLCJzdHJTZWxlY3RlZFBvaW50cyIsImluZGV4IiwiaW5uZXJIVE1MIiwiam9pbiIsInJlc2V0Q2FudmFzQ29udGV4dCIsIl9jb250ZXh0IiwiX2NhbnZhcyIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJyZXNldFRleHRJbmZvcyIsIl95ZWxsb3dDaXJjbGUiLCJfcmVzZXRDYW52YXNDb250ZXh0IiwiaSIsImRyYXdDaXJjbGUiLCJkcmF3UGFyYWxlbG9ncmFtIiwiZHJhd1llbGxvd0NpcmNsZSIsImJlZ2luUGF0aCIsImFyYyIsImZpbGwiLCJjbG9zZVBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInN0cm9rZSIsImRldGVybWluYW50ZSIsImEiLCJvcmRlbSIsImRldCIsImoiLCJjb2ZhdG9yIiwibGluaGEiLCJjb2x1bmEiLCJzdWJNYXRyaXoiLCJtIiwibW91c2VEb3duIiwibW91c2VVcCIsIm1vdXNlTW92ZSIsInJlc2V0Q2FudmFzIiwiZHJhZ2dpbmciLCJzdGFydFgiLCJzdGFydFkiLCJ1c2VyQ2xpY2tlZE9uQ2FudmFzIiwiX2JvdW5kcmllcyIsImxlZnQiLCJ0b3AiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicGFyc2VJbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsImlzTW91c2VPdmVyWENpcmNsZVBvc2l0aW9uIiwiaXNNb3VzZU92ZXJZQ2lyY2xlUG9zaXRpb24i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VUFBWCxFQUF1QjtBQUNyQlAsaUJBQU9GLENBQVAsSUFBWW9ILEVBQVo7QUFDQWxILGlCQUFPRCxDQUFQLElBQVlvSCxFQUFaO0FBQ0Q7QUFDRjs7QUFFRDs7QUF4QlksbUNBeUIrQixrREFBcUMzRSxRQUFyQyxFQUErQ0MsYUFBL0MsQ0F6Qi9CO0FBQUEsVUF5QlBLLHFCQXpCTywwQkF5QlBBLHFCQXpCTztBQUFBLFVBeUJnQkMsV0F6QmhCLDBCQXlCZ0JBLFdBekJoQjs7QUEwQlosMEJBQVdlLE9BQVgsRUFBb0JELFFBQXBCLEVBQThCckIsU0FBUy9CLEdBQVQsRUFBOUIsRUFBOENxQyxxQkFBOUMsRUFBcUVDLFdBQXJFLEVBQWtGdUIsbUJBQWxGOztBQUVBO0FBQ0EsNkJBQVc5QixTQUFTL0IsR0FBVCxFQUFYLEVBQTJCZ0MsY0FBY0osSUFBZCxFQUEzQixFQUFpRGlCLHdCQUFqRCxFQUEyRUMscUJBQTNFOztBQUVBO0FBQ0E0QyxlQUFTL0UsRUFBVDtBQUNBZ0YsZUFBUy9FLEVBQVQ7QUFDRDtBQUNGLEdBckNEO0FBc0NEOztBQUVNLFNBQVM0RSxXQUFULENBQ0xtQixNQURLLEVBRUx2RCxRQUZLLEVBR0xDLE9BSEssRUFJTFIsd0JBSkssRUFLTEMscUJBTEssRUFNTGYsUUFOSyxFQU9MQyxhQVBLLEVBUUw2QixtQkFSSyxFQVNMK0MsZUFUSyxFQVVMO0FBQ0FELFNBQU9YLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVVhLEtBQVYsRUFBaUI7QUFDaERoRCx3QkFBb0JULFFBQXBCLEVBQThCQyxPQUE5QjtBQUNBdUQsb0JBQWdCL0Qsd0JBQWhCLEVBQTBDQyxxQkFBMUM7QUFDQWYsYUFBUzVCLEtBQVQ7QUFDQTZCLGtCQUFjN0IsS0FBZDtBQUNELEdBTEQ7QUFNRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQyMGM5YTliOTljYzFlZTI0YWU2IiwiaW1wb3J0IHtDaXJjbGVzLCBQYXJhbGVsb2dyYW19IGZyb20gJy4vc2hhcGVzJ1xuaW1wb3J0IHtyZXNldENhbnZhc0NvbnRleHQsIHJlc2V0VGV4dEluZm9zfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHtyZXNldENhbnZhcywgbW91c2VNb3ZlLCBtb3VzZURvd24sIG1vdXNlVXB9IGZyb20gJy4vdXNlckludGVyYWN0aW9ucydcblxuKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgLy8gR2V0IHNjcmVlbiBlbGVtZW50c1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKVxuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGNvbnN0IHNlbGVjdGVkUG9pbnRzVGV4dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2RhdGEtanM9XCJzZWxlY3RlZC1wb2ludHNcIl0nKVxuICAgIGNvbnN0IG9iamVjdHNBcmVhVGV4dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbltkYXRhLWpzPVwib2JqZWN0cy1hcmVhXCJdJylcblxuICAgIC8vIEluaXRpYWxpemUgY2FudmFzIGJvYXJkXG4gICAgcmVzZXRDYW52YXNDb250ZXh0KGNvbnRleHQsIGNhbnZhcylcblxuICAgIC8vIEluaXRpYWxpemUgc2hhcGVzXG4gICAgbGV0IGNpcmNsZXMgPSBDaXJjbGVzKClcbiAgICBsZXQgcGFyYWxlbG9ncmFtID0gUGFyYWxlbG9ncmFtKClcbiAgICBsZXQgYm91bmRyaWVzID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAvLyBVc2VyIGludGVyYWN0aW9ucyAoY3JlYXRlIHJlZCBjaXJjbGVzKVxuICAgIG1vdXNlVXAoXG4gICAgICBjYW52YXMsXG4gICAgICBjb250ZXh0LFxuICAgICAgY2lyY2xlcyxcbiAgICAgIHBhcmFsZWxvZ3JhbSxcbiAgICAgIHJlc2V0Q2FudmFzQ29udGV4dCxcbiAgICAgIHNlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLFxuICAgICAgb2JqZWN0c0FyZWFUZXh0RmllbGQsXG4gICAgICBib3VuZHJpZXNcbiAgICApXG5cbiAgICAvLyBPbiBkb3duIGNoZWNrIGlmIGlzIG92ZXIgYSByZWQgY2lyY2xlXG4gICAgbW91c2VEb3duKGNhbnZhcywgY2lyY2xlcywgYm91bmRyaWVzKVxuXG4gICAgLy8gT24gbW92ZSBvdmVyIGNhbnZhc1xuICAgIG1vdXNlTW92ZShcbiAgICAgIGNhbnZhcyxcbiAgICAgIGNvbnRleHQsXG4gICAgICBjaXJjbGVzLFxuICAgICAgcGFyYWxlbG9ncmFtLFxuICAgICAgcmVzZXRDYW52YXNDb250ZXh0LFxuICAgICAgc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQsXG4gICAgICBvYmplY3RzQXJlYVRleHRGaWVsZCxcbiAgICAgIGJvdW5kcmllc1xuICAgIClcblxuICAgIC8vIFVzZXIgcmVzZXRcbiAgICBjb25zdCBidXR0b25SZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FbZGF0YS1qcz1cInJlc2V0XCJdJylcbiAgICByZXNldENhbnZhcyhcbiAgICAgIGJ1dHRvblJlc2V0LFxuICAgICAgY29udGV4dCxcbiAgICAgIGNhbnZhcyxcbiAgICAgIHNlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLFxuICAgICAgb2JqZWN0c0FyZWFUZXh0RmllbGQsXG4gICAgICBjaXJjbGVzLFxuICAgICAgcGFyYWxlbG9ncmFtLFxuICAgICAgcmVzZXRDYW52YXNDb250ZXh0LFxuICAgICAgcmVzZXRUZXh0SW5mb3NcbiAgICApXG4gIH1cbiAgaW5pdCgpXG59KSgpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tYWluLmpzIiwiaW1wb3J0IHsgZGV0ZXJtaW5hbnRlIH0gZnJvbSAnLi9tYXRocydcblxuLy8gQ2lyY2xlcyBjbGFzc1xuZXhwb3J0IGNvbnN0IENpcmNsZXMgPSAoKSA9PiB7XG4gIGxldCBjaXJjbGVzID0gW11cbiAgcmV0dXJuIHtcbiAgICBhZGRDaXJjbGU6ICh4LCB5KSA9PiB7XG4gICAgICB2YXIgY2lyY2xlID0ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICByYWRpdXM6IDExIC8gMixcbiAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICBzdGFydEFuZ2xlOiAwLFxuICAgICAgICBlbmRBbmdsZTogTWF0aC5QSSAqIDIsXG4gICAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlXG4gICAgICB9XG4gICAgICBjaXJjbGVzLnB1c2goY2lyY2xlKVxuICAgIH0sXG4gICAgZ2V0OiAoKSA9PiBjaXJjbGVzLFxuICAgIHJlbW92ZUNpcmNsZTogKCkgPT4gY2lyY2xlcy5zaGlmdCgpLFxuICAgIHJlc2V0OiAoKSA9PiB7IGNpcmNsZXMgPSBbXSB9LFxuICAgIGxlbmd0aDogKCkgPT4ge1xuICAgICAgcmV0dXJuIGNpcmNsZXMubGVuZ3RoXG4gICAgfVxuICB9XG59XG5cbi8vIFBhcmFsZWxvZ3JhbSBjbGFzc1xuZXhwb3J0IGNvbnN0IFBhcmFsZWxvZ3JhbSA9ICgpID0+IHtcbiAgbGV0IHBhcmFsZWxvZ3JhbSA9IHt9XG5cbiAgLy8gRmluZCB0aGUgbWVkaWFuIG9mIHRoZSB0cmlhZ2xlXG4gIGNvbnN0IHNldENlbnRlciA9IChfeDEsIF95MSwgX3gyLCBfeTIpID0+IHtcbiAgICBsZXQgbXggPSAoX3gxICsgX3gyKSAvIDJcbiAgICBsZXQgbXkgPSAoX3kxICsgX3kyKSAvIDJcbiAgICBwYXJhbGVsb2dyYW0uY2VudGVyID0geyB4OiBteCwgeTogbXkgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgcG9zaXRpb24gb2YgdGhlIDTCuiBlbGVtZW50IGJ5IHRoZSBtZWRpYW5cbiAgY29uc3Qgc2V0TmV3UG9pbnQgPSAoX2NlbnRlclgsIF9jZW50ZXJZLCBfeCwgX3kpID0+IHtcbiAgICBsZXQgeCA9ICgyICogX2NlbnRlclgpIC0gX3hcbiAgICBsZXQgeSA9ICgyICogX2NlbnRlclkpIC0gX3lcbiAgICBwYXJhbGVsb2dyYW0ucG9pbnRzID0gWyAuLi5wYXJhbGVsb2dyYW0ucG9pbnRzLCB7IHgsIHkgfSBdXG4gIH1cblxuICAvLyBTZXQgdGhlIGFyZWEgb2YgcGFyYWxlbG9ncmFtXG4gIGNvbnN0IHNldEFyZWEgPSAoeDEsIHkxLCB4MiwgeTIsIHgzLCB5MykgPT4ge1xuICAgIGxldCBuZXdBcmVhID0gZGV0ZXJtaW5hbnRlKFtbeDEsIHkxLCAxXSwgW3gyLCB5MiwgMV0sIFt4MywgeTMsIDFdXSlcbiAgICBuZXdBcmVhID0gbmV3QXJlYSA8IDAgPyBuZXdBcmVhICogLTEgOiBuZXdBcmVhXG4gICAgcGFyYWxlbG9ncmFtLmFyZWEgPSBuZXdBcmVhXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBvaW50czogKCkgPT4gcGFyYWxlbG9ncmFtLnBvaW50cyxcbiAgICBjZW50ZXI6ICgpID0+IHBhcmFsZWxvZ3JhbS5jZW50ZXIsXG4gICAgYXJlYTogKCkgPT4gcGFyYWxlbG9ncmFtLmFyZWEsXG4gICAgZ2V0OiAoKSA9PiBwYXJhbGVsb2dyYW0sXG4gICAgcmVzZXQ6ICgpID0+IHsgcGFyYWxlbG9ncmFtID0ge30gfSxcbiAgICBjcmVhdGU6IChfcG9pbnRzKSA9PiB7IC8vIHtbe3g6IE51bWJlciwgeTogTnVtYmVyfV19IEFycmF5IG9mIHRyaWFuZ2xlIHBvc2l0aW9uc1xuICAgICAgcGFyYWxlbG9ncmFtLnBvaW50cyA9IF9wb2ludHNcbiAgICAgIHNldENlbnRlcihfcG9pbnRzWzBdLngsIF9wb2ludHNbMF0ueSwgX3BvaW50c1syXS54LCBfcG9pbnRzWzJdLnkpIC8vIFswXS54IGFuZCBbMF0ueSBhcmUgdGhlIGZpcnN0IHBvaW50IGFuZCBbMl0ueCBhbmQgWzJdLnkgdGhlIGxhc3RcbiAgICAgIHNldE5ld1BvaW50KHBhcmFsZWxvZ3JhbS5jZW50ZXIueCwgcGFyYWxlbG9ncmFtLmNlbnRlci55LCBfcG9pbnRzWzFdLngsIF9wb2ludHNbMV0ueSkgLy8geCBhbmQgeSBhcmUgdGhlIG1pZGRsZSBwb2ludHNcbiAgICAgIHNldEFyZWEoX3BvaW50c1swXS54LCBfcG9pbnRzWzBdLnksIF9wb2ludHNbMV0ueCwgX3BvaW50c1sxXS55LCBfcG9pbnRzWzJdLngsIF9wb2ludHNbMl0ueSlcbiAgICAgIHJldHVybiBwYXJhbGVsb2dyYW1cbiAgICB9XG4gIH1cbn1cblxuLy8gQWZ0ZXIgY2FsY3VsYXRlIHRoZSBwYXJhbGVsb2dyYW0gYXJlYVxuLy8gaXMgbmVjZXNzYXJ5IHRvIHVzZSBzYW1lIGFyZWEgdG8gY3JlYXRlIHRoZSB5ZWxsbyBjaXJjbGVcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQYXJhbGVsb2dyYW1BbmRZZWxsb3dDaXJjbGUgKF9jaXJjbGVzLCBfcGFyYWxlbG9ncmFtKSB7XG4gIGlmIChfY2lyY2xlcy5sZW5ndGgoKSA+PSAzKSB7XG4gICAgbGV0IHBvc2l0aW9ucyA9IF9jaXJjbGVzLmdldCgpXG4gICAgbGV0IHRyaWFuZ2xlUG9zaXRpb25zID0gcG9zaXRpb25zLm1hcChvID0+ICh7eDogby54LCB5OiBvLnl9KSkgLy8gY2FsY3VsYXRlIHRoZSB0cmlhbmdsZXMgbWFkZSBieSB0aHJlZSBjaWNsZXNcbiAgICBsZXQgcGFyYWxlbG9ncmFtUG9zaXRpb25zID0gX3BhcmFsZWxvZ3JhbS5jcmVhdGUodHJpYW5nbGVQb3NpdGlvbnMpIC8vIHdpdGggdGhlIHRyaWFuZ2xlIGNhbGN1bGF0ZSB0aGUgcGFyYWxlbG9ncmFtXG4gICAgbGV0IHllbGxvd0NpY2xlID0gY2FsY3VsYXRlWWVsbG93Q2lyY2xlQnlBcmVhKF9wYXJhbGVsb2dyYW0uYXJlYSgpLCBfcGFyYWxlbG9ncmFtLmNlbnRlcigpKSAvLyB1c2Ugc2FtZSBhcmVhIG9mIHBhcmFsZWxvZ3JhbSB0byB5ZWxsb3dDaXJjbGVcbiAgICByZXR1cm4geyBwYXJhbGVsb2dyYW1Qb3NpdGlvbnMsIHllbGxvd0NpY2xlIH1cbiAgfVxuICByZXR1cm4geyBwYXJhbGVsb2dyYW1Qb3NpdGlvbnM6IHVuZGVmaW5lZCwgeWVsbG93Q2ljbGU6IHVuZGVmaW5lZCB9XG59XG5cbi8vIFllbGxvd0NpcmNsZSBjbGFzc1xuY29uc3QgY2FsY3VsYXRlWWVsbG93Q2lyY2xlQnlBcmVhID0gKF9hcmVhLCB7eCwgeX0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICB4LFxuICAgIHksXG4gICAgcmFkaXVzOiBNYXRoLnNxcnQoX2FyZWEgLyBNYXRoLlBJKSxcbiAgICBjb2xvcjogJ3llbGxvdycsXG4gICAgc3RhcnRBbmdsZTogMCxcbiAgICBlbmRBbmdsZTogTWF0aC5QSSAqIDIsXG4gICAgYXJlYTogX2FyZWFcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvc2hhcGVzLmpzIiwiXG5leHBvcnQgY29uc3Qgd3JpdGVJbmZvcyA9IChfY2lyY2xlcywgcGFyYWxlbG9ncmFtQW5kWWVsbG93Q2lyY2xlQXJlYSwgX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLCBfb2JqZWN0c0FyZWFUZXh0RmllbGQpID0+IHtcbiAgbGV0IHN0clNlbGVjdGVkUG9pbnRzID0gX2NpcmNsZXMubWFwKChjaXJjbGUsIGluZGV4KSA9PiBgJHtpbmRleCArIDF9IHg6JHtjaXJjbGUueH0sIHk6JHtjaXJjbGUueX0gPGJyIC8+YClcbiAgX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLmlubmVySFRNTCA9IGBTZWxlY3RlZCBwb2ludHM6IDxiciAvPiAke3N0clNlbGVjdGVkUG9pbnRzLmpvaW4oJycpfWBcblxuICBpZiAocGFyYWxlbG9ncmFtQW5kWWVsbG93Q2lyY2xlQXJlYSkge1xuICAgIF9vYmplY3RzQXJlYVRleHRGaWVsZC5pbm5lckhUTUwgPSBgUGFyYWxlbG9ncmFtIGFuZCBDaXJjbGUgYXJlYTogJHtwYXJhbGVsb2dyYW1BbmRZZWxsb3dDaXJjbGVBcmVhfWBcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVzZXRDYW52YXNDb250ZXh0ID0gKF9jb250ZXh0LCBfY2FudmFzKSA9PiB7XG4gIF9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBfY2FudmFzLndpZHRoLCBfY2FudmFzLmhlaWdodClcbiAgX2NvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJ1xuICBfY29udGV4dC5maWxsUmVjdCgwLCAwLCBfY2FudmFzLndpZHRoLCBfY2FudmFzLmhlaWdodClcbn1cblxuZXhwb3J0IGNvbnN0IHJlc2V0VGV4dEluZm9zID0gKF9zZWxlY3RlZFBvaW50c1RleHRGaWVsZCwgX29iamVjdHNBcmVhVGV4dEZpZWxkKSA9PiB7XG4gIF9zZWxlY3RlZFBvaW50c1RleHRGaWVsZC5pbm5lckhUTUwgPSAnJ1xuICBfb2JqZWN0c0FyZWFUZXh0RmllbGQuaW5uZXJIVE1MID0gJydcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3V0aWxzLmpzIiwiXG4vKipcbiAqIERyYXcgZnVuY3Rpb25zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChfY2FudmFzLCBfY29udGV4dCwgX2NpcmNsZXMsIF9wYXJhbGVsb2dyYW0sIF95ZWxsb3dDaXJjbGUsIF9yZXNldENhbnZhc0NvbnRleHQpID0+IHtcbiAgX3Jlc2V0Q2FudmFzQ29udGV4dChfY29udGV4dCwgX2NhbnZhcylcblxuICAvLyBEcmF3IENpcmNsZXNcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfY2lyY2xlcy5sZW5ndGg7IGkrKykge1xuICAgIGRyYXdDaXJjbGUoX2NvbnRleHQsIF9jaXJjbGVzW2ldKVxuICB9XG5cbiAgLy8gRHJhdyBQYXJhbGVsb2dyYW0gYW5kIFllbGxvdyBDaXJjbGVcbiAgaWYgKF9wYXJhbGVsb2dyYW0pIGRyYXdQYXJhbGVsb2dyYW0oX2NvbnRleHQsIF9wYXJhbGVsb2dyYW0pXG4gIGlmIChfeWVsbG93Q2lyY2xlKSBkcmF3WWVsbG93Q2lyY2xlKF9jb250ZXh0LCBfeWVsbG93Q2lyY2xlKVxufVxuXG5jb25zdCBkcmF3Q2lyY2xlID0gKF9jb250ZXh0LCB7IGNvbG9yLCB4LCB5LCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlIH0pID0+IHtcbiAgX2NvbnRleHQuZmlsbFN0eWxlID0gY29sb3JcbiAgX2NvbnRleHQuYmVnaW5QYXRoKClcbiAgX2NvbnRleHQuYXJjKHgsIHksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpXG4gIF9jb250ZXh0LmZpbGwoKVxuICBfY29udGV4dC5jbG9zZVBhdGgoKVxufVxuXG5jb25zdCBkcmF3UGFyYWxlbG9ncmFtID0gKF9jb250ZXh0LCBfcGFyYWxlbG9ncmFtKSA9PiB7XG4gIF9jb250ZXh0LmJlZ2luUGF0aCgpXG4gIF9jb250ZXh0Lm1vdmVUbyhfcGFyYWxlbG9ncmFtLnBvaW50c1swXS54LCBfcGFyYWxlbG9ncmFtLnBvaW50c1swXS55KVxuICBfY29udGV4dC5saW5lVG8oX3BhcmFsZWxvZ3JhbS5wb2ludHNbMV0ueCwgX3BhcmFsZWxvZ3JhbS5wb2ludHNbMV0ueSlcbiAgX2NvbnRleHQubGluZVRvKF9wYXJhbGVsb2dyYW0ucG9pbnRzWzJdLngsIF9wYXJhbGVsb2dyYW0ucG9pbnRzWzJdLnkpXG4gIF9jb250ZXh0LmxpbmVUbyhfcGFyYWxlbG9ncmFtLnBvaW50c1szXS54LCBfcGFyYWxlbG9ncmFtLnBvaW50c1szXS55KVxuICBfY29udGV4dC5zdHJva2VTdHlsZSA9ICdibHVlJ1xuICBfY29udGV4dC5saW5lV2lkdGggPSAyXG4gIF9jb250ZXh0LmNsb3NlUGF0aCgpXG4gIF9jb250ZXh0LnN0cm9rZSgpXG59XG5cbmNvbnN0IGRyYXdZZWxsb3dDaXJjbGUgPSAoX2NvbnRleHQsIHsgY29sb3IsIHgsIHksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUgfSkgPT4ge1xuICBfY29udGV4dC5iZWdpblBhdGgoKVxuICBfY29udGV4dC5hcmMoeCwgeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSlcbiAgX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvclxuICBfY29udGV4dC5saW5lV2lkdGggPSAyXG4gIF9jb250ZXh0LmNsb3NlUGF0aCgpXG4gIF9jb250ZXh0LnN0cm9rZSgpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9kcmF3LmpzIiwiZXhwb3J0IGNvbnN0IGRldGVybWluYW50ZSA9IChhKSA9PiB7XG4gIHZhciBvcmRlbSA9IGEubGVuZ3RoXG5cbiAgaWYgKG9yZGVtID09PSAxKSB7XG4gICAgcmV0dXJuIGFbMF1bMF1cbiAgfVxuXG4gIGlmIChvcmRlbSA9PT0gMikge1xuICAgIHJldHVybiBhWzBdWzBdICogYVsxXVsxXSAtIGFbMF1bMV0gKiBhWzFdWzBdXG4gIH1cblxuICB2YXIgZGV0ID0gMFxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgb3JkZW07IGorKykge1xuICAgIGRldCArPSBhWzBdW2pdICogY29mYXRvcihhLCAwLCBqKVxuICB9XG5cbiAgcmV0dXJuIGRldFxufVxuXG5mdW5jdGlvbiBjb2ZhdG9yIChhLCBsaW5oYSwgY29sdW5hKSB7XG4gIHZhciBzdWJNYXRyaXogPSBbXVxuICB2YXIgb3JkZW0gPSBhLmxlbmd0aFxuICB2YXIgbSA9IDBcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IG9yZGVtOyBpKyspIHtcbiAgICBzdWJNYXRyaXpbbV0gPSBbXVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBvcmRlbTsgaisrKSB7XG4gICAgICBpZiAoaiAhPT0gY29sdW5hKSB7XG4gICAgICAgIHN1Yk1hdHJpelttXS5wdXNoKGFbaV1bal0pXG4gICAgICB9XG4gICAgfVxuICAgIG0rK1xuICB9XG5cbiAgcmV0dXJuIChjb2x1bmEgJSAyID8gLTEgOiAxKSAqIGRldGVybWluYW50ZShzdWJNYXRyaXopXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tYXRocy5qcyIsImltcG9ydCB7Y2FsY3VsYXRlUGFyYWxlbG9ncmFtQW5kWWVsbG93Q2lyY2xlfSBmcm9tICcuL3NoYXBlcydcbmltcG9ydCB7d3JpdGVJbmZvc30gZnJvbSAnLi91dGlscydcbmltcG9ydCBkcmF3Q2FudmFzIGZyb20gJy4vZHJhdydcblxuLy8gZHJhZyByZWxhdGVkIHZhcmlhYmxlc1xudmFyIGRyYWdnaW5nID0gZmFsc2VcbnZhciBzdGFydFhcbnZhciBzdGFydFlcblxuLy8gaGFuZGxlIGNyZWF0aW9uIG9mIG5ldyBjaXJjbGVzIHdoZW4gaXMganVzdCBhIHVzZXIgY2xpY2tcbmZ1bmN0aW9uIHVzZXJDbGlja2VkT25DYW52YXMgKFxuICBfeCxcbiAgX3ksXG4gIF9jYW52YXMsXG4gIF9jb250ZXh0LFxuICBfY2lyY2xlcyxcbiAgX3BhcmFsZWxvZ3JhbSxcbiAgX3Jlc2V0Q2FudmFzQ29udGV4dCxcbiAgX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLFxuICBfb2JqZWN0c0FyZWFUZXh0RmllbGQsXG4gIF9ib3VuZHJpZXNcbikge1xuICBsZXQgeCA9IF94IC0gX2JvdW5kcmllcy5sZWZ0IC8vIGdldCB4IHBvc2l0aW9uIGNsaWNrZWQgcmVsYXRpdmUgdG8gY2FudmFzXG4gIGxldCB5ID0gX3kgLSBfYm91bmRyaWVzLnRvcCAvLyBnZXQgeSBwb3NpdGlvbiBjbGlja2VkIHJlbGF0aXZlIHRvIGNhbnZhc1xuICBpZiAoX2NpcmNsZXMubGVuZ3RoKCkgPT09IDMpIF9jaXJjbGVzLnJlbW92ZUNpcmNsZSgpXG4gIF9jaXJjbGVzLmFkZENpcmNsZSh4LCB5KVxuXG4gIGxldCB7cGFyYWxlbG9ncmFtUG9zaXRpb25zLCB5ZWxsb3dDaWNsZX0gPSBjYWxjdWxhdGVQYXJhbGVsb2dyYW1BbmRZZWxsb3dDaXJjbGUoX2NpcmNsZXMsIF9wYXJhbGVsb2dyYW0pXG4gIGRyYXdDYW52YXMoX2NhbnZhcywgX2NvbnRleHQsIF9jaXJjbGVzLmdldCgpLCBwYXJhbGVsb2dyYW1Qb3NpdGlvbnMgfHwgdW5kZWZpbmVkLCB5ZWxsb3dDaWNsZSwgX3Jlc2V0Q2FudmFzQ29udGV4dClcbn1cblxuLy8gaGFuZGxlIG1vdXNlZG93biBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBtb3VzZURvd24gKF9jYW52YXMsIF9jaXJjbGVzLCBib3VuZHJpZXMpIHtcbiAgLy8gdGVsbCB0aGUgYnJvd3NlciB3ZSdyZSBoYW5kbGluZyB0aGlzIG1vdXNlIGV2ZW50XG4gIF9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAvLyBnZXQgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cbiAgICB2YXIgbXggPSBwYXJzZUludChlLmNsaWVudFggLSBib3VuZHJpZXMubGVmdClcbiAgICB2YXIgbXkgPSBwYXJzZUludChlLmNsaWVudFkgLSBib3VuZHJpZXMudG9wKVxuXG4gICAgLy8gdGVzdCBlYWNoIGNpcmNsZSB0byBzZWUgaWYgbW91c2UgaXMgaW5zaWRlXG4gICAgZHJhZ2dpbmcgPSBmYWxzZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2NpcmNsZXMubGVuZ3RoKCk7IGkrKykge1xuICAgICAgdmFyIGNpcmNsZSA9IF9jaXJjbGVzLmdldCgpW2ldXG4gICAgICBsZXQgaXNNb3VzZU92ZXJYQ2lyY2xlUG9zaXRpb24gPSBteCA+PSBjaXJjbGUueCAtIChjaXJjbGUucmFkaXVzICogMikgJiYgbXggPCBjaXJjbGUueCArIChjaXJjbGUucmFkaXVzICogMilcbiAgICAgIGxldCBpc01vdXNlT3ZlcllDaXJjbGVQb3NpdGlvbiA9IG15ID49IGNpcmNsZS55IC0gKGNpcmNsZS5yYWRpdXMgKiAyKSAmJiBteSA8PSBjaXJjbGUueSArIChjaXJjbGUucmFkaXVzICogMilcblxuICAgICAgaWYgKGlzTW91c2VPdmVyWENpcmNsZVBvc2l0aW9uICYmIGlzTW91c2VPdmVyWUNpcmNsZVBvc2l0aW9uKSB7XG4gICAgICAvLyBpZiB5ZXMsIHNldCB0aGF0IGNpcmNsZSBpc0RyYWdnaW5nPXRydWVcbiAgICAgICAgZHJhZ2dpbmcgPSB0cnVlXG4gICAgICAgIGNpcmNsZS5pc0RyYWdnaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBzYXZlIHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgc3RhcnRYID0gbXhcbiAgICBzdGFydFkgPSBteVxuICB9KVxufVxuXG4vLyBoYW5kbGUgbW91c2V1cCBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBtb3VzZVVwIChcbiAgX2NhbnZhcyxcbiAgX2NvbnRleHQsXG4gIF9jaXJjbGVzLFxuICBfcGFyYWxlbG9ncmFtLFxuICBfcmVzZXRDYW52YXNDb250ZXh0LFxuICBfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQsXG4gIF9vYmplY3RzQXJlYVRleHRGaWVsZCxcbiAgX2JvdW5kcmllc1xuKSB7XG4gIC8vIHRlbGwgdGhlIGJyb3dzZXIgd2UncmUgaGFuZGxpbmcgdGhpcyBtb3VzZSBldmVudFxuICBfY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGlmIChkcmFnZ2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIHVzZXJDbGlja2VkT25DYW52YXMoXG4gICAgICAgIGUuY2xpZW50WCxcbiAgICAgICAgZS5jbGllbnRZLFxuICAgICAgICBfY2FudmFzLFxuICAgICAgICBfY29udGV4dCxcbiAgICAgICAgX2NpcmNsZXMsXG4gICAgICAgIF9wYXJhbGVsb2dyYW0sXG4gICAgICAgIF9yZXNldENhbnZhc0NvbnRleHQsXG4gICAgICAgIF9zZWxlY3RlZFBvaW50c1RleHRGaWVsZCxcbiAgICAgICAgX29iamVjdHNBcmVhVGV4dEZpZWxkLFxuICAgICAgICBfYm91bmRyaWVzXG4gICAgICApXG4gICAgICAvLyBzZXQgcG9zaXRpb25zIGluZm9ybWF0aW9ucyBvbiBzY3JlZW5cbiAgICAgIHdyaXRlSW5mb3MoX2NpcmNsZXMuZ2V0KCksIF9wYXJhbGVsb2dyYW0uYXJlYSgpLCBfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQsIF9vYmplY3RzQXJlYVRleHRGaWVsZClcbiAgICB9XG4gICAgLy8gY2xlYXIgYWxsIHRoZSBkcmFnZ2luZyBmbGFnc1xuICAgIGRyYWdnaW5nID0gZmFsc2VcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9jaXJjbGVzLmxlbmd0aCgpOyBpKyspIHtcbiAgICAgIF9jaXJjbGVzLmdldCgpW2ldLmlzRHJhZ2dpbmcgPSBmYWxzZVxuICAgIH1cbiAgfSlcbn1cblxuLy8gaGFuZGxlIG1vdXNlIG1vdmVzXG5leHBvcnQgZnVuY3Rpb24gbW91c2VNb3ZlIChcbiAgX2NhbnZhcyxcbiAgX2NvbnRleHQsXG4gIF9jaXJjbGVzLFxuICBfcGFyYWxlbG9ncmFtLFxuICBfcmVzZXRDYW52YXNDb250ZXh0LFxuICBfc2VsZWN0ZWRQb2ludHNUZXh0RmllbGQsXG4gIF9vYmplY3RzQXJlYVRleHRGaWVsZCxcbiAgYm91bmRyaWVzXG4pIHtcbiAgLy8gdGVsbCB0aGUgYnJvd3NlciB3ZSdyZSBoYW5kbGluZyB0aGlzIG1vdXNlIGV2ZW50XG4gIF9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAvLyBpZiB3ZSdyZSBkcmFnZ2luZyBhbnl0aGluZy4uLlxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgIC8vIGdldCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuICAgICAgdmFyIG14ID0gcGFyc2VJbnQoZS5jbGllbnRYIC0gYm91bmRyaWVzLmxlZnQpXG4gICAgICB2YXIgbXkgPSBwYXJzZUludChlLmNsaWVudFkgLSBib3VuZHJpZXMudG9wKVxuXG4gICAgICAvLyBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIHRoZSBtb3VzZSBoYXMgbW92ZWRcbiAgICAgIC8vIHNpbmNlIHRoZSBsYXN0IG1vdXNlbW92ZVxuICAgICAgdmFyIGR4ID0gbXggLSBzdGFydFhcbiAgICAgIHZhciBkeSA9IG15IC0gc3RhcnRZXG5cbiAgICAgIC8vIG1vdmUgZWFjaCBjaXJjbGUgdGhhdCBpc0RyYWdnaW5nXG4gICAgICAvLyBieSB0aGUgZGlzdGFuY2UgdGhlIG1vdXNlIGhhcyBtb3ZlZFxuICAgICAgLy8gc2luY2UgdGhlIGxhc3QgbW91c2Vtb3ZlXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9jaXJjbGVzLmxlbmd0aCgpOyBpKyspIHtcbiAgICAgICAgdmFyIGNpcmNsZSA9IF9jaXJjbGVzLmdldCgpW2ldXG4gICAgICAgIGlmIChjaXJjbGUuaXNEcmFnZ2luZykge1xuICAgICAgICAgIGNpcmNsZS54ICs9IGR4XG4gICAgICAgICAgY2lyY2xlLnkgKz0gZHlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZWRyYXcgdGhlIHNjZW5lIHdpdGggdGhlIG5ldyBjaXJjbGUgcG9zaXRpb25zXG4gICAgICBsZXQge3BhcmFsZWxvZ3JhbVBvc2l0aW9ucywgeWVsbG93Q2ljbGV9ID0gY2FsY3VsYXRlUGFyYWxlbG9ncmFtQW5kWWVsbG93Q2lyY2xlKF9jaXJjbGVzLCBfcGFyYWxlbG9ncmFtKVxuICAgICAgZHJhd0NhbnZhcyhfY2FudmFzLCBfY29udGV4dCwgX2NpcmNsZXMuZ2V0KCksIHBhcmFsZWxvZ3JhbVBvc2l0aW9ucywgeWVsbG93Q2ljbGUsIF9yZXNldENhbnZhc0NvbnRleHQpXG5cbiAgICAgIC8vIHJld3JpdGUgbmV3IHBvc2l0aW9ucyBpbmZvcm1hdGlvbnMgYXQgc2NyZWVuXG4gICAgICB3cml0ZUluZm9zKF9jaXJjbGVzLmdldCgpLCBfcGFyYWxlbG9ncmFtLmFyZWEoKSwgX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLCBfb2JqZWN0c0FyZWFUZXh0RmllbGQpXG5cbiAgICAgIC8vIHJlc2V0IHRoZSBzdGFydGluZyBtb3VzZSBwb3NpdGlvbiBmb3IgdGhlIG5leHQgbW91c2Vtb3ZlXG4gICAgICBzdGFydFggPSBteFxuICAgICAgc3RhcnRZID0gbXlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldENhbnZhcyAoXG4gIGJ1dHRvbixcbiAgX2NvbnRleHQsXG4gIF9jYW52YXMsXG4gIF9zZWxlY3RlZFBvaW50c1RleHRGaWVsZCxcbiAgX29iamVjdHNBcmVhVGV4dEZpZWxkLFxuICBfY2lyY2xlcyxcbiAgX3BhcmFsZWxvZ3JhbSxcbiAgX3Jlc2V0Q2FudmFzQ29udGV4dCxcbiAgX3Jlc2V0VGV4dEluZm9zXG4pIHtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgX3Jlc2V0Q2FudmFzQ29udGV4dChfY29udGV4dCwgX2NhbnZhcylcbiAgICBfcmVzZXRUZXh0SW5mb3MoX3NlbGVjdGVkUG9pbnRzVGV4dEZpZWxkLCBfb2JqZWN0c0FyZWFUZXh0RmllbGQpXG4gICAgX2NpcmNsZXMucmVzZXQoKVxuICAgIF9wYXJhbGVsb2dyYW0ucmVzZXQoKVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvdXNlckludGVyYWN0aW9ucy5qcyJdLCJzb3VyY2VSb290IjoiIn0=