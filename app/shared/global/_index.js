'use strict';
/*global angular*/


//I decided to user debowerify for all dependencies and had problems requiring angular to variable.
// http://stackoverflow.com/questions/25088406/cant-get-external-library-with-browserify-and-debowerify
// var angular = require('angular');


require('jquery');
require('angular');
var bulk = require('bulk-require');


module.exports = angular.module('app.global', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);