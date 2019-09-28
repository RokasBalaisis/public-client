app.factory('AuthHttpInterceptor', ['$q', '$rootScope', '$localStorage', '$injector', 'API', '$location', function($q, $rootScope, $localStorage, $injector, API, $location) {
    return {
        // When sending a request
        request: function(config) {

            // Pick up the token from storage and attach to headers
            config.headers.Authorization = $localStorage.auth_token;
            // Send the request
            return config;
        },
        // On a successful response
        response: function(response) {
            // If there is a token in the headers, retrieve it
            if (new_token = response.headers("Authorization")) {
                // Store the token in storage
                $rootScope.storeAuthToken(new_token);
            }
            // Return the reponse to the app
            return response;
        },
        // On a unsuccessful response
        responseError: function(rejection) {
            // If the error is 401 related
            if (rejection.status === 401) {
                $rootScope.deleteAuthToken();
                $rootScope.$broadcast('auth-logout');
            }
            return rejection;
        }
    };
}]);