app.factory("ApiService", function($http, API) {
    return {
        login: function($data) {
            return $http.post(API + '/login', JSON.stringify($data));
        }
    }
})