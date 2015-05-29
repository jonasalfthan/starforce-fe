'use strict';

var myModule = require('./_index');


/**
 * @ngInject
 */
function GoldenGiveFactory(restmod) {
    return restmod.model('api/goldengives');
}

myModule.factory('GoldenGive', GoldenGiveFactory);



/**
 * @ngInject
 */
function BoardUserFactory(restmod) {
    return restmod.model('api/users').mix({
        $hooks: {
            'after-save': function() {
          //      setting the id to id returned in the location header
          //      this.id = this.$response.headers().location.split("/").pop();
            }
        },
        goldengives: {
            hasMany : 'GoldenGive'
        }

    });
}
myModule.factory('BoardUser', BoardUserFactory);

