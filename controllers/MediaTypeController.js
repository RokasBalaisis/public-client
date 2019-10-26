app.controller('MediaTypeController', ['$scope', 'ApiService', '$rootScope', '$location', '$q', 'mediatypesIndex', function($scope, ApiService, $rootScope, $location, $q, mediatypesIndex) {
    $scope.name = 'Angular ';
    $scope.page = 1;
    $scope.hasEditFormErrors = false;
    $scope.hasCreateFormErrors = false;
    $scope.mediatypes = mediatypesIndex.data.media_types;
    if (mediatypesIndex != null && typeof mediatypesIndex.data.media_types !== 'undefined')
        $scope.totalItems = mediatypesIndex.data.media_types.length;
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.index = function() {
        $rootScope.currentPage = "mediaTypes";
        var promise = ApiService.mediatypes_index();
        promise.then(function(response) {
            if (response.data == null) {
                $rootScope.$broadcast('auth-logout');
                return $location.path('');
            }
            $scope.totalItems = response.data.media_types.length;
            $scope.mediatypes = response.data.media_types;

            return response.data.media_types;
        });


    }


    $scope.pageChanged = function() {
        var startPos = ($scope.page - 1) * 10;
    };

    $scope.closeMediatypeCreateForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-mediatype-create')).is(":visible")) {
            $("#popupWindow-mediatype-create").hide();
            $scope.name_create = "";
            $scope.hasCreateFormErrors = false;
        } else {
            $("#popupWindow-mediatype-create").delay(400).fadeToggle('slow');
        }
    }

    $scope.create = function() {
        var $data = {
            name: $scope.name_create.toLowerCase(),
        }
        var promise = ApiService.mediatypes_create($data);

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
                $scope.closeMediatypeCreateForm();
                $scope.page = Math.ceil($scope.totalItems / 10);
                $rootScope.successMessage = response.data['message'];
                $('#successful-alert').delay(400).fadeToggle("slow", "linear");
                $('#successful-alert').delay(1000).fadeToggle(800, "linear");
            }
        }, function(error) {

        })
    };

    $scope.closeMediatypeDeleteForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-mediatype-delete')).is(":visible")) {
            $("#popupWindow-mediatype-delete").hide();
        } else {
            $("#popupWindow-mediatype-delete").delay(400).fadeToggle('slow');

        }
    }

    $scope.delete = function($id) {
        var promise = ApiService.mediatypes_delete($id);
        promise.then(function(response) {
            $scope.index();
            $scope.closeMediatypeDeleteForm();
            $rootScope.successMessage = response.data['message'];
            $('#successful-alert').delay(400).fadeToggle("slow", "linear");
            $('#successful-alert').delay(1000).fadeToggle(800, "linear");
        })
    }


    $scope.closeMediatypeEditForm = function() {
        var selection = "";
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-mediatype-edit')).is(":visible")) {
            $("#popupWindow-mediatype-edit").hide();
            $scope.name = "";
            $scope.hasEditFormErrors = false;
        } else {
            $("#popupWindow-mediatype-edit").delay(400).fadeToggle('slow');

        }
    }

    $scope.edit = function() {
        var $data = {
            name: $scope.name,
        }
        var promise = ApiService.mediatypes_edit($scope.mediatypeDetails.id, $data);

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
                $scope.closeMediatypeEditForm();
                $rootScope.successMessage = response.data['message'];
                $('#successful-alert').delay(400).fadeToggle("slow", "linear");
                $('#successful-alert').delay(1000).fadeToggle(800, "linear");
            }
        }, function(error) {

        })
    };


    $scope.getMediatypeDetails = function($id) {
        var promise = ApiService.mediatypes_detailed_info($id);
        promise.then(function(response) {
            $scope.mediatypeDetails = response.data.media_type;
            $scope.name = response.data.media_type.name;
            return response.data.media_type;
        });
    }

    $scope.getMediaTypes = function() {
        var promise = ApiService.mediatypes_index();
        promise.then(function(response) {
            $scope.mediatypes = response.data.media_types;
            return response.data.media_types;
        });
    }

}]);