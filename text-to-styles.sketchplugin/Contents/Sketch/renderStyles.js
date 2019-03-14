var that = this;
function __skpm_run (key, context) {
  that.context = context;

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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/renderStyles.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/generators.js":
/*!***************************!*\
  !*** ./src/generators.js ***!
  \***************************/
/*! exports provided: extractStyles, generateTextStyles, generateJSONStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractStyles", function() { return extractStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTextStyles", function() { return generateTextStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateJSONStyles", function() { return generateJSONStyles; });
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function convertSketchColourToRGBA(colour) {
  var red = Math.round(colour.red() * 255);
  var green = Math.round(colour.green() * 255);
  var blue = Math.round(colour.blue() * 255);
  return 'rgba(' + red + ',' + green + ',' + blue + ',' + colour.alpha() + ')';
}

function extractStyles(context, convert) {
  var doc = context.document;
  var pages = doc.pages();
  var TypographyStyles = [];
  var DocumentColours = {};
  var textAlignments = [];
  pages.forEach(function (page, index) {
    //  alignments
    if (String(page.name()) === "Alignments") {
      page.layers().forEach(function (layer) {
        //log(layer.name() + ' ' + layer.textAlignment()) 
        var alignment = 'left';
        if (layer.textAlignment() === 4) alignment = 'left';
        if (layer.textAlignment() === 2) alignment = 'center';
        if (layer.textAlignment() === 1) alignment = 'right';
        textAlignments.push(alignment);
      });
    } // page styles


    if (String(page.name()) === "Styles") {
      // get styles
      page.layers().forEach(function (layer) {
        if (layer.class() === MSTextLayer) {
          // log(layer.font().fontName())
          // log(layer.fontSize())
          // log(layer.lineHeight())
          // log(layer.characterSpacing())
          // log(layer.style().textStyle().encodedAttributes() )
          //log(layer.styleAttributes()["MSAttributedStringTextTransformAttribute"])
          var textTransform = 'none';
          if (String(layer.styleAttributes()["MSAttributedStringTextTransformAttribute"]) === '1') textTransform = 'uppercase'; //  null: none, 1: uppercase and 2 lowercase

          if (String(layer.styleAttributes()["MSAttributedStringTextTransformAttribute"]) === '2') textTransform = 'lowercase';
          TypographyStyles.push({
            name: String(layer.name()),
            styles: _objectSpread({
              fontFamily: String(layer.font().fontName()),
              fontSize: layer.fontSize() + (convert ? 'px' : ''),
              lineHeight: layer.lineHeight() + (convert ? 'px' : ''),
              fontWeight: sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(layer).style.fontWeight,
              fontStyle: sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(layer).style.fontStyle,
              paragraphSpacing: sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(layer).style.paragraphSpacing
            }, convert && {
              letterSpacing: String(layer.characterSpacing() / 10 + 'em')
            }, !convert && {
              kerning: layer.characterSpacing()
            }, {
              textTransform: textTransform
            }),
            alignments: textAlignments,
            adjustments: []
          });
        }
      });
    } // get colours


    if (String(page.name()) === "Colours" || String(page.name()) === "Colors") {
      DocumentColours = {};
      page.layers().forEach(function (layer) {
        DocumentColours[layer.name()] = convert ? convertSketchColourToRGBA(layer.style().firstEnabledFill().color()) : layer.style().firstEnabledFill().color();
      });
    }
  }); // Remove previous rendered pages (thanks to react-sketchapp)

  for (var index = pages.length - 1; index >= 0; index -= 1) {
    if (pages.length > 1) {
      String(pages[index].name()) === 'Rendered Styles' && doc.documentData().removePageAtIndex(index);
    }
  }

  var DesignSystemTokens = {
    colours: DocumentColours,
    typography: TypographyStyles,
    textAlignments: textAlignments
  };
  return DesignSystemTokens;
}
function generateTextStyles(json) {
  var typeStyles = {};
  json.typography.forEach(function (item) {
    Object.keys(json.colours).forEach(function (colour) {
      item.alignments.map(function (align, index) {
        // this splits at a slash and adds the adjustments for breakpoints after the alignment
        // assumption is that there is only one adjusment
        var name = item.name.split('/');
        typeStyles["".concat(name[0], "/").concat(colour, "/").concat(index + '_' + align + (name.length > 1 ? '/' + name[1] : ''))] = _objectSpread({
          textColor: sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.Style.colorToString(json.colours[colour]),
          alignment: align
        }, item.styles);
      });
    });
  });
  return typeStyles;
}

function checkMatch(baseStyle, newStyle, prop) {
  var value = true; // for now we are just going off the previous style. As this would need to check 
  // every prop across every adjustment :/

  if (JSON.stringify(baseStyle[prop]) === JSON.stringify(newStyle[prop])) {
    // very primitive and breaks if order is out of sync 
    value = false;
  } //log( prop + ' ' + baseStyle[prop] + ' ----- ' + prop  + ' ' +newStyle[prop] + '  value ' + value)


  return value;
}

function generateJSONStyles(json, arrayFormat) {
  var typeStyles = {};
  var refinedBreakpoints = []; //log(json.typography)

  json.typography.forEach(function (item) {
    var name = item.name.split('/');

    if (!typeStyles[name[0]]) {
      typeStyles[name[0]] = {
        name: name[0],
        styles: item.styles,
        alignments: item.alignments,
        adjustments: []
      };
    } else {
      var currentStyle = item.styles; //let previousStyle = typeStyles[name[0]].styles
      // work out previous style

      var adjustmentLength = typeStyles[name[0]].adjustments.length;
      refinedBreakpoints[adjustmentLength] = {
        name: name[1],
        styles: {} // if(adjustmentLength>0){
        //     previousStyle = typeStyles[name[0]].adjustments[adjustmentLength-1]
        // } 
        //previousStyle,

      };
      Object.keys(currentStyle).map(function (checked) {
        if (checkMatch(typeStyles[name[0]].styles, currentStyle, checked)) {
          refinedBreakpoints[adjustmentLength].styles[checked] = currentStyle[checked];
        }
      });
      typeStyles[name[0]].adjustments.push(refinedBreakpoints[adjustmentLength]);
    }
  }); // finally merge colours back in and return text to an array

  var formattedTokens = {
    colours: json.colours,
    typography: arrayFormat ? Object.keys(typeStyles).map(function (key) {
      return typeStyles[key];
    }) : typeStyles
  };
  return formattedTokens;
}

/***/ }),

