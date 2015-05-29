'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('Home', {
            url: '/',
            controller: 'HomeController as home',
            templateUrl: 'components/home/homeView.html',
            title: 'Home'
        })
        .state('Board', {
            url: '/board/:boardName',
            controller: 'BoardController as board',
            templateUrl: 'components/board/boardView.html',
            title: 'Board'
        });



    $urlRouterProvider.otherwise('/');

}

module.exports = Routes;