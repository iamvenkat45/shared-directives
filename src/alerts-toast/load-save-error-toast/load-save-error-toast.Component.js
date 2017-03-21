(function () {
    'use strict';

    var loadSaveErrorToastComponent = {
        templateUrl: 'src/common_components/alerts-toast/load-save-error-toast/load-save-error-toast.View.html',
        controller: LoadSaveErrorToastController,
        controllerAs: 'lset'
    };

    angular.module('rmsv2.commonComponents')
        .component('loadSaveErrorToast', loadSaveErrorToastComponent);

    /* @ngInject */
    function LoadSaveErrorToastController($anchorScroll, $scope, SHOW_LOAD_SAVE_ERRORS,
        HIDE_LOAD_SAVE_ERRORS, SupportService) {
        var vm = this;

        var listeners = [];

        vm.show = false;

        vm.alert = {};
        vm.buttonName = 'Contact Support';

        vm.$onInit = handleInit;
        vm.$onDestroy = handleDestroy;
        vm.submitButton = submitButton;

        ////////////////////////

        function handleInit() {
            _addListeners();
        }

        function _addListeners() {
            listeners.push($scope.$on(SHOW_LOAD_SAVE_ERRORS, _showComponent));
            listeners.push($scope.$on(HIDE_LOAD_SAVE_ERRORS, _hideComponent));
        }

        function _showComponent(event, data) {
            vm.alert = data;
            vm.show = true;
            $anchorScroll();
        }

        function _hideComponent() {
            vm.show = false;
        }

        function handleDestroy() {
            _removeListeners();
        }

        function _removeListeners() {
            listeners.forEach(function (unsub) {
                unsub();
            });
        }

        function submitButton() {
            SupportService.openHelpSupportModal();
        }
    }
})();
