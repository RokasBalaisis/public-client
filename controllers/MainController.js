app.controller('MainController', ['$scope', 'ApiService', 'AuthService', '$rootScope', '$location', function($scope, ApiService, AuthService, $rootScope, $location) {
    $scope.name = 'Angular ';
    $scope.hasRegisterFormErrors = false;
    $rootScope.hasLoginFormErrors = false;



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
            email: $scope.registration_email,
            password: $scope.registration_password
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
            $("#popupWindow").delay(400).fadeToggle('slow');
            $scope.username = "";
            $scope.registration_email = "";
            $scope.registration_password = "";
        }
    }

    $scope.successfulRegistrationEvent = function(response) {
        $scope.closeRegisterForm();
        $rootScope.successMessage = response.data['message'];
        $('#successful-alert').delay(400).fadeToggle("slow", "linear");
        $('#successful-alert').delay(1000).fadeToggle(800, "linear");

    }

    $scope.logout = function() {
        var promise = AuthService.logout();
    };

    $scope.redirectHome = function() {
        $location.path('/');
    };

    $scope.getMedia = function() {
        var promise = ApiService.mediatypes_latest_with_media();
        promise.then(function(response) {
            $scope.mediatypes = response.data.media_types;
        })
    }


    $scope.$on('$locationChangeStart', function(event, next, current) {
        if (next == $location.absUrl('/'))
            $scope.getMedia();
    });
}]);