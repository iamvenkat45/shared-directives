angular.module('rmsv2.commonComponents').directive('scroll', function ($window) {
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            var hamBurgerMenuBlock = angular.element(document.querySelector('#hamDropDown'));
            if (this.pageYOffset >= 1) {
                hamBurgerMenuBlock.hide();
            }
            scope.$apply();
        });
    };
});
