var app = angular.module('project', ['ngStorage', 'ngRoute', 'angular-jwt', 'ui.bootstrap', 'ngYoutubeEmbed', 'angular-loading-bar', 'ngAnimate'])
app.constant('API', 'https://api.moviesandtvshows.com');
app.constant('STORAGE_DOWNLOAD', 'https://www.moviesandtvshows.com/storage');
app.constant('STORAGE', 'https://moviesandtvshows.com/storage');

app.config(['$httpProvider', '$localStorageProvider', '$routeProvider', '$locationProvider', '$sceProvider', function($httpProvider, $localStorageProvider, $routeProvider, $locationProvider, $sceProvider) {
    $localStorageProvider.setKeyPrefix('');
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    $httpProvider.interceptors.push('AuthHttpInterceptor');
    $sceProvider.enabled(false);


    $routeProvider
        .when('/', {
            templateUrl: 'views/landing.html',
            controller: 'LandingController',
            resolve: {
                latestMedia: function(ApiService) {
                    return ApiService.mediatypes_latest_with_media();
                }
            }
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
                mediatypesIndex: function($ApiService) {
                    return ApiService.mediatypes_index();
                }
            }
        })
        .when('/categories', {
            templateUrl: 'views/categories.html',
            controller: 'CategoryController',
            resolve: {
                categoriesIndex: function(ApiService, $q) {
                    var deffered = $q.defer();
                    var promises = [ApiService.categories_index(), ApiService.mediatypes_index()];
                    $q.all(promises).then(function(responses) {
                        var categories = responses[0].data.categories;
                        var mediatypes = responses[1].data.media_types;
                        angular.forEach(categories, function(c_value, c_key) {
                            angular.forEach(mediatypes, function(m_value, m_key) {
                                if (c_value.media_type_id == m_value.id) {
                                    categories[c_key].media_type_name = m_value.name;
                                }
                            });
                        });
                        deffered.resolve(categories);
                    })
                    return deffered.promise;
                }
            }
        })
        .when('/media', {
            templateUrl: 'views/media.html',
            controller: 'MediaController',
            resolve: {
                mediaIndex: function(ApiService, $q) {
                    var deffered = $q.defer();
                    var promises = [ApiService.media_index(), ApiService.categories_index(), ApiService.mediatypes_index()];
                    $q.all(promises).then(function(responses) {
                        var media = responses[0].data.media;
                        var categories = responses[1].data.categories;
                        var mediatypes = responses[2].data.media_types;
                        angular.forEach(media, function(c_value, c_key) {
                            angular.forEach(categories, function(m_value, m_key) {
                                if (c_value.category_id == m_value.id) {
                                    media[c_key].category_name = m_value.name;
                                    media[c_key].media_type_id = m_value.media_type_id;
                                }
                            });
                        });

                        angular.forEach(media, function(c_value, c_key) {
                            angular.forEach(mediatypes, function(m_value, m_key) {
                                if (c_value.media_type_id == m_value.id) {
                                    media[c_key].media_type_name = m_value.name;
                                }
                            });
                        });

                        deffered.resolve(media);
                    })
                    return deffered.promise;
                }
            }
        })
        .when('/media/:name', {
            templateUrl: "views/media_details.html",
            controller: 'MediaDetailsController',
            resolve: {
                mediaDetails: function($route, ApiService, $rootScope) {
                    $rootScope.navbarDisabled = false;
                    return ApiService.media_detailed_info_by_name($route.current.params.name);
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.directive('onError', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                //call the function that was passed
                scope.$apply(attrs.onError);
            });
        }
    }
})


app.directive('ngFileModel', ['$parse', '$rootScope', function($parse, $rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            var values = [];

            element.bind('change', function() {
                angular.forEach(element[0].files, function(item) {
                    var foundSame = false;
                    var value = {
                        // File Name 
                        name: item.name,
                        //File Size 
                        size: item.size,
                        //File URL to view 
                        url: URL.createObjectURL(item),
                        // File Input Value 
                        _file: item
                    };
                    if (typeof $rootScope.taskEditData !== 'undefined') {
                        for (var i in $rootScope.taskEditData.photos) {
                            if ($rootScope.taskEditData.photos[i].file == value.name) {
                                foundSame = true;
                            }
                        }
                    }
                    if (typeof $rootScope.taskEditData !== 'undefined') {
                        for (var i in $rootScope.taskEditData.firmwares) {
                            if ($rootScope.taskEditData.firmwares[i].file == value.name) {
                                foundSame = true;
                            }
                        }
                    }
                    for (var i in values) {
                        if (values[i].name === value.name) {
                            foundSame = true;
                        }
                    }
                    if (!foundSame)
                        values.push(value);
                });
                scope.$apply(function() {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });


        },


        controller: function($scope, $rootScope, $element, $attrs, ) {

            $rootScope.$on('uploadFormClosed', function() {
                $parse($attrs.ngFileModel)($scope).splice(0, $parse($attrs.ngFileModel)($scope).length)

            });

            $rootScope.$on('Debug', function() {

            });

            $rootScope.$on('uploadFormDeleteFile', function($id, $modelData) {
                if ($parse($attrs.ngFileModel)($scope) == $modelData[1]) {
                    $parse($attrs.ngFileModel)($scope).splice($modelData[0], 1);
                }
            });
        }
    };
}]);


app.run(['$rootScope', '$localStorage', '$location', 'AuthService', 'ApiService', 'jwtHelper', 'API', 'STORAGE', 'STORAGE_DOWNLOAD', function($rootScope, $localStorage, $location, AuthService, ApiService, jwtHelper, API, STORAGE, STORAGE_DOWNLOAD) {
    $rootScope.API = API;
    $rootScope.STORAGE = STORAGE;
    $rootScope.STORAGE_DOWNLOAD = STORAGE_DOWNLOAD;
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
        $location.path('/');
        $('#successful-alert').delay(400).fadeToggle("slow", "linear");
        $('#successful-alert').delay(1000).fadeToggle(800, "linear");
    });
    $rootScope.$on('auth-logout', function($route) {
        $rootScope.deleteAuthToken();
        $location.path('/');
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
            case '/categories':
                $rootScope.navbarDisabled = false;
                if ($rootScope.loggedIn() == false || $rootScope.getRole() != 'admin') {
                    $location.path('');
                }
                break;
            case '/media':
                $rootScope.navbarDisabled = false;
                if ($rootScope.loggedIn() == false || $rootScope.getRole() != 'admin') {
                    $location.path('');
                }
                break;
        }
    });




}]);