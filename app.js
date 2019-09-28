var app = angular.module('project', ['ngStorage', 'ngRoute', 'angular-jwt', 'ui.bootstrap']).constant('API', 'https://api.moviesandtvshows.com');

app.config(['$httpProvider', '$localStorageProvider', '$routeProvider', '$locationProvider', function($httpProvider, $localStorageProvider, $routeProvider, $locationProvider) {
    $localStorageProvider.setKeyPrefix('');
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    $httpProvider.interceptors.push('AuthHttpInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'views/landing.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'MainController'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UserController',
            resolve: {
                usersIndex: function(ApiService) {
                    return ApiService.users_index();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$localStorage', '$location', 'AuthService', 'ApiService', function($rootScope, $localStorage, $location, AuthService, ApiService) {
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
    $rootScope.deleteAuthToken = function() {
        return delete $localStorage.auth_token;
    }
    $rootScope.$on('auth-login-complete', function() {
        $location.path('');
        $('#successful-alert').delay(400).fadeToggle("slow", "linear");
        $('#successful-alert').delay(1000).fadeToggle(800, "linear");
    });
    $rootScope.$on('auth-logout', function($route) {
        $rootScope.deleteAuthToken();
        $rootScope.loggedIn();
        $('#successful-alert').delay(400).fadeToggle("slow", "linear");
        $('#successful-alert').delay(1000).fadeToggle(800, "linear");
    });
    $rootScope.$on("$locationChangeStart", function(event, next, current) {});
    $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
        $rootScope.currentPage = $location.path();
        if ($rootScope.currentPage == '/login') {
            $rootScope.navbarDisabled = true;
        } else {
            $rootScope.navbarDisabled = false;
        }

        switch ($rootScope.currentPage) {
            case '/':
                $rootScope.navbarDisabled = false;
                break;
            case '/login':
                if ($rootScope.loggedIn() == true) {
                    $location.path('');
                }
                $rootScope.navbarDisabled = true;
                break;
            case '/users':
                $rootScope.navbarDisabled = false;
                if ($rootScope.loggedIn() == false) {
                    $location.path('');
                }
                break;
        }
    });




}]);