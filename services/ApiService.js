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
        categories_index: function() {
            return $http.get(API + '/categories');
        },
        categories_detailed_info: function($id) {
            return $http.get(API + '/categories/' + $id);
        },
        categories_create: function($data) {
            return $http.post(API + '/categories', JSON.stringify($data));
        },
        categories_edit: function($id, $data) {
            return $http.put(API + '/categories/' + $id, JSON.stringify($data));
        },
        categories_delete: function($id) {
            return $http.delete(API + '/categories/' + $id);
        },
        mediatypes_index: function() {
            return $http.get(API + '/mediatypes');
        },
        mediatypes_detailed_info: function($id) {
            return $http.get(API + '/mediatypes/' + $id);
        },
        mediatypes_create: function($data) {
            return $http.post(API + '/mediatypes', JSON.stringify($data));
        },
        mediatypes_edit: function($id, $data) {
            return $http.put(API + '/mediatypes/' + $id, JSON.stringify($data));
        },
        mediatypes_delete: function($id) {
            return $http.delete(API + '/mediatypes/' + $id);
        },
        roles_index: function() {
            return $http.get(API + '/roles');
        },
        roles_detailed_info: function($id) {
            return $http.get(API + '/roles/' + $id);
        },
        roles_create: function($data) {
            return $http.post(API + '/roles', JSON.stringify($data));
        },
        roles_edit: function($id, $data) {
            return $http.put(API + '/roles/' + $id, JSON.stringify($data));
        },
        roles_delete: function($id) {
            return $http.delete(API + '/roles/' + $id);
        },
        users_index: function() {
            return $http.get(API + '/users');
        },
        users_detailed_info: function($id) {
            return $http.get(API + '/users/' + $id);
        },
        users_create: function($data) {
            return $http.post(API + '/users', JSON.stringify($data));
        },
        users_edit: function($id, $data) {
            return $http.put(API + '/users/' + $id, JSON.stringify($data));
        },
        users_delete: function($id) {
            return $http.delete(API + '/users/' + $id);
        }
    }
})