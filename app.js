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
        .when('/roles', {
            templateUrl: 'views/roles.html',
            controller: 'RoleController',
            resolve: {
                rolesIndex: function(ApiService) {
                    return ApiService.roles_index();
                }
            }
        })
        .when('/mediatypes', {
            templateUrl: 'views/mediatypes.html',
            controller: 'MediaTypeController',
            resolve: {
                mediatypesIndex: function(ApiService) {
                    return ApiService.mediatypes_index();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$localStorage', '$location', 'AuthService', 'ApiService', 'jwtHelper', function($rootScope, $localStorage, $location, AuthService, ApiService, jwtHelper) {
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

    $rootScope.getRole = function() {
        if ($localStorage.auth_token == null)
            return false;
        var tokenPayload = jwtHelper.decodeToken($localStorage.auth_token);
        return tokenPayload['role'];
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
        $location.path('');
        if ($rootScope.errorOccured == true) {
            $rootScope.errorOccured = false;
            $('#error-alert').delay(400).fadeToggle("slow", "linear");
            $('#error-alert').delay(1000).fadeToggle(800, "linear");
        } else {
            $('#successful-alert').delay(400).fadeToggle("slow", "linear");
            $('#successful-alert').delay(1000).fadeToggle(800, "linear");
        }
    });
    $rootScope.$on('auth-invalid-role', function($route) {
            $rootScope.errorOccured = false;
            $('#error-alert').delay(400).fadeToggle("slow", "linear");
            $('#error-alert').delay(1000).fadeToggle(800, "linear");
        }),
        $rootScope.$on("$locationChangeStart", function(event, next, current) {});
    $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
        $rootScope.currentPage = $location.path();

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
                if ($rootScope.loggedIn() == false || $rootScope.getRole() != 'admin') {
                    $location.path('');
                }
                break;
            case '/roles':
                $rootScope.navbarDisabled = false;
                if ($rootScope.loggedIn() == false || $rootScope.getRole() != 'admin') {
                    $location.path('');
                }
                break;
            case '/mediatypes':
                $rootScope.navbarDisabled = false;
                if ($rootScope.loggedIn() == false || $rootScope.getRole() != 'admin') {
                    $location.path('');
                }
                break;
        }
    });




}]);