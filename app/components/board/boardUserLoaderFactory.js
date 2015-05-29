'use strict';

var myModule = require('./_index.js');

/**
 * @ngInject
 */
function BoardUserLoader(Board, $state) {
    return{
        get : function(boardId){
            var boardPromise = {};
            if(boardId !== 0){
                boardPromise = Board.$find(boardId).$asPromise();
            }else{
                $state.go('home');
            }
            return boardPromise;
        }
    };

}

myModule.factory('BoardUserLoader', BoardUserLoader);