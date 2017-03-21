var alertsToastComponent = {
    bindings: {
        showAlert: '<',
        alertType: '<',
        alertDismissible: '<',
        alertCaption: '<',
        alertMessage: '<',
        showAlertAction: '<',
        alertActionName: '<',
        submitAction: '&',
        closeAlert: '&'
    },
    templateUrl: 'src/common_components/alerts-toast/alerts-toast.html',
    controller: AlertsToastController,
    controllerAs: 'at'
};

angular.module('rmsv2.commonComponents').component('alertsToast', alertsToastComponent);

/* @ngInject */
function AlertsToastController() {
    var vm = this;

    vm.$onInit = initialize;

    ///////////////////////

    function initialize() {
        vm.showAlert = false;
        vm.showAlertAction = false;
    }

}
