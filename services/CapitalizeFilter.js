app.filter('capitalize', function() {
    return function(input) {
        if (angular.isString(input) && input.length > 0) {
            return input.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        return input;
    }
});