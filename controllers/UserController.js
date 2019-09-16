app.controller('UserController', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.name = 'Angular ';


    $scope.index = function() {
        var promise = ApiService.users_index();
        //promise.then();
    }

    $scope.index();
}]);