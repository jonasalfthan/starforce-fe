'use strict';
/*global angular*/



require('angular');
require('angular-restmod');
require('angular-animate');

// libraries for 3d presentation
window.THREE = require('../../../non_bower_components/three.min.js');

// CSS3D renderer only adds to the THREE object
require('../../../non_bower_components/CSS3DRenderer.js');

// I manually modified TWEEN a bit. Therefore not normal dist
window.TWEEN  = require('../../../non_bower_components/tween.min.js');


var bulk = require('bulk-require');

var dependencies = [
    'ngAnimate'
];

module.exports = angular.module('app.3dgadgets', dependencies);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);