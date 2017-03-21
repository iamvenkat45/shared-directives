(function () {
    'use strict';

    angular.module('rmsv2.commonComponents')
        .service('modalDialogService', function ($injector, $uibModalStack) {
            var $uibModal = $injector.get('$uibModal'),

                modalSettings = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: false
                },
                defaultModalOptions = {
                    actionButtonText: 'OK',
                    closeButtonText: 'Cancel',
                    headerText: 'Default Modal',
                    message: 'Message goes here!'
                },
                show = function (customModalOptions, customModalSettings) {
                    //Create temp objects to work with since we're in a singleton service
                    var tempModalSettings = {},
                        tempModalOptions = {},
                        modalOptions = {};

                    switch (customModalOptions.type) {
                        case 'custom':
                            modalSettings.templateUrl = customModalOptions.templateUrl;
                            break;

                        default:
                            modalSettings.templateUrl = 'src/common_components/modal-dialog/default-modal.html';
                            modalOptions = defaultModalOptions;
                    }

                    //Map angular-ui modal custom defaults to modal defaults defined in service
                    angular.extend(tempModalSettings, modalSettings, customModalSettings);

                    //Map modal.html $scope custom properties to defaults defined in service
                    angular.extend(tempModalOptions, modalOptions, customModalOptions);

                    if (!tempModalSettings.controller) {
                        tempModalSettings.controller = function ($scope, $uibModalInstance, modalOptions,
                            modalAsyncData) {
                            $scope.modalOptions = modalOptions;
                            $scope.modalAsyncData = modalAsyncData;
                            $scope.modalOptions.ok = function (result) {
                                $uibModalInstance.close(result);
                            };
                            $scope.modalOptions.close = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        };
                        tempModalSettings.controller.$inject = ['$scope', '$uibModalInstance', 'modalOptions',
                            'modalAsyncData'
                        ];
                    }
                    tempModalSettings.resolve = {
                        // resolves data passed in modalOptions param like modalOptions.data which will be directly injected
                        // into the scope of modal controller
                        modalOptions: function () {
                            return tempModalOptions;
                        },
                        // This acts just like a resolver method in a router.
                        // Can be used to resolve an api before opening the modal. Resolved data is also accessed through
                        // scope of the modal controller using modalAsyncData
                        modalAsyncData: function () {
                            return tempModalSettings.modalResolve ? tempModalSettings.modalResolve :
                                null;
                        }
                    };

                    return $uibModal.open(tempModalSettings).result;
                },
                closeAllModals = function () {
                    $uibModalStack.dismissAll();
                };

            this.showModal = function (customModalOptions, customModalSettings) {
                customModalSettings = customModalSettings || {};
                customModalSettings.backdrop = 'static';

                return show(customModalOptions, customModalSettings);
            };

            this.closeAll = function () {
                return closeAllModals();
            };

        });
}());
