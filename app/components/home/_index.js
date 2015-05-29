'use strict';
/*global angular*/

//I decided to user debowerify for all dependencies and had problems requiring angular to variable.
// http://stackoverflow.com/questions/25088406/cant-get-external-library-with-browserify-and-debowerify
// var angular = require('angular');


require('jquery');
require('angular');
require('../../shared/3dGadgets/_index');
require('../../shared/apiServices/_index');

var bulk = require('bulk-require');

var dependencies =
    ['app.apiServices',
    'app.3dgadgets'];

module.exports = angular.module('app.home', dependencies);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);