// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupBase = setupBase;
exports.resizeBase = resizeBase;
exports.padding = exports.endDate = exports.startDate = exports.intMult = exports.domMult = void 0;

var _index = require("./index");

var $svg = d3.select("#graphic-container");
var padding = {
  top: 10,
  bottom: 10,
  left: 50,
  right: 10
},
    startDate = 1980,
    endDate = 2020;
exports.endDate = endDate;
exports.startDate = startDate;
exports.padding = padding;
var domMult = 0.15,
    intMult = 0.85;
exports.intMult = intMult;
exports.domMult = domMult;
var yearLine, domLine, intLine;

function setupBase() {
  var baseGroup = $svg.select("#base-group");
  var yearGroup = baseGroup.append("g").attr("id", "year-group");

  for (var i = startDate; i <= endDate; i++) {
    if (i % 10 == 0) {
      yearGroup.append("text").text(i).attr("id", "year-marker-".concat(i)).attr("class", "year-marker-text").attr("alignment-baseline", "middle").attr("text-anchor", "middle");
    } else {
      yearGroup.append("line").attr("id", "year-marker-".concat(i)).attr("class", "year-marker-dash");
    }
  }

  domLine = baseGroup.append("line").attr("id", "domLine");
  intLine = baseGroup.append("line").attr("id", "intLine");
}

function resizeBase() {
  for (var i = startDate; i <= endDate; i++) {
    var el = d3.select("#year-marker-".concat(i));

    if (i % 10 == 0) {
      el.attr("x", padding.left).attr("y", padding.top + _index.height * (i - startDate) / (endDate - startDate));
    } else {
      el.attr("x1", i % 5 == 0 ? padding.left - 10 : padding.left - 5).attr("x2", i % 5 == 0 ? padding.left + 10 : padding.left + 5).attr("y1", padding.top + _index.height * (i - startDate) / (endDate - startDate)).attr("y2", padding.top + _index.height * (i - startDate) / (endDate - startDate));
    }
  }

  domLine.attr("x1", padding.left + domMult * _index.width).attr("x2", padding.left + domMult * _index.width).attr("y1", padding.top).attr("y2", padding.top + _index.height);
  intLine.attr("x1", padding.left + intMult * _index.width).attr("x2", padding.left + intMult * _index.width).attr("y1", padding.top).attr("y2", padding.top + _index.height);
}
},{"./index":"index.js"}],"circles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupCircles = setupCircles;
exports.resizeCircles = resizeCircles;

var _index = require("./index");

var _base = require("./base");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var $svg = d3.select("#graphic-container");
var circles = $svg.selectAll("circle");
var radius = 10;
var $hoverBox = d3.select("#graphic-hover");
var $mainBoxes = d3.selectAll(".main-text");

function setupCircles() {
  circles.nodes().forEach(function (el, i) {
    var data = el.dataset;
    var id = createId(data);
    d3.select(el).attr("id", id).on("mouseenter", function () {
      return highlight(data.influence, id, data.hover);
    }).on("mouseleave", clearHighlight).on("click", function () {
      return clickHandler(data.influence, id);
    });
  });
}

function resizeCircles() {
  circles.nodes().forEach(function (el, i) {
    var data = el.dataset;
    var xMult = data.type === "international" ? _base.intMult : _base.domMult;
    var xPos = _base.padding.left + _index.width * xMult;
    var yPos = _base.padding.top + _index.height * getYFrac(data.date);
    d3.select(el).attr("r", radius).attr("cx", xPos).attr("cy", yPos);
  });
}

function createId(data) {
  var date = data.date;
  var type = data.type;
  return type.slice(0, 1) + date.replace(/\//gi, "");
}

function getYFrac(date) {
  var frac = 0;
  var comps = date.split("/");
  frac += (Number(comps[2]) + Number(comps[1]) / 12 + Number(comps[0]) / 365 - _base.startDate) / (_base.endDate - _base.startDate);
  return frac;
}

function highlight(inf, self, hover) {
  if (inf.trim() != "") {
    var influences = inf.split(",");
    influences.forEach(function (id) {
      return d3.select("#".concat(id.trim())).transition().attr("r", radius * 1.4).attr("fill", "orange");
    });
  }

  d3.select("#".concat(self)).transition().attr("r", radius * 1.4).attr("fill", "yellow");
  var pos = d3.select("#".concat(self)).node().getBoundingClientRect();
  $hoverBox.classed("visible", true).classed("right", self.slice(0, 1) === "d").style("left", "".concat(pos.x + pos.width / 2, "px")).style("top", "".concat(pos.y + pos.height / 2, "px")).html(hover);
}

function clearHighlight() {
  circles.nodes().forEach(function (el, i) {
    d3.select(el).transition().attr("r", radius).attr("fill", "black");
  });
  $hoverBox.classed("visible", false);
}

function clickHandler(inf, self) {
  $mainBoxes.classed("visible", false);
  var influences = inf.split(",");
  [].concat(_toConsumableArray(influences), [self]).forEach(function (id, i) {
    var data = d3.select("#".concat(id.trim())).node().dataset;
    d3.select("#graphic-main-".concat(i)).classed("visible", true).html(data.main);
    console.log([id, i]);
  });
}
},{"./index":"index.js","./base":"base.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.height = exports.width = void 0;

var _base = require("./base");

var _circles = require("./circles");

var $svg = d3.select("#graphic-container");
var width, height;
exports.height = height;
exports.width = width;

function init() {
  (0, _base.setupBase)();
  (0, _circles.setupCircles)();
}

function resize() {
  exports.width = width = window.innerWidth - _base.padding.left - _base.padding.right;
  exports.height = height = window.innerHeight - _base.padding.top - _base.padding.bottom;
  $svg.attr("viewBox", "0 0 ".concat(window.innerWidth, " ").concat(window.innerHeight));
  (0, _base.resizeBase)();
  (0, _circles.resizeCircles)();
}

init();
resize();
window.addEventListener("resize", resize);
},{"./base":"base.js","./circles":"circles.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map