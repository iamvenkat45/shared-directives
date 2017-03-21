angular.module('shared-directives').directive('spinnerDirective', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {

        },
        templateUrl: 'src/spinner-directive/spinner-directive.html',
        link: function (scope, element, attrs, fn) {}
    };
});
