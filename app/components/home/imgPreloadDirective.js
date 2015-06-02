 'use strict';

var myModule = require('./_index');

 console.log("inside the fie");

/**
 * @ngInject
 */
function ImgPreLoadDirective() {
    return {
        restrict: 'A',
        scope: {
            ngSrc: '@'
        },

        link: function(scope, element, attrs) {

            element.on('load', function() {
                element.fadeIn();
                console.log("on load");
            }).on('error', function() {
            });

            scope.$watch('ngSrc', function(newVal) {
                element.removeClass('in');
                element.hide();
                console.log("watch");
            });
        }
    };

}

myModule.directive('imgPreLoad', ImgPreLoadDirective);