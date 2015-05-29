/*global angular */


'use strict';

describe('Unit: HomeCtrl', function() {

    var ctrl;
    var mockScope;

    beforeEach(module('ui.router'));

    beforeEach(function() {
        // instantiate the app module
        angular.mock.module('app.home');
        // mock the controller
        angular.mock.inject(function($controller, $rootScope, $state) {
            mockScope = $rootScope.$new();

            ctrl = $controller('HomeController', {
                $scope: mockScope
            });
        });
    });

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });


    it('my scope should now have a board defined', function() {
        expect(mockScope.board).toBeDefined();
    });



});