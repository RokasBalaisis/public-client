app.controller('MediaDetailsController', ['$scope', 'ApiService', 'AuthService', '$rootScope', '$location', 'mediaDetails', function($scope, ApiService, AuthService, $rootScope, $location, mediaDetails) {
    $scope.name = 'Angular ';
    $scope.hasRegisterFormErrors = false;
    $rootScope.hasLoginFormErrors = false;
    if (typeof mediaDetails.data !== 'undefined' && mediaDetails.data != null) {
        $scope.mediaDetails = mediaDetails.data.media;
    }
    console.log($scope.mediaDetails);

}]);