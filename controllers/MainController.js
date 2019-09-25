app.controller('MainController', ['$scope', 'ApiService', 'AuthService', '$rootScope', '$location', function($scope, ApiService, AuthService, $rootScope, $location) {
    $scope.name = 'Angular ';
    $scope.hasRegisterFormErrors = false;


    $scope.login = function() {
        $rootScope.currentPage = "login";
        var $data = {
            email: $scope.email,
            password: $scope.password
        }
        AuthService.login($data);
    };

    $scope.register = function() {
        var $data = {
            username: $scope.username,
            registration_email: $scope.registration_email,
            registration_password: $scope.registration_password
        }
        var promise = ApiService.register($data);

        promise.then(function(response) {
            if (response.status == 401 || response.status == 422) {
                $scope.hasRegisterFormErrors = true;
                var regMssgArray = [];
                angular.forEach(response.data, function(value, key) {
                    this.push(value[0]);
                }, regMssgArray);
                $scope.registrationErrorMessages = regMssgArray;
            }
        }, function(error) {

        })
    };

    $scope.logout = function() {
        var promise = AuthService.logout();
    };

    $scope.redirectHome = function() {
        $location.path('');
    };


}]);