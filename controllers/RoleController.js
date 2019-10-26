app.controller('RoleController', ['$scope', 'ApiService', '$rootScope', '$location', '$q', 'rolesIndex', function($scope, ApiService, $rootScope, $location, $q, rolesIndex) {
    $scope.name = 'Angular ';
    $scope.page = 1;
    $scope.hasEditFormErrors = false;
    $scope.hasCreateFormErrors = false;
    $scope.roles = rolesIndex.data.roles;
    if (rolesIndex != null)
        $scope.totalItems = rolesIndex.data.roles.length;
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.index = function() {
        $rootScope.currentPage = "roles";
        var promise = ApiService.roles_index();
        promise.then(function(response) {
            if (response.data == null) {
                $rootScope.$broadcast('auth-logout');
                return $location.path('');
            }
            $scope.totalItems = response.data.roles.length;
            $scope.roles = response.data.roles;

            return response.data.roles;
        });


    }


    $scope.pageChanged = function() {
        var startPos = ($scope.page - 1) * 10;
    };

    $scope.closeRoleCreateForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-role-create')).is(":visible")) {
            $("#popupWindow-role-create").hide();
            $scope.name_create = "";
            $scope.hasCreateFormErrors = false;
        } else {
            $("#popupWindow-role-create").delay(400).fadeToggle('slow');
            $scope.selectedRole_create = 1;
        }
    }

    $scope.create = function() {
        var $data = {
            name: $scope.name_create.toLowerCase(),
        }
        var promise = ApiService.roles_create($data);

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
                $scope.closeRoleCreateForm();
                $scope.page = Math.ceil($scope.totalItems / 10);
                $rootScope.successMessage = response.data['message'];
                $('#successful-alert').delay(400).fadeToggle("slow", "linear");
                $('#successful-alert').delay(1000).fadeToggle(800, "linear");
            }
        }, function(error) {

        })
    };

    $scope.closeRoleDeleteForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-role-delete')).is(":visible")) {
            $("#popupWindow-role-delete").hide();
        } else {
            $("#popupWindow-role-delete").delay(400).fadeToggle('slow');

        }
    }

    $scope.delete = function($id) {
        var promise = ApiService.roles_delete($id);
        promise.then(function(response) {
            $scope.index();
            $scope.closeRoleDeleteForm();
            $rootScope.successMessage = response.data['message'];
            $('#successful-alert').delay(400).fadeToggle("slow", "linear");
            $('#successful-alert').delay(1000).fadeToggle(800, "linear");
        })
    }


    $scope.closeRoleEditForm = function() {
        var selection = "";
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-role-edit')).is(":visible")) {
            $("#popupWindow-role-edit").hide();
            $scope.name = "";
            $scope.hasEditFormErrors = false;
        } else {
            $("#popupWindow-role-edit").delay(400).fadeToggle('slow');

        }
    }

    $scope.edit = function() {
        var $data = {
            name: $scope.name,
        }
        var promise = ApiService.roles_edit($scope.roleDetails.id, $data);

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
                $scope.closeRoleEditForm();
                $rootScope.successMessage = response.data['message'];
                $('#successful-alert').delay(400).fadeToggle("slow", "linear");
                $('#successful-alert').delay(1000).fadeToggle(800, "linear");
            }
        }, function(error) {

        })
    };


    $scope.getRoleDetails = function($id) {
        var promise = ApiService.roles_detailed_info($id);
        promise.then(function(response) {
            $scope.roleDetails = response.data.role;
            $scope.name = response.data.role.name;
            return response.data.role;
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