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
            if (response.status == 401 || response.status == 422 || response.status == 409) {
                $scope.hasRegisterFormErrors = true;

                var regMssgArray = [];
                angular.forEach(response.data, function(value, key) {
                    this.push(value[0]);
                }, regMssgArray);
                $scope.registrationErrorMessages = regMssgArray;

            } else if (response.status == 201) {
                $scope.successfulRegistrationEvent(response);
            }
        }, function(error) {

        })
    };

    $scope.closeRegisterForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow')).is(":visible")) {
            $scope.hasRegisterFormErrors = false;
            $("#popupWindow").hide();
        } else {
            $("#popupWindow").show();
            $scope.username = "";
            $scope.registration_email = "";
            $scope.registration_password = "";
        }


    }

    $scope.successfulRegistrationEvent = function(response) {
        $scope.successMessage = response.data['message'];
        $scope.closeRegisterForm();
        $('#successful-alert').fadeToggle("slow", "linear");
        $('#successful-alert').delay(1000).fadeToggle("slow", "linear");
    }

    $scope.logout = function() {
        var promise = AuthService.logout();
    };

    $scope.redirectHome = function() {
        $location.path('');
    };


}]);