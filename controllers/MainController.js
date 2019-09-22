app.controller('MainController', ['$scope', 'ApiService', 'AuthService', '$rootScope', '$location', function($scope, ApiService, AuthService, $rootScope, $location) {
    $scope.name = 'Angular ';


    $scope.login = function() {
        $rootScope.currentPage = "login";
        var $data = {
            email: $scope.email,
            password: $scope.password
        }
        var promise = AuthService.login($data);
    }

    $scope.logout = function() {
        var promise = AuthService.logout();
    }

    $scope.redirectHome = function() {
        $location.path('');
    };

}]);