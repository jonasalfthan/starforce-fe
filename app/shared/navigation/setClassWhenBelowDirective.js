'use strict';
/*global angular*/


var myModule = require('./_index');



/**
 * @ngInject
 */
function setClassWhenBelowDirective($window){
    var $win = angular.element($window);

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var topClass = attrs.setClassWhenBelow, // get CSS class from directive's attribute value
                offsetTop = element[0].getBoundingClientRect().top;

            $win.on('scroll', function () {
                if ($win.scrollTop() > offsetTop) {
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                }
            });
        }
    };
}

myModule.directive('setClassWhenBelow', setClassWhenBelowDirective);