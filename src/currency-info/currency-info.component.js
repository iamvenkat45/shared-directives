var currencyInfoComponent = {
    bindings: {
        text: '@',
        noPad: '<'
    },
    templateUrl: 'src/currency-info/currency-info.html',
    controller: CurrencyInfoController,
    controllerAs: 'ci'
};

angular.module('shared-directives').component('currencyInfo', currencyInfoComponent);

/* @ngInject */
function CurrencyInfoController(UserService) {
    var vm = this;

    vm.currencyCode = '';
    vm.infoText = '';

    vm.$onInit = initialize;

    ///////////////////////

    function initialize() {
        _initCurrencyCode();
        _initInfoText();
    }

    function _initCurrencyCode() {
        vm.currencyCode = UserService.getCurrencyCode();
    }

    function _initInfoText() {
        vm.infoText = vm.text || 'All rate values are in';
    }
}
