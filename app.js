var app = angular.module('project', ['ngStorage', 'ngRoute']).constant('API', 'https://api.moviesandtvshows.com');

app.config(['$httpProvider', '$localStorageProvider', '$routeProvider', '$locationProvider', function($httpProvider, $localStorageProvider, $routeProvider, $locationProvider) {
    $localStorageProvider.setKeyPrefix('');
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    $httpProvider.interceptors.push('AuthHttpInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'views/landing.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$localStorage', function($rootScope, $localStorage) {

    $rootScope.getAuthToken = function(new_token) {
        return $localStorage.auth_token;
    }
    $rootScope.storeAuthToken = function(new_token) {
        return $localStorage.auth_token = new_token;
    }
    $rootScope.deleteAuthToken = function(new_token) {
        return delete $localStorage.auth_token;
    }
    $rootScope.$on('auth-logout', function() {
        return $rootScope.deleteAuthToken();
    });
}]);