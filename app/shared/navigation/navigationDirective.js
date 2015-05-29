'use strict';

var myModule = require('./_index');

/**
 * @ngInject
 */
function NavigationDirective() {
    return{

        templateUrl: 'shared/navigation/navigationView.html',

        element: 'E',

        controller: 'NavigationController'
    };
}

myModule.directive('navigationPane', NavigationDirective);