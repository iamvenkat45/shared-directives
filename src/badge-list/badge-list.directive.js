var badgeListController;
angular.module('shared-directives').directive('badgeList', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/badge-list/badge-list.html',
        scope: {
            items: "="
        },
        controller: badgeListController,
        controllerAs: 'vm',
        bindToController: true,
        link: function(scope, element, attrs, fn) {

        }
    };
});

badgeListController = ['$scope', 'Globals', function($scope, Globals) {
    var vm = this;
    console.log(vm.items);

}];