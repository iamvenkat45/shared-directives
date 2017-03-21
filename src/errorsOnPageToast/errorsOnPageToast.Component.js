(function () {
    'use strict';

    var errorsOnPageToastComponent = {
        templateUrl: 'src/common_components/errorsOnPageToast/errorsOnPageToast.View.html',
        controller: ErrorsOnPageToastController,
        controllerAs: 'eopt'
    };

    angular.module('rmsv2.commonComponents')
        .component('errorsOnPageToast', errorsOnPageToastComponent);

    /* @ngInject */
    function ErrorsOnPageToastController($anchorScroll, $scope, SHOW_ERRORS_ON_PAGE_TOAST,
        HIDE_ERRORS_ON_PAGE_TOAST) {
        var vm = this;

        var listeners = [];

        vm.show = false;

        vm.caption = 'Error';
        vm.message = 'There are errors on the page';

        vm.$onInit = handleInit;
        vm.$onDestroy = handleDestroy;

        ////////////////////////

        function handleInit() {
            _addListeners();
        }

        function _addListeners() {
            listeners.push($scope.$on(SHOW_ERRORS_ON_PAGE_TOAST, _showComponent));
            listeners.push($scope.$on(HIDE_ERRORS_ON_PAGE_TOAST, _hideComponent));
        }

        function _showComponent() {
            $anchorScroll();
            vm.show = true;
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
    }
})();
