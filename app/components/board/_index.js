'use strict';


/*global angular*/

//I decided to user debowerify for all dependencies and had problems requiring angular to variable.
// http://stackoverflow.com/questions/25088406/cant-get-external-library-with-browserify-and-debowerify
// var angular = require('angular');

// Jquery components
require('jquery');

// jquery-ui is secretly required by angular-dragdrop
require('jquery-ui');

// Angular components
require('angular');
var uiRouter = require('angular-ui-router');
require('angular-dragdrop');
require('../../shared/3dGadgets/_index');


var bulk = require('bulk-require');

module.exports = angular.module('app.board',
[
    uiRouter,
    'app.apiServices',
    'ngDragDrop',
    'app.3dgadgets'
]);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);