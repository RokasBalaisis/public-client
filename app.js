var app = angular.module('project', ['ngStorage', 'ngRoute', 'angular-jwt']).constant('API', 'https://api.moviesandtvshows.com');

app.config(['$httpProvider', '$localStorageProvider', '$routeProvider', '$locationProvider', function($httpProvider, $localStorageProvider, $routeProvider, $locationProvider) {
    $localStorageProvider.setKeyPrefix('');
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    $httpProvider.interceptors.push('AuthHttpInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'views/landing.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'MainController'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UserController'
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$localStorage', '$location', 'AuthService', function($rootScope, $localStorage, $location, AuthService) {
    $rootScope.currentPage = "landing";
    $rootScope.loggedIn = function() {
        var result = AuthService.isAuthenticated();
        return result;
    }
    $rootScope.getAuthToken = function() {
        if ($localStorage.auth_token == null)
            return null;
        var token_string = $localStorage.auth_token;
        var token_data = $localStorage.auth_token.split(" ");
        return token_data[1];
    }
    $rootScope.storeAuthToken = function(new_token) {
        return $localStorage.auth_token = new_token;
    }
    $rootScope.deleteAuthToken = function(new_token) {
        return delete $localStorage.auth_token;
    }
    $rootScope.$on('auth-login-complete', function() {
        $location.path('');
    });
    $rootScope.$on('auth-logout', function($route) {
        $rootScope.deleteAuthToken();
        $rootScope.loginStatus = false;
    });
    $rootScope.$on("$locationChangeStart", function(event, next, current) {});
    $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
        console.log('Current route name: ' + $location.path());
    });

}]);