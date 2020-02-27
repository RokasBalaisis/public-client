app.controller('LandingController', ['$scope', 'ApiService', 'AuthService', '$rootScope', '$location', 'latestMedia', function($scope, ApiService, AuthService, $rootScope, $location, latestMedia) {
    $scope.name = 'Angular ';
    $scope.hasRegisterFormErrors = false;
    $rootScope.hasLoginFormErrors = false;

    if (latestMedia != null && typeof latestMedia !== 'undefined')
        $scope.mediatypes = latestMedia.data.media_types;

    $scope.getMediaTypesCount = function() {
        var promise = ApiService.mediatypes_count();
        promise.then(function(response) {
            $scope.mediatypes = response.data.media_types;
            $scope.mediaLoaded = true;
        })
    }

    $scope.getMedia = function() {
        var promise = ApiService.mediatypes_latest_with_media();
        promise.then(function(response) {
            $scope.mediatypes = response.data.media_types;
            $scope.mediaLoaded = true;
        })
    }



}]);