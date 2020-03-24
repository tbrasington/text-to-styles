var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/setupDocument.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/setupDocument.js":
/*!******************************!*\
  !*** ./src/setupDocument.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  // Remove exisiting Pages
  for (var index = context.document.pages().length - 1; index >= 0; index -= 1) {
    context.document.documentData().removePageAtIndex(index);
  } // Add pages


  var StylesPage = context.document.addBlankPage();
  StylesPage.name = "Styles";
  var AlignmentsPage = context.document.addBlankPage();
  AlignmentsPage.name = "Alignments";
  var ColorsPage = context.document.addBlankPage();
  ColorsPage.name = "Colors"; // Add Text to Styles Page

  var textLayer1 = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Text"]({
    text: "Style 1",
    frame: {
      width: 100,
      height: 32,
      x: 0,
      y: 0
    },
    style: {
      fontFamily: 'Helvetica',
      fontWeight: 8,
      fontSize: 24,
      lineHeight: 24 * 1.5,
      fontStyle: "normal",
      paragraphSpacing: 24 * 1.5,
      kerning: 0
    },
    parent: StylesPage
  });
  textLayer1.name = "Style 1";
  var textLayer2 = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Text"]({
    text: "Style 2",
    frame: {
      width: 100,
      height: 32,
      x: 0,
      y: textLayer1.frame.height + 24
    },
    style: {
      fontFamily: 'Helvetica',
      fontWeight: 4,
      fontSize: 16,
      lineHeight: 16 * 1.5,
      fontStyle: "normal",
      paragraphSpacing: 16 * 1.5,
      kerning: 0
    },
    parent: StylesPage
  });
  textLayer2.name = "Style 2"; // Add Alignments

  var alignmentLayerLeft = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Text"]({
    text: "Left",
    frame: {
      width: 100,
      height: 32,
      x: 0,
      y: 0
    },
    style: {
      fontFamily: 'Helvetica',
      fontWeight: 4,
      fontSize: 16,
      lineHeight: 16 * 1.5,
      fontStyle: "normal",
      paragraphSpacing: 16 * 1.5,
      kerning: 0,
      alignment: 'left'
    },
    parent: AlignmentsPage
  });
  alignmentLayerLeft.name = "Left";
  var alignmentLayerRight = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Text"]({
    text: "Right",
    frame: {
      width: 100,
      height: 32,
      x: 0,
      y: 0
    },
    style: {
      fontFamily: 'Helvetica',
      fontWeight: 4,
      fontSize: 16,
      lineHeight: 16 * 1.5,
      fontStyle: "normal",
      paragraphSpacing: 16 * 1.5,
      kerning: 0,
      alignment: 'right'
    },
    parent: AlignmentsPage
  });
  alignmentLayerLeft.name = "Right"; // Add Colors

  new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["ShapePath"]({
    name: 'Black',
    shapeType: sketch_dom__WEBPACK_IMPORTED_MODULE_0__["ShapePath"].ShapeType.Oval,
    parent: ColorsPage,
    frame: {
      width: 100,
      height: 100,
      x: 0,
      y: 0
    },
    style: {
      fills: [{
        color: '#111111',
        fillType: sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Style"].FillType.Color
      }],
      borders: []
    }
  });
  new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["ShapePath"]({
    name: 'Red',
    shapeType: sketch_dom__WEBPACK_IMPORTED_MODULE_0__["ShapePath"].ShapeType.Oval,
    parent: ColorsPage,
    frame: {
      width: 100,
      height: 100,
      x: 124,
      y: 0
    },
    style: {
      fills: [{
        color: '#cc0000',
        fillType: sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Style"].FillType.Color
      }],
      borders: []
    }
  });
});

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__setupDocument.js.map