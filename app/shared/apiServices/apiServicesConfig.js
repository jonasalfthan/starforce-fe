'use strict';

var myModule = require('./_index');

/**
 * @ngInject
 */
function Config(restmodProvider) {


    restmodProvider.rebase({
        $config: {
            style: 'MyStyle' // By setting the style variable the warning is disabled.
        }
    });
}

myModule.config(Config);