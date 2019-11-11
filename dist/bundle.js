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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.htm":
/*!***********************!*\
  !*** ./src/index.htm ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.htm";

/***/ }),

/***/ "./src/js/index.ts":
/*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
/*! exports provided: Engine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Engine", function() { return Engine; });
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./star */ "./src/js/star.ts");
/* harmony import */ var _planet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./planet */ "./src/js/planet.ts");


var Engine = /** @class */ (function () {
    function Engine() {
        this.date = new Date();
        this.timeZero = this.date.getTime();
        this.objects = new Array();
        this.canvas = document.getElementById("content");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = window.innerHeight - 20;
        this.canvas.width = window.innerWidth - 20;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.star = new _star__WEBPACK_IMPORTED_MODULE_0__["Star"](0.6650467262205, this.height, this.width);
        this.objects.push(new _planet__WEBPACK_IMPORTED_MODULE_1__["Planet"](0.4263496513594, this.star.pos, 3, 5.01, 90));
        this.objects.push(new _planet__WEBPACK_IMPORTED_MODULE_1__["Planet"](0.18263496513594, this.star.pos, 5, 7, 50));
        this.objects.push(new _planet__WEBPACK_IMPORTED_MODULE_1__["Planet"](0.08263496513594, this.star.pos, 3, 10, 180));
        this.calcAlpha();
        this.loop();
    }
    Engine.prototype.loop = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.date = new Date();
        this.timeNow = this.date.getTime();
        var time = this.timeNow - this.timeZero;
        this.timeZero = this.timeNow;
        this.star.draw(this.ctx, this.alpha);
        this.objects.forEach(function (element) {
            element.draw(_this.ctx, _this.alpha, _this.star.pos);
            element.update(time, _this.star.pos, _this.alpha);
        });
        window.requestAnimationFrame(this.loop.bind(this));
    };
    Engine.prototype.calcAlpha = function () {
        var totalHeight = 0;
        this.objects.forEach(function (element) {
            var i = element.getOrbit().calcMajor();
            if (i > totalHeight)
                totalHeight = i;
        });
        //totalHeight += 0.5;
        this.alpha = this.height / (3 * totalHeight);
    };
    return Engine;
}());

new Engine();


/***/ }),

/***/ "./src/js/orbit.ts":
/*!*************************!*\
  !*** ./src/js/orbit.ts ***!
  \*************************/
/*! exports provided: Orbit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Orbit", function() { return Orbit; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/js/vector.ts");

var Orbit = /** @class */ (function () {
    function Orbit(per, aph, starPos) {
        this.perihelion = per;
        this.aphelion = aph;
        this.eccentricity = this.calcEccentricity();
        this.minor = this.calcMinor();
        this.major = this.calcMajor();
        this.fociConstant = this.calcFociConstant();
        this.orbitOrigo = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](starPos.x + this.fociConstant, starPos.y);
    }
    Orbit.prototype.draw = function (ctx, alpha, starPos, planetPos, rotation) {
        ctx.translate(starPos.x, starPos.y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-starPos.x, -starPos.y);
        ctx.beginPath();
        this.orbitOrigo = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](starPos.x + this.fociConstant * alpha, starPos.y);
        ctx.ellipse(starPos.x + this.fociConstant * alpha, starPos.y, this.major * alpha, this.minor * alpha, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.translate(starPos.x, starPos.y);
        ctx.rotate(-rotation * Math.PI / 180);
        ctx.translate(-starPos.x, -starPos.y);
    };
    Orbit.prototype.calcMinor = function () {
        var minor = Math.sqrt(this.aphelion * this.perihelion);
        return minor;
    };
    Orbit.prototype.calcMajor = function () {
        var major = (this.aphelion + this.perihelion) / 2;
        return major;
    };
    Orbit.prototype.calcFociConstant = function () {
        var constant = Math.sqrt(Math.pow(this.major, 2) - Math.pow(this.minor, 2));
        return constant;
    };
    Orbit.prototype.calcSemiLatus = function (planetPos, starPos) {
        var origoToStar = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](starPos.x - this.orbitOrigo.x, starPos.y - this.orbitOrigo.y);
        var starToPlanet = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](planetPos.x - starPos.x, planetPos.y - starPos.y);
        var angle = origoToStar.angle(starToPlanet);
        this.semiLatusRectum = starToPlanet.magnitude() * (1 + Math.cos(angle));
        //console.log(this.semiLatusRectum);
    };
    Orbit.prototype.calcEccentricity = function () {
        var eccentricity = (this.aphelion - this.perihelion) / (this.aphelion + this.perihelion);
        return eccentricity;
    };
    Orbit.prototype.calcHeliocentricAngle = function (planetPos, starPos) {
        var origoToStar = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](starPos.x - this.orbitOrigo.x, starPos.y - this.orbitOrigo.y);
        var starToPlanet = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](planetPos.x - starPos.x, planetPos.y - starPos.y);
        var angle = origoToStar.angle(starToPlanet);
        return angle;
    };
    Orbit.prototype.calcDist = function (planetPos, starPos) {
        var angle = this.calcHeliocentricAngle(planetPos, starPos);
        var dist = this.semiLatusRectum / (1 + this.eccentricity * Math.cos(angle));
        return dist;
    };
    return Orbit;
}());



