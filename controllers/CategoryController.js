app.controller('CategoryController', ['$scope', 'ApiService', '$rootScope', '$location', '$q', 'categoriesIndex', function($scope, ApiService, $rootScope, $location, $q, categoriesIndex) {
    $scope.name = 'Angular ';
    $scope.page = 1;
    $scope.hasEditFormErrors = false;
    $scope.hasCreateFormErrors = false;
    $scope.categories = categoriesIndex;
    if (categoriesIndex != null && typeof categoriesIndex !== 'undefined')
        $scope.totalItems = categoriesIndex.length;

    $scope.getMediatypes = function() {
        var promise = ApiService.mediatypes_index();
        promise.then(function(response) {
            $scope.mediatypes = response.data.media_types;

        }).finally(function(response) {
            angular.forEach($scope.categories, function(c_value, c_key) {
                angular.forEach($scope.mediatypes, function(m_value, m_key) {
                    if (c_value.media_type_id == m_value.id) {
                        $scope.categories[c_key].media_type_name = m_value.name;
                    }
                });
            });
        });
    }

    $scope.index = function() {
        var promises = [ApiService.categories_index(), ApiService.mediatypes_index()];
        $q.all(promises).then(function(responses) {
            $scope.categories = responses[0].data.categories;
            $scope.totalItems = responses[0].data.categories.length;
            $scope.mediatypes = responses[1].data.media_types;
            angular.forEach($scope.categories, function(c_value, c_key) {
                angular.forEach($scope.mediatypes, function(m_value, m_key) {
                    if (c_value.media_type_id == m_value.id) {
                        $scope.categories[c_key].media_type_name = m_value.name;
                    }
                });
            });
        })
    }

    $scope.sort = function(keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }


    $scope.pageChanged = function() {
        var startPos = ($scope.page - 1) * 10;
    };

    $scope.closeCategoryCreateForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-category-create')).is(":visible")) {
            $("#popupWindow-category-create").hide();
            $scope.name_create = "";
            $scope.selectedMediatype_create = 1;
            $scope.hasCreateFormErrors = false;
        } else {
            $("#popupWindow-category-create").delay(400).fadeToggle('slow');
            $scope.selectedMediatype_create = 1;
        }
    }

    $scope.create = function() {
        var $data = {
            name: $scope.name_create.toLowerCase(),
            media_type_id: $scope.selectedMediatype_create,
        }
        var promise = ApiService.categories_create($data);

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
                $scope.closeCategoryCreateForm();
                $scope.page = Math.ceil($scope.totalItems / 10);
                $rootScope.successMessage = response.data['message'];
                $('#successful-alert').delay(400).fadeToggle("slow", "linear");
                $('#successful-alert').delay(1000).fadeToggle(800, "linear");
            }
        }, function(error) {

        })
    };

    $scope.closeCategoryDeleteForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-category-delete')).is(":visible")) {
            $("#popupWindow-category-delete").hide();
        } else {
            $("#popupWindow-category-delete").delay(400).fadeToggle('slow');

        }
    }

    $scope.delete = function($id) {
        var promise = ApiService.categories_delete($id);
        promise.then(function(response) {
            $scope.index();
            $scope.closeCategoryDeleteForm();
            $rootScope.successMessage = response.data['message'];
            $('#successful-alert').delay(400).fadeToggle("slow", "linear");
            $('#successful-alert').delay(1000).fadeToggle(800, "linear");
        })
    }


    $scope.closeCategoryEditForm = function() {

        var selection = "";
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-category-edit')).is(":visible")) {
            $("#popupWindow-category-edit").hide();
            $scope.name = "";
            $scope.selectedMediatype = "";
            $scope.hasEditFormErrors = false;
        } else {
            $("#popupWindow-category-edit").delay(400).fadeToggle('slow');
        }
    }

    $scope.edit = function() {
        var $data = {
            name: $scope.name.toLowerCase(),
            media_type_id: $scope.selectedMediatype.id,
        }
        var promise = ApiService.categories_edit($scope.categoryDetails.id, $data);

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
                $scope.closeCategoryEditForm();
                $rootScope.successMessage = response.data['message'];
                $('#successful-alert').delay(400).fadeToggle("slow", "linear");
                $('#successful-alert').delay(1000).fadeToggle(800, "linear");
            }
        }, function(error) {

        })
    };


    $scope.getMediatypes = function() {
        var promise = ApiService.mediatypes_index();
        promise.then(function(response) {
            $scope.mediatypes = response.data.media_types;
        });
    }

    $scope.getCategoryDetails = function($id) {
        var promise = ApiService.categories_detailed_info($id);
        promise.then(function(response) {
            $scope.categoryDetails = response.data.category;
            $scope.name = response.data.category.name;
            var innerPromise = ApiService.mediatypes_detailed_info(response.data.category.media_type_id);
            innerPromise.then(function(response) {
                $scope.selectedMediatype = response.data.media_type;
                $scope.selectedMediatype.categories.splice(0, $scope.selectedMediatype.categories.length);
                delete $scope.selectedMediatype['categories'];
            })
        });
    }


}]);