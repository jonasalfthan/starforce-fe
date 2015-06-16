'use strict';

var myModule = require('./_index');


/**
 * @ngInject
 */
function GoldenGiveFactory(restmod) {
    return restmod.model('api/goldengives');
}

myModule.factory('GoldenGive', GoldenGiveFactory);
