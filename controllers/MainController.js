app.controller('MainController', ['$scope', 'ApiService', 'AuthService', '$rootScope', function($scope, ApiService, AuthService, $rootScope) {
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

}]);