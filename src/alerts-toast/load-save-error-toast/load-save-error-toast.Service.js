(function () {
    'use strict';

    angular.module('rmsv2.commonComponents')
        .factory('LoadSaveErrorToastService', LoadSaveErrorToastService)
        .constant('SHOW_LOAD_SAVE_ERRORS', 'EVENT:SHOW_LOAD_SAVE_ERRORS')
        .constant('HIDE_LOAD_SAVE_ERRORS', 'EVENT:HIDE_LOAD_SAVE_ERRORS');

    /* @ngInject */
    function LoadSaveErrorToastService($rootScope, SHOW_LOAD_SAVE_ERRORS, HIDE_LOAD_SAVE_ERRORS) {

        var alert = {};
        var errorState = {
            count: 0,
            url: ''
        };
        var maxErrorCount = 3;
        var saveErrorMessage = 'Please try again.';

        // expose your service API here
        var loadSaveErrorToastService = {
            show: broadcastShow,
            hide: broadcastHide,
            catchRejectionDetails: catchRejectionDetails,
            resetErrorState: resetErrorState
        };

        return loadSaveErrorToastService;

        ////////////////////

        function broadcastShow() {
            $rootScope.$broadcast(SHOW_LOAD_SAVE_ERRORS, alert);
        }

        function broadcastHide() {
            $rootScope.$broadcast(HIDE_LOAD_SAVE_ERRORS);
        }

        function catchRejectionDetails(rejection) {
            _checkServiceMethod(rejection);
            broadcastShow();
        }

        function _checkServiceMethod(rejection) {
            if (rejection.config.method === 'POST') {
                _setErrorState(rejection.config.url);
                _checkSOAPError(rejection.data);
                _checkMaxErrors();
            } else {
                _setLoadAlert();
            }
        }

        function _setErrorState(url) {
            if (!errorState.url || errorState.url === url) {
                errorState.count++;
            }
            errorState.url = url;
        }

        function _checkSOAPError(data) {
            if (data.code === "9000") {
                saveErrorMessage = '';
                for (var item in data.errors) {
                    saveErrorMessage = data.errors[item].message + ' ' + saveErrorMessage;
                }
            }
        }

        function _checkMaxErrors() {
            if (errorState.count >= maxErrorCount) {
                _setSaveSupportAlert();
            } else {
                _setSaveAlert();
            }
        }

        function _setSaveAlert() {
            alert = {
                caption: 'Save failed!',
                message: saveErrorMessage,
                showAlertAction: false
            };
        }

        function _setSaveSupportAlert() {
            alert = {
                caption: 'Save failed!',
                message: 'Your changes could not be saved. Please contact Support.',
                showAlertAction: true
            };
        }

        function _setLoadAlert() {
            alert = {
                caption: 'Error!',
                message: 'Data failed to load. Please refresh the page or try again later.',
                showAlertAction: false
            };
        }


        function resetErrorState() {
            errorState = {
                count: 0,
                url: ''
            };
            broadcastHide();
        }
    }
})();
