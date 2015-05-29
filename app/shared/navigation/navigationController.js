'use strict';

var myModule = require('./_index');

/**
 * @ngInject
 */
function NavigationController($scope, $state) {

    $scope.navigateToJonasBoard = function(){
        $state.go('Board',{boardName: "jonas"});
    };
}

myModule.controller('NavigationController', NavigationController);