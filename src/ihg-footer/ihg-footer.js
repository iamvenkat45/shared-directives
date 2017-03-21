var ihgFooterController;

angular.module('rmsv2.commonComponents').directive('ihgFooter', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/common_components/ihg-footer/ihg-footer.html',
        scope: {
            lastLogin: "@",
            versionNumber: "@",
            copyrightYear: "@",
            userLoggedIn: '=',
            userData: '='
        },
        controller: ihgFooterController,
        controllerAs: 'vm',
        bindToController: true,
        link: function (scope, element, attrs, fn) {

        }
    };
});

ihgFooterController = ['$scope', 'Globals', function ($scope, Globals) {
    var vm = this;

    $scope.$watch("vm.lastLogin", function setTimeZone(newValue) {
        var now = new Date().toString();
        var TZ = now.indexOf('(') > -1 ?
            now.match(/\([^\)]+\)/)[0].match(/[A-Z]/g).join('') :
            now.match(/[A-Z]{3,4}/)[0];
        if (TZ === "GMT" && /(GMT\W*\d{4})/.test(now)) {
            TZ = RegExp.$1;
        }

        if (newValue) {
            vm.timezone = TZ;
        } else {
            vm.timezone = "";
        }
    });

    // Set footer bar color
    vm.setFooterColor = function () {
        if (angular.isDefined(vm.userData)) {
            if (vm.userData.user.corporateUser && Globals.showCorpSelected) {
                return {
                    'background-color': '#3b3f51'
                };
            } else if (vm.userData.user.currentLocation != null) {
                return {
                    'background-color': vm.userData.user.currentLocation.brandColor
                };
            } else {
                return {
                    'background-color': '#3b3f51'
                };
            }
        } else {
            return {
                'background-color': '#3b3f51'
            };
        }
    };

}];
