var breadCrumbController;

angular.module('shared-directives').directive('breadCrumbs', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'src/bread-crumbs/bread-crumbs.html',
        controller: breadCrumbController,
        controllerAs: 'vm',
        link: function (scope, element, attrs, fn) {}
    };
});

breadCrumbController = ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
    var vm = this;
    vm.breadcrumbTrail = [];

    // checks to see if the page we are setting up breadcrumbs for has a 'trail' property, which
    // is an array defined by the dev to build a trail.
    // If not, the URL is used, the levels for the trail are built from the URL structure, and its
    // dashes are removed and words capitalized.
    if ($state.current.trail) {
        vm.breadcrumbTrail = $state.current.trail;
    } else {
        var url = $state.current.url;
        // remove beginning/ending slashes
        url = url.replace(/^\//, '');
        url = url.replace(/\/$/, '');
        // split into levels
        var breadLevels = url.split('/');
        angular.forEach(breadLevels, function (level, i) {
            level = level.replace(/-/g, ' ');
            vm.breadcrumbTrail.push(level.replace(/\b\w/g, function (l) {
                return l.toUpperCase();
            }));
        });
    }

    vm.go = function (link) {
        link = link.replace(/ /g, "-").toLowerCase();
        $state.go(link);
    };
}];
