app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!')
    // Any unmatched routes
    $urlRouterProvider.otherwise('/');

    // Set routes
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'partials/retinacase.html',
            controller: 'RetinaCtrl'
        });

}]);
