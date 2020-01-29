app.filter('dateYearParse', function() {
    return function(input) {
        if (angular.isString(input) && input.length > 0) {
            return parseInt(input);
        }
        return input;
    }
});