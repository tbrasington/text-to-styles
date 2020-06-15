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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/advanced.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/advanced.js":
/*!*************************!*\
  !*** ./src/advanced.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);

var properties = ['opacity', 'blendingMode', 'blur', 'fills', 'borders', 'borderOptions', 'shadows', 'innerShadows', 'alignment', 'verticalAlignment', 'kerning', 'lineHeight', 'paragraphSpacing', 'textColor', 'textTransform', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'fontVariant', 'fontStretch', 'textUnderline', 'textStrikethrough', 'fontAxes']; //testCommand

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var checkPropertyExistsOnPage = function checkPropertyExistsOnPage(_ref) {
    var page = _ref.page,
        properties = _ref.properties;
    return properties.forEach(function (item) {
      if (String(item) === String(page)) return true;
    });
  }; // get the base styles from the text layer
  // we will remove properties based on the other layer names


  var extractStyles = function extractStyles(page, properties) {
    var baseStyles = [];
    page.layers().forEach(function (layer) {
      if (layer.class() === MSTextLayer) {
        var allStyles = {};
        properties.forEach(function (property) {
          allStyles[property] = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(layer).style[property];
        });
        baseStyles.push({
          name: layer.name(),
          styles: allStyles,
          tokens: []
        });
      }
    });
    return baseStyles;
  }; // extract the specfic style from a page
  // take into account if its for one style or everyone Style 1/center


  var extractProperty = function extractProperty(page, properties, baseStyles) {
    var style = {};
    return style;
  }; // lets build the style objects


  var doc = context.document;
  var pages = doc.pages(); // get the base styles first

  var extractedBaseStyles = {};
  pages.forEach(function (page) {
    if (String(page.name()) === 'Styles') {
      extractedBaseStyles = extractStyles(page, properties);
    }
  }); // get the base, throw an error if it doesn't exist
  //console.log(extractedBaseStyles);

  pages.forEach(function (page) {
    var pageExists = checkPropertyExistsOnPage({
      page: page.name(),
      properties: properties
    }); // does the page exist within the array?

    if (String(page.name()) !== 'Styles' && pageExists) {
      //const extractedProperty = 
      extractProperty(page, properties, extractedBaseStyles);
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

//# sourceMappingURL=__advanced.js.map