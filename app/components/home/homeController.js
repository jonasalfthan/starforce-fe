'use strict';

var myModule = require('./_index');

/**
 * @ngInject
 */
function HomeController($scope, StarloaderService, Board, $state) {

    // resetting the background. Important if we would get here from a board
    $scope.$emit('backgroundChanged', "");

    // generally easier to test function not relying on the scope.

    function goClicked(boardname){
        if(boardname){
            Board.$find(boardname).$asPromise()
                .then(function(data) {
                    console.log('success', data);
                    $state.go('Board',{boardName: boardname});
                }).catch(function(data) {
                    // when there was no board of that name:
                    if(data.$response.status === 404){
                        $scope.createNewBoardForm = true;
                        $scope.board.name = boardname;
                    }
                }).finally(function() {
                   // do something?
                });
        }
    }

    function createAndRedirectNewBoard(boardobject){
        console.log("about to create" + boardobject.name);
        if(boardobject.name){

            Board.$create(boardobject).$asPromise()
                .then(function(data) {
                    console.log('success', data);
                    $state.go('Board',{boardName: boardobject.name});
                }).catch(function(data) {
                    console.error('error', data);
                }).finally(function() {
                   // do something?
                });
        }
    }

    //not the nicest to have this hardcoded. But works for now.
    $scope.board = {
        "backgroundimage":"assets/images/defaultBackGroundPixabay.jpg",
        "defaultprofileimage":"assets/images/defaultProfilePixabay.jpg"
    };

    $scope.goClicked = goClicked;

    $scope.newBoardClick = createAndRedirectNewBoard;

    StarloaderService.get().then(
        function (data) {
            $scope.flyingStars = data;

        }
    );
}

myModule.controller('HomeController', HomeController);