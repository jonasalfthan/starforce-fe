/*global browser, by */

'use strict';

describe('go to the jonas board. Create a new board. go to the newly created board', function() {

    var randomBoard = Math.random().toString(36).substring(7);


    beforeEach(function() {
        browser.get('/');
        browser.waitForAngular();
    });

    it('should route correctly', function() {
        expect(browser.getLocationAbsUrl()).toMatch('/');
    });

    it('should route to jonas board', function(){
        element(by.model('boardname')).sendKeys('jonas');
        element(by.xpath("//button[contains(text(),'Go')]")).click();
        expect(browser.getLocationAbsUrl()).toMatch('/board/jonas');
    });

    it('should create a new board', function(){

        element(by.model('boardname')).sendKeys(randomBoard);
        element(by.xpath("//button[contains(text(),'Go')]")).click();
        element(by.xpath("//button[contains(text(),'Create')]")).click();
        expect(browser.getLocationAbsUrl()).toMatch('/board/' + randomBoard);
    });

    it('should now exist a board of the randomBoard name', function(){

        element(by.model('boardname')).sendKeys(randomBoard);
        element(by.xpath("//button[contains(text(),'Go')]")).click();
        expect(browser.getLocationAbsUrl()).toMatch('/board/' + randomBoard);
    });


});