app.controller('UserController', ['$scope', 'ApiService', '$rootScope', '$location', function($scope, ApiService, $rootScope, $location) {
    $scope.name = 'Angular ';


    $scope.index = function() {
        $rootScope.currentPage = "users";
        var promise = ApiService.users_index();
        promise.then(function(response) {
            if (response.data == null) {
                $rootScope.$broadcast('auth-logout');
                return $location.path('');
            }
            $scope.users = response.data.users;
        });

    }
    if ($rootScope.loggedIn())
        $scope.index();
}]);