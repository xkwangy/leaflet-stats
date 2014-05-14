;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var incrObject = require('incr-object');

module.exports = function(map) {

    var basicEvents = ['popupopen', 'dragstart', 'load', 'click', 'zoomstart'],
        counters = new incrObject();

    for (var i = 0; i < basicEvents.length; i++) {
        map.on(basicEvents[i], incrType);
    }

    map.on('layeradd', function(e) {
        incrType(e);
    });

    map.eachLayer(trackLayer);

    function trackLayer(layer) {
        var id = L.stamp(layer);
        layer.on('tileload', function(e) {
            counters.incr(id + ':tileload');
        });
    }

    function incrType(e) {
        counters.incr(e.type);
    }

    return {
        counters: function() {
            return counters.entries();
        }
    };
};

},{"incr-object":2}],2:[function(require,module,exports){
function incrObj() { this.o = {}; }

// Increment by 1
incrObj.prototype.incr = function(k) {
    if (this.o[k] === undefined) this.o[k] = 1;
    else this.o[k]++;
    return this;
};

// Decrement by 1
incrObj.prototype.decr = function(k) {
    if (this.o[k] === undefined) this.o[k] = -1;
    else this.o[k]--;
    return this;
};

// Add or subtract any number
incrObj.prototype.plus = function(k, v) {
    if (this.o[k] === undefined) this.o[k] = 0;
    this.o[k] += v;
    return this;
};

// Get a specific value or zero
incrObj.prototype.value = function(k) {
    if (this.o[k] === undefined) return 0;
    return this.o[k];
};

incrObj.prototype.entries = function() {
    var a = [];
    for (var k in this.o) {
        a.push({
            key: k,
            value: this.o[k]
        });
    }
    return a;
};

incrObj.prototype.increment = incrObj.prototype.incr;
incrObj.prototype.decrement = incrObj.prototype.decr;

module.exports = incrObj;

},{}],3:[function(require,module,exports){
var leafletStats = require('../');

var map = L.mapbox.map('map', 'examples.map-i86knfo3')
    .setView([40, -74.50], 9);

var stats = leafletStats(map);

document.getElementById('show-report').onclick = function() {
    document.getElementById('report').innerHTML =
        JSON.stringify(stats.counters(), null, 2);
};

},{"../":1}]},{},[3])
;