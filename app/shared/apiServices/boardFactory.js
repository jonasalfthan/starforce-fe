'use strict';

var myModule = require('./_index');

/**
 * @ngInject
 */
function BoardFactory(restmod) {
    return restmod.model('api/boards')
        .mix({
            users: { hasMany : 'BoardUser'}
        });
}


myModule.factory('Board', BoardFactory);