/***/ }),

/***/ "./src/js/planet.ts":
/*!**************************!*\
  !*** ./src/js/planet.ts ***!
  \**************************/
/*! exports provided: Planet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Planet", function() { return Planet; });
/* harmony import */ var _orbit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orbit */ "./src/js/orbit.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector */ "./src/js/vector.ts");


var Planet = /** @class */ (function () {
    function Planet(radius, starPos, per, aph, rotation) {
        this.velocity = new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](0, 0);
        this.orbit = new _orbit__WEBPACK_IMPORTED_MODULE_0__["Orbit"](per, aph, starPos);
        this.pos = new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](this.orbit.fociConstant, this.orbit.minor);
        this.radius = radius;
        this.rotation = rotation;
        this.orbit.calcSemiLatus(new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](starPos.x + this.pos.x, starPos.y - this.pos.y), starPos);
        this.dist = this.orbit.calcDist(new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](starPos.x + this.pos.x, starPos.y - this.pos.y), starPos);
        this.angle = this.orbit.calcHeliocentricAngle(new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](starPos.x + this.pos.x, starPos.y - this.pos.y), starPos);
        this.direction = this.calcDirection(starPos);
    }
    Planet.prototype.draw = function (ctx, alpha, starPos) {
        this.orbit.draw(ctx, alpha, starPos, this.pos, this.rotation);
        ctx.translate(starPos.x, starPos.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.translate(-starPos.x, -starPos.y);
        ctx.beginPath();
        ctx.ellipse(starPos.x + this.pos.x * alpha, starPos.y + this.pos.y * alpha, this.radius * alpha, this.radius * alpha, 0, 0, Math.PI * 2);
        ctx.translate(starPos.x, starPos.y);
        ctx.rotate(-this.rotation * Math.PI / 180);
        ctx.translate(-starPos.x, -starPos.y);
        ctx.fillStyle = 'black';
        ctx.fill();
    };
    Planet.prototype.update = function (time, starPos, alpha) {
        this.dist = this.orbit.calcDist(new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](starPos.x + this.pos.x, starPos.y - this.pos.y), starPos);
        var angleOffset = 1 / (this.dist) * time / 1000;
        this.angle += angleOffset;
        this.pos.x = (this.orbit.major * Math.cos(this.angle) + this.orbit.major * this.orbit.eccentricity);
        this.pos.y = (this.orbit.minor * Math.sin(this.angle));
    };
    Planet.prototype.getOrbit = function () {
        return this.orbit;
    };
    Planet.prototype.calcVelocity = function (starPos) {
        var vel = new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](0, 0);
        var angle = this.orbit.calcHeliocentricAngle(new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](starPos.x - this.pos.x, starPos.y - this.pos.y), starPos);
        this.dist = this.orbit.calcDist(new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](starPos.x - this.pos.x, starPos.y - this.pos.y), starPos);
        vel.x = (Math.sqrt(0.001 * this.orbit.major) / this.dist) * (Math.sin(angle));
        vel.y = (Math.sqrt(0.001 * this.orbit.major) / this.dist) * (Math.sqrt(1 - Math.pow(this.orbit.eccentricity, 2)) * Math.cos(angle));
        return vel;
    };
    Planet.prototype.calcDirection = function (starPos) {
        var dir = new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](this.pos.x - starPos.x, this.pos.y - starPos.y);
        return new _vector__WEBPACK_IMPORTED_MODULE_1__["Vector"](dir.x / dir.magnitude(), dir.y / dir.magnitude());
    };
    return Planet;
}());



/***/ }),

/***/ "./src/js/star.ts":
/*!************************!*\
  !*** ./src/js/star.ts ***!
  \************************/
/*! exports provided: Star */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Star", function() { return Star; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/js/vector.ts");

var Star = /** @class */ (function () {
    //Radii in AU
    function Star(radius, height, width) {
        this.radius = radius;
        this.pos = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](width / 2, height / 2);
    }
    Star.prototype.draw = function (ctx, alpha) {
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, this.radius * alpha, this.radius * alpha, 0, 0, 2 * Math.PI);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    };
    Star.prototype.update = function (time) {
    };
    return Star;
}());



/***/ }),

/***/ "./src/js/vector.ts":
/*!**************************!*\
  !*** ./src/js/vector.ts ***!
  \**************************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.magnitude = function () {
        var mag = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        //console.log(mag);
        return mag;
    };
    Vector.prototype.dot = function (otherVector) {
        var dot = this.x * otherVector.x + this.y * otherVector.y;
        //console.log(dot)
        return dot;
    };
    Vector.prototype.angle = function (otherVector) {
        var dot = this.dot(otherVector);
        return Math.acos(dot / (this.magnitude() * otherVector.magnitude()));
    };
    return Vector;
}());



/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bundle.css";

/***/ }),

/***/ 0:
/*!**********************************************************************!*\
  !*** multi ./src/index.htm ./src/scss/styles.scss ./src/js/index.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/index.htm */"./src/index.htm");
__webpack_require__(/*! ./src/scss/styles.scss */"./src/scss/styles.scss");
module.exports = __webpack_require__(/*! ./src/js/index.ts */"./src/js/index.ts");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map