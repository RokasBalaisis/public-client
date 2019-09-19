app.controller('UserController', ['$scope', 'ApiService', '$rootScope', function($scope, ApiService, $rootScope) {
    $scope.name = 'Angular ';


    $scope.index = function() {
        $rootScope.currentPage = "users";
        var promise = ApiService.users_index();
        promise.then(function(response) {
            $scope.users = response.data.users;
        });

    }

    $scope.index();
}]);