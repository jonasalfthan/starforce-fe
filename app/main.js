'use strict';
/*global angular*/

var jquery = require('jquery');

// mount jquery globally on window
window.$ = jquery;
window.jQuery = jquery;

// require bootstrap and angular now jquery is visible
require('../bower_components/bootstrap-sass/assets/javascripts/bootstrap');

require('angular');
require('angular-ui-router');

require('./templates');
require('./components/home/_index');
require('./components/board/_index');
require('./shared/global/_index');
require('./shared/navigation/_index');

// create and bootstrap application
angular.element(document).ready(function() {

    var requires = [
        'ui.router',
        'templates',
        'app.home',
        'app.board',
        'app.global',
        'app.navigation'
    ];

    // mount on window for testing
    window.app = angular.module('app', requires);

    angular.module('app').constant('AppSettings', require('./constants'));

    angular.module('app').config(require('./routes'));

    angular.module('app').run(require('./on_run'));

    angular.bootstrap(document, ['app']);

});