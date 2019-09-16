app.factory('AuthHttpInterceptor', ['$q', '$rootScope', '$localStorage', '$injector', 'API', function($q, $rootScope, $localStorage, $injector, API) {
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
            if (new_token = response.headers('Authorization')) {
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
                // We're going to get attempt to refresh the token on the
                // server, if we're within the ttl_refresh period.
                var deferred = $q.defer();
                // We inject $http, otherwise we will get a circular ref
                $injector.get('$http').post(API + '/reissue', {}, {
                    headers: {
                        Authorization: $rootScope.getAuthToken()
                    }
                }).then(function(response) {

                    // If this request was successful, we will have a new
                    // token, so let's put it in storage
                    console.log(response.data.token);
                    $rootScope.storeAuthToken(response.data.token);
                    console.log('added');
                    // Now let's send the original request again
                    $injector.get('$http')(response.config)
                        .then(function(response) {

                            // The repeated request was successful! So let's put
                            // this response back to the original workflow
                            return deferred.resolve(response);
                        }, function() {
                            // Something went wrong with this request
                            // So we reject the response and carry on with 401
                            // error
                            $rootScope.$broadcast('auth-logout');
                            return deferred.reject();
                        })
                }, function() {
                    // Refreshing the token failed, so let's carry on with
                    // 401
                    $rootScope.$broadcast('auth-logout');
                    return deferred.reject();
                });
                // Now we continue with the 401 error if we've reached this
                // point
                return deferred.promise;
            }
            return $q.reject(rejection);
        }
    }
}])