app.factory("ApiService", function($http, API) {
    return {
        login: function($data) {
            return $http.post(API + '/login', JSON.stringify($data));
        },
        logout: function() {
            return $http.post(API + '/logout');
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
        },
        users_delete: function($id) {
            return $http.delete(API + '/users/' + $id);
        }
    }
})