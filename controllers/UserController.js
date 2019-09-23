app.controller('UserController', ['$scope', 'ApiService', '$rootScope', '$location', function($scope, ApiService, $rootScope, $location) {
    $scope.name = 'Angular ';
    $scope.page = 1;

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
        //$scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
    };



    if ($rootScope.loggedIn())
        $scope.index();


}]);