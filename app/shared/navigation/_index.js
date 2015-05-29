'use strict';
/*global angular*/

//I decided to user debowerify for all dependencies and had problems requiring angular to variable.
// http://stackoverflow.com/questions/25088406/cant-get-external-library-with-browserify-and-debowerify
// var angular = require('angular');

require('angular');

var bulk = require('bulk-require');

var dependencies = [
//    'ngAnimate'
];

module.exports = angular.module('app.navigation', dependencies);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);