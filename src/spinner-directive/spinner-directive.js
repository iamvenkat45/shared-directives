angular.module('rmsv2.commonComponents').directive('spinnerDirective', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {

        },
        templateUrl: 'src/common_components/spinner-directive/spinner-directive.html',
        link: function (scope, element, attrs, fn) {}
    };
});
