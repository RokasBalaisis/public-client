app.controller('UserController', ['$scope', 'ApiService', '$rootScope', '$location', '$q', 'usersIndex', function($scope, ApiService, $rootScope, $location, $q, usersIndex) {
    $scope.name = 'Angular ';
    $scope.page = 1;
    $scope.hasEditFormErrors = false;
    $scope.hasCreateFormErrors = false;
    $scope.users = usersIndex.data.users;
    if (usersIndex != null)
        $scope.totalItems = usersIndex.data.users.length;
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
    };

    $scope.closeUserCreateForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-user-create')).is(":visible")) {
            $("#popupWindow-user-create").hide();
            $scope.username_create = "";
            $scope.email_create = "";
            $scope.selectedRole_create = 1;
            $scope.password_create = "";
            $scope.hasCreateFormErrors = false;
        } else {
            $("#popupWindow-user-create").show();
            $scope.selectedRole_create = 1;
        }
    }

    $scope.create = function() {
        var $data = {
            username: $scope.username_create,
            email: $scope.email_create,
            role_id: $scope.selectedRole_create,
            password: $scope.password_create
        }
        var promise = ApiService.users_create($data);

        promise.then(function(response) {
            if (response.status == 401 || response.status == 422 || response.status == 409) {
                $scope.hasCreateFormErrors = true;

                var createMssgArray = [];
                angular.forEach(response.data, function(value, key) {
                    this.push(value[0]);
                }, createMssgArray);
                $scope.CreateFormErrorMessages = createMssgArray;

            } else if (response.status == 201) {
                $scope.hasCreateFormErrors = false;
                $scope.index();
                $scope.closeUserCreateForm();
                $scope.page = Math.ceil($scope.totalItems / 10);
                $rootScope.successMessage = response.data['message'];
                $('#successful-alert').delay(400).fadeToggle("slow", "linear");
                $('#successful-alert').delay(1000).fadeToggle(800, "linear");
            }
        }, function(error) {

        })
    };

    $scope.closeUserDeleteForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-user-delete')).is(":visible")) {
            $("#popupWindow-user-delete").hide();
        } else {
            $("#popupWindow-user-delete").show();

        }
    }

    $scope.delete = function($id) {
        var promise = ApiService.users_delete($id);
        promise.then(function(response) {
            $scope.index();
            $scope.closeUserDeleteForm();
            $rootScope.successMessage = response.data['message'];
            $('#successful-alert').delay(400).fadeToggle("slow", "linear");
            $('#successful-alert').delay(1000).fadeToggle(800, "linear");
        })
    }


    $scope.closeUserEditForm = function() {
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
            role_id: $scope.selectedRole.id,
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
                $rootScope.successMessage = response.data['message'];
                $('#successful-alert').delay(400).fadeToggle("slow", "linear");
                $('#successful-alert').delay(1000).fadeToggle(800, "linear");
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


}]);