/***/ "./src/renderStyles.js":
/*!*****************************!*\
  !*** ./src/renderStyles.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _generators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generators */ "./src/generators.js");


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var designTokens = Object(_generators__WEBPACK_IMPORTED_MODULE_1__["extractStyles"])(context, false);
  var textStyles = Object(_generators__WEBPACK_IMPORTED_MODULE_1__["generateTextStyles"])(designTokens);
  var RenderPage = context.document.addBlankPage();
  RenderPage.name = "Rendered Styles";
  var document = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(context.document); // reset styles

  document.sharedTextStyles = {};
  var previousFrame = null;
  Object.keys(textStyles).forEach(function (style) {
    document.sharedTextStyles.push({
      name: String(style),
      style: textStyles[style]
    }); // attach the style to the render

    var sharedStyles = context.document.documentData().layerTextStyles().sharedStyles();
    var latestStyle = sharedStyles[sharedStyles.length - 1];
    var stylename = String(style);
    var textLayer = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Text"]({
      text: style.toString(),
      parent: RenderPage,
      style: textStyles[style],
      frame: {
        x: 0,
        y: previousFrame != null ? Math.ceil(previousFrame.frame.height + previousFrame.frame.y + 24) : 0
      },
      sharedStyleId: latestStyle.objectID()
    });
    textLayer.name = stylename;
    previousFrame = textLayer;
  }); // success message

  context.document.showMessage("".concat(Object.keys(textStyles).length, " styles added (").concat(Object.keys(designTokens.typography).length, " Text Styles * ").concat(Object.keys(designTokens.colours).length, " colours * ").concat(Object.keys(designTokens.textAlignments).length, " alignments) \uD83D\uDE4C"));
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
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=renderStyles.js.map