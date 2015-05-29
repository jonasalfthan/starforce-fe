'use strict';

var myModule = require('./_index');


/**
 * @ngInject
 */
function BoardController(BoardUserLoader, $scope, $stateParams, $state, StarloaderService) {

    $scope.board = {};

    // object to place booleans of what to show on the page.
    $scope.isVisible = { adminField : false, saveUserButton: false, deleteUserButton: false};

    function resetEditObject(){
        $scope.userInEdit = {
            id : 0,
            name : "",
            picturelink : "",
            restModUserObj : null
        };
        $scope.isVisible.deleteUserButton = false;
        $scope.isVisible.saveUserButton = false;
    }

    function reportBackgroundChanged(backgroundUrl){
        /* broadcasting change of background. Emit sends up through its parents
         * in this case this info is meant to be cought by changeBackimageDirective */
        $scope.$emit('backgroundChanged', backgroundUrl);
    }

    //loading the initial data
    $scope.flyingStars = {};


    // user is an restmod object that should be kept intact
    function editUser(user){
        $scope.userInEdit.name = user.name;
        $scope.userInEdit.picturelink = user.picturelink;
        // keeping a link to the original object so updating goes smooth after edit
        $scope.userInEdit.restModUserObj = user;

        //setting the field and button to appear
        $scope.isVisible.adminField = true;
        $scope.isVisible.saveUserButton = true;
        $scope.isVisible.deleteUserButton = true;
    }

    function saveUser(editedUser){
        //setting the name and picture values on the kept object
        editedUser.restModUserObj.name = editedUser.name;
        editedUser.restModUserObj.picturelink = editedUser.picturelink;

        //saving the object. put request is sent.
        editedUser.restModUserObj.$save();
    }

    function deleteUser(editedUser){
        editedUser.restModUserObj.$destroy();
        resetEditObject();
    }

    function createUser(editedUser){
        // deleting id if it exists
        delete(editedUser.id);

        // setting board and goldengives
        editedUser.board = $scope.board.id;
        editedUser.goldengives = [];

        //using restmod to send the post request
        $scope.board.users.$create({
                name : editedUser.name,
                picturelink: editedUser.picturelink,
                board : $scope.board.id
            }).$asPromise().then(function() {
                resetEditObject();
            });
    }

    function resetGiveStar(){
        $scope.starInEdit = {
            from: '',
            comment:'',
            to: 0
        };
    }

    /**
     * when a star has been dropped on someone we save the star. Compare this to how a user is added:
     * When adding a user I add the new restmod object
     * representing the user.
     * This function relies on the state of the scope.
     * Which is not nice and makes this method harder to test.
     * */
    function dropCallback(dont_care_a,dont_care_b,user) {
        // a bit stupid way: but i remove the just added star and then add it again when server has confirmed the save.
        var addedstar = user.goldengives.pop();

        // setting the 'to' parameter of the golden give. ({'to':'ZZZ','from':'XXX','comment': 'ZZZ') to the user
        addedstar.to = user.id;

        user.goldengives.$create(addedstar).$asPromise().then(function(){
            console.log("star saved");
        });
        resetGiveStar();
    }

    function overCallback(){
        // no use for this yet..
    }

    function dragCallback() {
        // no user for this yet..
    }


    /*
     * function for updating the model.
     * */
    function updateModel(){

        BoardUserLoader.get($stateParams.boardName).then(function(data){
            reportBackgroundChanged(data.backgroundimage);
            $scope.board = data;

            // Loading the stars in seperate call. The stars could just as well be taken out of the
            // $scope.board directly.
            StarloaderService.get($scope.board.id).then(function (data) {
                $scope.flyingStars = data;

            });

        }).catch(function(errorMessage) {
            $state.go('Home');
        });
    }

    /*
     * function that polls the server to get updates every 30 seconds.
     * */
    setInterval(function(){
        updateModel();
    },30000);

    /*Firs update is triggered on page load. From then on every 30 seconds.*/
    updateModel();

    $scope.overCallback = overCallback;
    $scope.dragCallback = dragCallback;
    $scope.dropCallback = dropCallback;

    $scope.createUser = createUser;
    $scope.editUser = editUser;
    $scope.saveUser = saveUser;
    $scope.deleteUser = deleteUser;

    // editUser has to be available from the beginning.
    resetEditObject();

    // resetting the star.
    resetGiveStar();

    // seperate container for not yet saved stars. Has unfortunatly to be a list.
    // A single object would have been better
    $scope.droppedstar = [];

}

myModule.controller('BoardController', BoardController);