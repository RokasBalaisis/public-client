app.filter('datetimeParse', function() {
    return function(input) {
        if (angular.isString(input) && input.length > 0) {
            input = input.replace(/\s/g, "_");
            input = input.replace(/:/g, "-");
            input = input.replace(/\./g, "-");
            return input;
        }
        return input;
    }
});