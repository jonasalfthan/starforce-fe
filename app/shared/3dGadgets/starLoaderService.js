'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function StarloaderService($q, $http) {

    var service = {};

    service.get = function(boardId) {
        var deferred = $q.defer();
        var boardExtention = "";
        if(boardId !== undefined){
            boardExtention = "/" +boardId;
        }
        $http.get('api/goldengive' + boardExtention).success(function(data) {
            deferred.resolve(data);
        }).error(function(err, status) {
            deferred.reject(err, status);
        });

        return deferred.promise;
    };

    return service;

}

servicesModule.service('StarloaderService', StarloaderService);