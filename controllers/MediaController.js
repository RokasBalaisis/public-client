app.controller('MediaController', ['$scope', 'ApiService', '$rootScope', '$location', '$q', 'mediaIndex', '$sce', function($scope, ApiService, $rootScope, $location, $q, mediaIndex, $sce) {
    $scope.name = 'Angular ';
    $scope.page = 1;
    $scope.hasEditFormErrors = false;
    $scope.hasCreateFormErrors = false;
    $scope.media = mediaIndex;
    console.log(mediaIndex);
    if (mediaIndex != null && typeof mediaIndex !== 'undefined')
        $scope.totalItems = mediaIndex.length;
    $scope.sort = function(keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }


    $scope.index = function() {
        var promises = [ApiService.media_index(), ApiService.categories_index(), ApiService.mediatypes_index()];
        $q.all(promises).then(function(responses) {
            $scope.media = responses[0].data.media;
            $scope.categories = responses[1].data.categories;
            $scope.mediatypes = responses[2].data.media_types;
            angular.forEach($scope.media, function(c_value, c_key) {
                angular.forEach($scope.categories, function(m_value, m_key) {
                    if (c_value.category_id == m_value.id) {
                        $scope.media[c_key].category_name = m_value.name;
                        $scope.media[c_key].media_type_id = m_value.media_type_id;
                    }
                });
            });

            angular.forEach($scope.media, function(c_value, c_key) {
                angular.forEach($scope.mediatypes, function(m_value, m_key) {
                    if (c_value.media_type_id == m_value.id) {
                        $scope.media[c_key].media_type_name = m_value.name;
                    }
                });
            });
        })
    }


    $scope.pageChanged = function() {
        var startPos = ($scope.page - 1) * 10;
    };

    $scope.closeMediaCreateForm = function() {
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

    $scope.closeMediaDeleteForm = function() {
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


    $scope.closeMediaEditForm = function() {
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

    $scope.closeMediaDetailsForm = function() {
        $(".overlay").fadeToggle("slow", "linear");
        if ($(document.getElementById('popupWindow-media-info')).is(":visible")) {
            $("#popupWindow-media-info").hide();
            $scope.mediaDetails = "";
        } else {
            $("#popupWindow-media-info").delay(400).fadeToggle('slow');
        }
    }

    $scope.getMediaDetails = function($id) {
        $scope.fileImage = [];
        $scope.noImage();
        angular.forEach(mediaIndex, function(m_value, m_key) {
            if (m_value.id == $id) {
                $scope.mediaDetails = m_value;
                $scope.mediaDetails.trailer_url = $sce.trustAsResourceUrl('https://' + $scope.mediaDetails.trailer_url);
                angular.forEach(m_value.files, function(n_value, n_key) {
                    $scope.viewImage(n_value.id);
                })
            }
        });
    }

    $scope.getRoles = function() {
        var promise = ApiService.roles_index();
        promise.then(function(response) {
            $scope.roles = response.data.roles;
            return response.data.roles;
        });
    }

    $scope.calculateAverageRating = function(MyData) {
        if (MyData.length == 0)
            return 0;
        var sum = 0;
        for (var i = 0; i < MyData.length; i++) {
            sum += parseFloat(MyData[i].rating);
        }
        var avg = sum / MyData.length;
        return avg.toFixed(2);
    };


    $scope.viewImage = function($id) {
        var promise = ApiService.media_download_file($id);
        promise.then(function(response) {
            fr = new FileReader();
            fr.onload = function() {
                $scope.fileImage[$id] = fr.result;
            };
            fr.readAsDataURL(response.data);
        });
    }

    $scope.noImage = function() {
        var promise = ApiService.media_noimage();
        promise.then(function(response) {
            fr = new FileReader();
            fr.onload = function() {
                $scope.noFileImage = fr.result;
            };
            fr.readAsDataURL(response.data);
        });
    }
}]);