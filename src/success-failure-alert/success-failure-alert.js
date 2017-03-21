var successFailureAlertCtrl;
angular.module('rmsv2.commonComponents').directive('successFailureAlert', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'src/common_components/success-failure-alert/success-failure-alert.html',
        controller: successFailureAlertCtrl,
        controllerAs: 'vm',
        bindToController: true,
        link: function (scope, element, attrs, fn) {


        }
    };
});

successFailureAlertCtrl = ['ToastService', '$scope', '$timeout', function (ToastService, $scope, $timeout) {
    var vm = this;
    vm.showToastMaster = false;

    vm.alertType = '';
    vm.allowCloseX = true;
    vm.strongText = '';
    vm.weakText = '';

    vm.closeToast = function () {
        ToastService.closeToast();
    };

    // Watch for variable to show toasts!
    $scope.$watch(

        function () {
            return ToastService.getShowToastMaster();
        },
        function (showToast) {
            "use strict";
            if (showToast) {
                var toastInfo = ToastService.getToastInfo();

                vm.alertType = toastInfo.alertType;
                vm.allowCloseX = toastInfo.allowCloseX;
                vm.strongText = toastInfo.strongText;
                vm.weakText = toastInfo.weakText;
                vm.showToastMaster = ToastService.getShowToastMaster();

                if (!toastInfo.allowCloseX) {
                    $timeout(function () {
                        vm.closeToast();
                    }, [3000]);
                }
            } else {
                vm.showToastMaster = false;

                vm.alertType = '';
                vm.allowCloseX = false;
                vm.strongText = '';
                vm.weakText = '';
            }
        }
    );
}];
