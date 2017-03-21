angular.module('rmsv2.commonComponents').directive('noSearchResult', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: 'src/common_components/no-search-result-directive/no-search-result.html',
        link: function (scope, element, attrs, fn) {}
    };
});
