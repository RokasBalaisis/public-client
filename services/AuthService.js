app.factory('AuthService', ['$rootScope', '$http', '$localStorage', 'API', function($rootScope, $http, $localStorage, API) {
    return {

        getToken: function() {
            // Get the token from storage 
            return $rootScope.getAuthToken();
        },
        isAuthenticated: function() {
            // If there is a token, the return true
            return ($rootScope.getAuthToken()) ? true : false
        },
        login: function(credentials) {
            $http({
                method: 'POST',
                url: API + '/login',
                data: JSON.stringify(credentials)
            }).then(function(response) {
                    // On success, set the token and fire an event
                    $rootScope.storeAuthToken(response.data.token);
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
            // On request to logout, fire the event to be picked up
            // above
            $rootScope.$broadcast('auth-logout');
        }
    }
}]);