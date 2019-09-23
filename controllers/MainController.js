app.controller('MainController', ['$scope', 'ApiService', 'AuthService', '$rootScope', '$location', function($scope, ApiService, AuthService, $rootScope, $location) {
    $scope.name = 'Angular ';


    $scope.login = function() {
        $rootScope.currentPage = "login";
        var $data = {
            email: $scope.email,
            password: $scope.password
        }
        var promise = AuthService.login($data);
    };

    $scope.register = function() {
        var $data = {
            username: $scope.username,
            registration_email: $scope.registration_email,
            registration_password: $scope.registration_password
        }
        var promise = ApiService.register($data);

        promise.then(function(response) {
            console.log(promise);
        }, function(error) {
            console.log(error);
        })
    };

    $scope.logout = function() {
        var promise = AuthService.logout();
    };

    $scope.redirectHome = function() {
        $location.path('');
    };

}]);