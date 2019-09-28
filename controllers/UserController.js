app.controller('UserController', ['$scope', 'ApiService', '$rootScope', '$location', '$q', function($scope, ApiService, $rootScope, $location, $q) {
    $scope.name = 'Angular ';
    $scope.page = 1;
    $scope.hasEditFormErrors = false;
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.index = function() {
        $rootScope.currentPage = "users";
        var promise = ApiService.users_index();
        promise.then(function(response) {
            if (response.data == null) {
                $rootScope.$broadcast('auth-logout');
                return $location.path('');
            }
            $scope.totalItems = response.data.users.length;
            $scope.users = response.data.users;


            return response.data.users;
        });


    }


    $scope.pageChanged = function() {
        var startPos = ($scope.page - 1) * 10;
        //$scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
    };


    $scope.closeUserEditForm = function() {
        var firstRun = true;
        var selection = "";
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-user-edit')).is(":visible")) {
            $("#popupWindow-user-edit").hide();
            $scope.username = "";
            $scope.email = "";
            $scope.selectedRole = "";
            $scope.password = "";
            $scope.hasEditFormErrors = false;
        } else {
            $("#popupWindow-user-edit").show();

        }
    }

    $scope.edit = function() {
        var $data = {
            username: $scope.username,
            email: $scope.email,
            role: $scope.selectedRole.id,
            password: $scope.password
        }
        var promise = ApiService.users_edit($scope.userDetails.id, $data);

        promise.then(function(response) {
            if (response.status == 401 || response.status == 422 || response.status == 409) {
                $scope.hasEditFormErrors = true;

                var editMssgArray = [];
                angular.forEach(response.data, function(value, key) {
                    this.push(value[0]);
                }, editMssgArray);
                $scope.EditFormErrorMessages = editMssgArray;

            } else if (response.status == 200) {
                $scope.hasEditFormErrors = false;
                $scope.index();
                $scope.closeUserEditForm();
            }
        }, function(error) {

        })
    };

    $scope.closeUserDetailsForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-user-info')).is(":visible")) {
            $("#popupWindow-user-info").hide();
            $scope.userDetails = "";
        } else {
            $("#popupWindow-user-info").show();
        }
    }

    $scope.getUserDetails = function($id) {
        var promise = ApiService.users_detailed_info($id);
        promise.then(function(response) {
            $scope.userDetails = response.data.user;
            $scope.selectedRole = response.data.user.role[0];
            $scope.username = response.data.user.username;
            $scope.email = response.data.user.email;
            return response.data.user;
        });
    }

    $scope.getRoles = function() {
        var promise = ApiService.roles_index();
        promise.then(function(response) {
            $scope.roles = response.data.roles;
            return response.data.roles;
        });
    }


    if ($rootScope.loggedIn())
        $scope.index();


}]);