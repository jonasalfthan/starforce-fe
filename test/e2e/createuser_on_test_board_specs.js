/*global browser, by */

'use strict';

describe('creating users and give star on the test board', function() {

    // constants
    var testboardName = "testBoard";
    var randomUser = Math.random().toString(36).substring(7);
    var randomMessage = "test message - " + Math.random().toString(36).substring(2);
    var randomFromMessage = "user - " + Math.random().toString(36).substring(2);

    // HOME
    var getBoardInput = function(){
        return element(by.model('boardname'));
    };
    var getGoButton = function(){
        return element(by.xpath("//button[contains(text(),'Go')]"));
    };
    var getCreateBoardButton = function() {
        return element(by.xpath("//button[contains(text(),'Create')]"));
    };

    // BOARD
    var getShowUserAdmin = function() {
        return element(by.xpath("//button[contains(text(),'user admin')]"));
    };
    var getUserField = function(){
        return element(by.model('userInEdit.name'));
    };
    var getCreateNewUserButton = function(){
        return element(by.xpath("//button[contains(text(),'Create New User')]"));
    };
    var getUsers = function(){
        return element.all(by.repeater("user in (board.users | orderBy:'-goldengives.length')"));
    };


    it('should already exist a test board but if not then lets create one.', function(){
        browser.get('/');
        browser.waitForAngular();
        getBoardInput().sendKeys(testboardName);

        getGoButton().click();


        getCreateBoardButton().isDisplayed().then(
            function(visible) {
                if (visible) {
                    console.log("its displayed and i will click it");
                    getCreateBoardButton().click();
                } else {}
            });

        expect(browser.getLocationAbsUrl()).toMatch('/board/'+ testboardName);
    });

    /*it('should stay at the old board right?.', function(){
        expect(browser.getLocationAbsUrl()).toMatch('/board/'+ testboardName);
    });*/

    it('should create a new user', function(){

        getShowUserAdmin().click();
        getUserField().sendKeys(randomUser);
        getCreateNewUserButton().click();

        getUsers().last().getText().then(function (txt) {
            console.log(txt);
            expect(txt).toMatch(randomUser);
        });
    });

});