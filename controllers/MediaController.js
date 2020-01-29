app.controller('MediaController', ['$scope', 'ApiService', '$rootScope', '$location', '$q', 'mediaIndex', '$sce', 'ngYoutubeEmbedService', '$filter', '$timeout', 'API', function($scope, ApiService, $rootScope, $location, $q, mediaIndex, $sce, ngYoutubeEmbedService, $filter, $timeout, API) {
    var selectpickerInitiated = false;
    $scope.name = 'Angular ';
    $scope.page = 1;
    $scope.files = [];
    $scope.cover = '';
    $scope.hasEditFormErrors = false;
    $scope.hasCreateFormErrors = false;
    $scope.media = mediaIndex;
    if (mediaIndex != null && typeof mediaIndex !== 'undefined')
        $scope.totalItems = mediaIndex.length;

    $scope.yearsArray = [...Array(new Date().getFullYear() + 1).keys()].slice(1900)

    console.log($scope.yearsArray);

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
        if ($(document.getElementById('popupWindow-media-create')).is(":visible")) {
            $("#popupWindow-media-create").hide();
            $scope.name_create = "";
            $scope.short_description_create = "";
            $scope.description_create = "";
            $scope.trailer_url_create = ""
            $scope.selectedImdbRating_create = 0.1;

            $scope.actor_ids_create = [];
            $scope.files = [];
            $scope.hasCreateFormErrors = false;
        } else {

            var promises = [ApiService.mediatypes_index(), ApiService.actors_index()];
            $q.all(promises).then(function(responses) {
                $scope.mediatypes = responses[0].data.media_types;
                $scope.actors = responses[1].data.actors;
                angular.forEach($scope.actors, function(value, key) {
                    value.label = value.name + ' ' + value.surname;
                })
                if (selectpickerInitiated == false) {
                    selectpickerInitiated = true;
                    $('#actorSelection').selectpicker({
                        dropupAuto: false
                    });
                    $('#yearSelection').selectpicker({
                        dropupAuto: false
                    });
                } else {
                    $('#actorSelection').selectpicker('val', '');
                    $timeout(function() {
                        $('#actorSelection').selectpicker('refresh');
                    });
                }

            }).finally(function() {
                $("#popupWindow-media-create").delay(400).fadeToggle('slow');
                $scope.selectedImdbRating_create = 0.1;
                $scope.selectedMediaType_create = $scope.mediatypes[0];
                $scope.updateCategorySelection($scope.mediatypes[0].id);
            })
        }
    }

    $scope.updateCategorySelection = function(selection) {
        angular.forEach($scope.mediatypes, function(value, key) {
            if (value.id == selection) {
                $scope.categories = value.categories;
                $scope.selectedMediaType_create = value;
                $scope.selectedCategory_create = value.categories[0].id;
            }
        })
    };

    $scope.selectActor = function(actor) {
        $scope.actor_ids_create.push(actor);
    }

    $scope.fileUploaded = function() {}

    $rootScope.removeFile = function($id, $modelName) {
        $rootScope.$emit('uploadFormDeleteFile', [$id, $modelName]);
    };

    $scope.create = function() {
        var fd = new FormData();
        var counter = 0;
        angular.forEach($scope.files, function(file) {
            fd.append('image[' + counter + ']', file._file);
            counter++;
        });

        if (typeof $scope.name_create === 'undefined')
            $scope.name_create = "";

        fd.append('category_id', $scope.selectedCategory_create);
        fd.append('name', $scope.name_create.toLowerCase());
        fd.append('short_description', $scope.short_description_create);
        fd.append('description', $scope.description_create);
        fd.append('trailer_url', $scope.trailer_url_create);
        fd.append('imdb_rating', $scope.selectedImdbRating_create);
        fd.append('year', $('#yearSelection').val());
        fd.append('cover', $scope.cover._file);

        counter = 0;

        $scope.actor_ids_create = $('#actorSelection').val();

        angular.forEach($scope.actor_ids_create, function(file) {
            fd.append('actor_id[' + counter + ']', file);
            counter++;
        });

        var promise = ApiService.media_create(fd);

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
                $scope.closeMediaCreateForm();
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
        $scope.fileUrl = [];
        $scope.loadFiles($id);
        $scope.noImage();
        angular.forEach($scope.media, function(m_value, m_key) {
            if (m_value.id == $id) {
                $scope.mediaDetails = m_value;
                $scope.mediaDetails.trailer_url = $sce.trustAsResourceUrl($scope.mediaDetails.trailer_url);
            }
        });
        angular.forEach($scope.mediaDetails.files, function(m_value, m_key) {
            $scope.fileUrl[m_value.id] = $scope.getUrl(m_value);
        })
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


    $scope.loadFiles = function($id) {
        var currentMedia = "";
        angular.forEach(mediaIndex, function(m_value, m_key) {
            if (m_value.id == $id) {
                currentMedia = m_value;
            }
        })

        $scope.fileImage = [];
        var files = [];
        angular.forEach(currentMedia.files, function(m_value, m_key) {
            files.push(m_value.id);
        });


        // Define the initial promise
        var sequence = $q.defer();
        sequence.resolve();
        sequence = sequence.promise;

        angular.forEach(files, function(val, key) {
            sequence = sequence.then(function() {
                return $scope.downloadFile(val);
            });
        });

    }

    $scope.getUrl = function(file) {
        var datetime = file.created_at;
        datetime = datetime.replace(/\s/g, "_");
        datetime = datetime.replace(/:/g, "-");
        datetime = datetime.replace(/\./g, "-");
        return API + '/storage/' + datetime + '_' + file.name;
    }

    $scope.downloadFile = function($id) {
        var promise = ApiService.media_download_file($id);
        promise.then(function(response) {
            fr = new FileReader();
            fr.onloadend = function() {
                $scope.$apply(function() {
                    $scope.fileImage[$id] = fr.result;
                })
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