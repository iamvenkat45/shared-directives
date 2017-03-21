var dateSearchPanelComponent = {
    bindings: {
        isInitiallyOpen: '<?',
        initialDates: '<',
        maxRange: '<?',
        onSearch: '&',
        onPanelToggle: '&?' // called when panel is collapsed/expanded
    },
    templateUrl: 'src/common_components/date-search-panel/date-search-panel.html',
    controller: DateSearchPanelController,
    controllerAs: 'dsp'
};

angular.module('rmsv2.commonComponents').component('dateSearchPanel', dateSearchPanelComponent);

/* @ngInject */
function DateSearchPanelController() {
    var vm = this;

    vm.defaultMaxRange = 350;
    vm.maxDateDiffDays = 350;

    vm.$onInit = initialize;
    vm.togglePanel = togglePanel;
    vm.handleSearch = handleSearch;
    vm.reset = reset;

    vm.openDatePicker = openDatePicker;

    // functions below are only exposed for testing purposes
    vm._initializePanelStatus = _initializePanelStatus;
    vm._initializeDates = _initializeDates;
    vm._setFormUntouched = _setFormUntouched;
    vm._isBeforeCurrentDate = _isBeforeCurrentDate;
    vm._isAfterMaxDateRange = _isAfterMaxDateRange;

    ///////////////////////

    function initialize() {
        vm._initializePanelStatus();
        vm._initializeDates();

        vm.initialized = true;
    }

    function _initializePanelStatus() {
        vm.showPanel = angular.isDefined(vm.isInitiallyOpen) ? vm.isInitiallyOpen : true;
    }

    function _initializeDates() {
        vm.defaultDates = angular.copy(vm.initialDates);
        vm.dates = angular.copy(vm.defaultDates);

        _initializeDateStrings();

        vm.startDateOptions = _getStartDateOptions();
        vm.endDateOptions = _getEndDateOptions();
    }

    function _initializeDateStrings() {
        vm.dateStrings = {};
        if (vm.defaultDates.startDate) {
            vm.dateStrings.startDate = moment(vm.defaultDates.startDate).format('DDMMMYYYY');
        }
        if (vm.defaultDates.endDate) {
            vm.dateStrings.endDate = moment(vm.defaultDates.endDate).format('DDMMMYYYY');
        }
        vm.defaultDateStrings = angular.copy(vm.dateStrings);
    }

    function togglePanel() {
        vm.showPanel = !vm.showPanel;

        if (vm.onPanelToggle) {
            vm.onPanelToggle({
                isOpen: vm.showPanel
            });
        }
    }

    function handleSearch() {
        vm.onSearch({
            dates: angular.copy(vm.dates)
        });

        vm._setFormUntouched();
    }

    function reset() {
        vm.dates = angular.copy(vm.defaultDates);
        vm.dateStrings = angular.copy(vm.defaultDateStrings);
        vm._setFormUntouched();
    }

    function _setFormUntouched() {
        vm.searchForm.$setUntouched();
    }

    function openDatePicker(event) {
        angular.element(event.currentTarget).data('kendoDatePicker').open();
    }

    function _getStartDateOptions() {
        return {
            value: vm.dates.startDate,
            disableDates: disableStartDates
        };

        function disableStartDates(date) {
            return _isBeforeCurrentDate(date) ||
                _isAfterMaxDateRange(date);
        }
    }

    function _getEndDateOptions() {
        return {
            value: vm.dates.endDate,
            disableDates: disableEndDates
        };

        function disableEndDates(date) {
            return _isBeforeCurrentDate(date) ||
                _isAfterMaxDateRange(date);
        }
    }

    function _isBeforeCurrentDate(date) {
        return moment(date).startOf('day').isBefore(moment().startOf('day'));
    }

    function _isAfterMaxDateRange(date) {
        return Math.abs(moment(date).startOf('day').diff(moment().startOf('day'), 'days')) >= vm.maxDateDiffDays;
    }
}
