(function () {
    'use strict';

    angular.module('rmsv2.commonComponents')
        .factory('ErrorsOnPageToastService', ErrorsOnPageToastService)
        .constant('SHOW_ERRORS_ON_PAGE_TOAST', 'EVENT:SHOW_ERRORS_ON_PAGE_TOAST')
        .constant('HIDE_ERRORS_ON_PAGE_TOAST', 'EVENT:HIDE_ERRORS_ON_PAGE_TOAST');

    /* @ngInject */
    function ErrorsOnPageToastService($rootScope, SHOW_ERRORS_ON_PAGE_TOAST, HIDE_ERRORS_ON_PAGE_TOAST) {

        // expose your service API here
        var errorsOnPageToastService = {
            show: broadcastShow,
            hide: broadcastHide
        };

        return errorsOnPageToastService;

        ////////////////////

        function broadcastShow() {
            $rootScope.$broadcast(SHOW_ERRORS_ON_PAGE_TOAST);
        }

        function broadcastHide() {
            $rootScope.$broadcast(HIDE_ERRORS_ON_PAGE_TOAST);
        }
    }
})();
