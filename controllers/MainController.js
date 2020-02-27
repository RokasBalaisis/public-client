app.controller('MainController', ['$scope', 'ApiService', 'AuthService', '$rootScope', '$location', '$http', function($scope, ApiService, AuthService, $rootScope, $location, $http) {
    $scope.name = 'Angular ';
    $scope.hasRegisterFormErrors = false;
    $rootScope.hasLoginFormErrors = false;


    $rootScope.download = function download(pathoffile, filename) {
        $http.get(pathoffile, {
            responseType: "arraybuffer"
        }).then(function(response) {
            $scope.filedata = response.data;
            var headers = response.headers();
            headers['Content-Disposition'] = "attachment";
            var blob = new Blob([response.data], { type: "octet/stream" });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

    }

    $scope.getMediaDetails = function($media) {
        console.log($media);
        var promise = ApiService.media_detailed_info($media.id);

        promise.then(function(response) {
            console.log(response.data);
        }).finally(function(innerResponse) {
            $location.path('');
        })
    }



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



}]);