'use strict';

var myModule = require('./_index');

/**
 * @ngInject
 */
function BackImgWatcherDirective() {


    return function(scope, element){

        scope.$on('backgroundChanged', function (event, backgroundUrl) {
            if(backgroundUrl === ""){
                backgroundUrl = "assets/images/background-default.png";
            }

            element.css({
                'background-image': 'url(' + backgroundUrl +')',
                'background-size' : 'cover'
            });
        });


    };
}

myModule.directive('backImgWatcher', BackImgWatcherDirective);