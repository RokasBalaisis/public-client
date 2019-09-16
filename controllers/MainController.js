app.controller('MainController', ['$scope', 'ApiService', 'AuthService', function($scope, ApiService, AuthService) {
    $scope.name = 'Angular ';


    $scope.login = function() {
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