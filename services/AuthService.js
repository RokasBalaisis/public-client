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
                    // On success, set the token and fire an event
                    $rootScope.storeAuthToken(response.headers("Authorization"));
                    $rootScope.$broadcast('auth-login-success', response.data);

                },
                function(response) {
                    // On login error, fire an event for the main app to pick
                    // up
                    $rootScope.$broadcast('auth-login-error', response);
                }).finally(function() {
                // Once the login process is complete (successful or 
                // unsuccessful), fire this event
                $rootScope.$broadcast('auth-login-complete');
            });
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