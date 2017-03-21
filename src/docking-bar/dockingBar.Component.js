(function () {
    'use strict';

    var dockingBarComponent = {
        transclude: true,
        templateUrl: 'src/common_components/docking-bar/dockingBar.View.html',
        controller: DockingBarController,
        controllerAs: 'db'
    };

    angular.module('rmsv2.commonComponents')
        .component('dockingBar', dockingBarComponent);

    /* @ngInject */
    function DockingBarController($rootScope, $interval, $document) {
        var vm = this;

        var heightCheckInterval;

        vm.passiveEventsSupported = false;
        vm.dockableElement = null;
        vm.placeholderElement = null;
        vm.isDocked = false;

        vm.$onInit = initialize;
        vm.$postLink = postLink;
        vm.$onDestroy = onDestroy;

        // functions below are only exposed for testing purposes
        vm._checkPassiveEventsSupport = _checkPassiveEventsSupport;
        vm._rememberElements = _rememberElements;
        vm._addEventListeners = _addEventListeners;
        vm._addHeightCheckInterval = _addHeightCheckInterval;
        vm._toggleDock = _toggleDock;
        vm._dereferenceElements = _dereferenceElements;
        vm._removeEventListeners = _removeEventListeners;
        vm._removeInterval = _removeInterval;

        ///////////////////////

        function initialize() {
            vm._checkPassiveEventsSupport();
        }

        function _checkPassiveEventsSupport() {
            // if there is support, then the browser will access the getter for the 'passive' property
            // and execute the function within, which will set the flag to true
            try {
                var opts = Object.defineProperty({}, 'passive', {
                    get: function () {
                        vm.passiveEventsSupported = true;
                    }
                });

                window.addEventListener('test', null, opts);
            } catch (e) {}
        }

        function postLink() {
            vm._rememberElements();
            vm._addEventListeners();
            vm._addHeightCheckInterval();
            vm._toggleDock();
        }

        function _rememberElements() {
            vm.dockableElement = $('#dockingBarContent');
            vm.placeholderElement = $('#dockingBarPlaceholder').get()[0];
        }

        function _addEventListeners() {
            $rootScope.$on('kendoWidgetCreated', _toggleDock);
            _addPassiveEventListener('resize', _toggleDock);
            _addPassiveEventListener('scroll', _toggleDock);
        }

        function _addPassiveEventListener(type, handler) {
            window.addEventListener(type, handler, vm.passiveEventsSupported ? {
                passive: true
            } : false);
        }

        function _addHeightCheckInterval() {
            var height = _getPageHeight();
            heightCheckInterval = $interval(function () {
                var newHeight = _getPageHeight();
                if (height !== newHeight) {
                    _toggleDock();
                    height = newHeight;
                }
            }, 250, 0, false);
        }

        function _getPageHeight() {
            return $document.height();
        }

        function _toggleDock() {
            if (!vm.placeholderElement) {
                return;
            }

            if (_shouldBeDocked()) {
                _dock();
            } else {
                _undock();
            }
        }

        function _shouldBeDocked() {
            return !_isElementInViewport();
        }

        function _isElementInViewport() {
            var rect = vm.placeholderElement.getBoundingClientRect();

            return (
                rect.bottom > 0 && rect.bottom <= $(window).height()
            );
        }

        function _dock() {
            if (!vm.isDocked) {
                $rootScope.$apply(function () {
                    vm.isDocked = true;
                });
            }
        }

        function _undock() {
            if (vm.isDocked) {
                $rootScope.$apply(function () {
                    vm.isDocked = false;
                });
            }
        }

        function onDestroy() {
            vm._dereferenceElements();
            vm._removeEventListeners();
            vm._removeInterval();
        }

        function _dereferenceElements() {
            vm.dockableElement = null;
            vm.placeholderElement = null;
        }

        function _removeEventListeners() {
            window.removeEventListener('resize', _toggleDock);
            window.removeEventListener('scroll', _toggleDock);
        }

        function _removeInterval() {
            $interval.cancel(heightCheckInterval);
        }
    }

})();