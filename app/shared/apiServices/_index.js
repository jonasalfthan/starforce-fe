'use strict';
/*global angular*/

//I decided to user debowerify for all dependencies and had problems requiring angular to variable.
// http://stackoverflow.com/questions/25088406/cant-get-external-library-with-browserify-and-debowerify
// var angular = require('angular');



require('angular');
require('angular-restmod');
var bulk = require('bulk-require');


module.exports = angular.module('app.apiServices', ['restmod']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);