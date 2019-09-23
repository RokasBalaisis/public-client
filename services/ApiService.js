app.factory("ApiService", function($http, API) {
    return {
        login: function($data) {
            return $http.post(API + '/login', JSON.stringify($data));
        },
        register: function($data) {
            return $http.post(API + '/register', JSON.stringify($data));
        },
        users_index: function() {
            return $http.get(API + '/users');
        }
    }
})