app.factory("ApiService", function($http, API) {
    return {
        login: function($data) {
            return $http.post(API + '/login', JSON.stringify($data));
        },
        register: function($data) {
            return $http.post(API + '/register', JSON.stringify($data));
        },
        roles_index: function() {
            return $http.get(API + '/roles');
        },
        users_index: function() {
            return $http.get(API + '/users');
        },
        users_detailed_info: function($id) {
            return $http.get(API + '/users/' + $id);
        },
        users_edit: function($id, $data) {
            return $http.put(API + '/users/' + $id, JSON.stringify($data));
        }
    }
})