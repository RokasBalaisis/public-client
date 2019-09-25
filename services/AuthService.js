app.factory('AuthService', ['$rootScope', '$http', '$localStorage', 'API', 'jwtHelper', function($rootScope, $http, $localStorage, API, jwtHelper) {
    return {

        getToken: function() {
            // Get the token from storage 
            return $rootScope.getAuthToken();
        },
        isAuthenticated: function() {
            // If there is a token, the return true
            $token = $rootScope.getAuthToken();
            if ($token == null)
                return false;
            return true;
        },
        login: function(credentials) {
            $http({
                method: 'POST',
                url: API + '/login',
                data: JSON.stringify(credentials)
            }).then(function(response) {

                    if (response.status == 422 || response.status == 401) {
                        var regMssgArray = [];
                        angular.forEach(response.data, function(value, key) {
                            this.push(value[0]);
                        }, regMssgArray);
                        $rootScope.hasLoginFormErrors = true;
                        $rootScope.loginErrorMessages = regMssgArray;
                    } else {
                        $rootScope.storeAuthToken(response.headers("Authorization"));
                        $rootScope.$broadcast('auth-login-complete');
                    }
                    // On success, set the token and fire an event
                },
                function(response) {
                    // On login error, fire an event for the main app to pick
                    // up
                    $rootScope.$broadcast('auth-login-error', response);
                })
        },
        logout: function() {
            $http({
                method: 'POST',
                url: API + '/logout'
            }).then(function(response) {
                    $rootScope.$broadcast('auth-logout', response.data);

                },
                function(response) {

                })
        }
    }
}]);