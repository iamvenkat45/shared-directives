var dateToDateFieldsComponent = {
    bindings: {
        minDate: '<',
        maxDate: '<',
        pastActiveDate: '<',
        maxDateDiffDays: '<',
        initialDates: '<',
        onValidityChange: '&',
        onDateChange: '&',
        customError: '<'
    },
    templateUrl: 'src/common_components/date-to-date-fields/date-to-date-fields.html',
    controller: DateToDateFieldsController,
    controllerAs: 'dtd'
};

angular.module('rmsv2.commonComponents').component('dateToDateFields', dateToDateFieldsComponent);

/* @ngInject */
function DateToDateFieldsController($timeout) {
    var vm = this;

    vm.$onInit = initialize;
    vm.$onChanges = initialize;
    vm.reset = reset;
    vm.inputChange = inputChange;
    vm.openDatePicker = openDatePicker;

    // functions below are only exposed for testing purposes
    vm._initializeDates = _initializeDates;
    vm._setFormUntouched = _setFormUntouched;
    vm._isBeforeCurrentDate = _isBeforeCurrentDate;
    vm._isAfterMaxDateRange = _isAfterMaxDateRange;

    ///////////////////////

    function initialize() {
        vm._initializeDates();
        _initializeErrorMessages();
        vm.initialized = true;
        validityChange();
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

    function _initializeErrorMessages() {
        vm.error = {
            fields: {
                startDate: 'Start date',
                endDate: 'End date'
            },
            messages: {
                required: 'is required',
                timeParadoxStartDate: 'cannot be later than end date',
                timeParadoxEndDate: 'cannot be earlier than start date',
                currentDate: 'cannot be earlier than the current date',
                dateRange: 'must be within the allowed date range',
                validDate: 'Invalid date format'
            }
        };
        if (vm.customError) {
            angular.forEach(vm.customError.messages, function (value, object) {
                vm.error.messages[object] = value;
            });
        }
    }

    function inputChange() {
        validityChange();
        $timeout(function () {
            vm.onDateChange({
                dates: vm.dates
            });
        });
    }

    function validityChange() {
        $timeout(function () {
            vm.onValidityChange({
                isValid: vm.dateForm.$valid
            });
        });
    }

    function reset() {
        vm.dates = angular.copy(vm.defaultDates);
        vm.dateStrings = angular.copy(vm.defaultDateStrings);
        vm._setFormUntouched();
    }

    function _setFormUntouched() {
        vm.dateForm.$setUntouched();
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
            return (_isBeforeMinDate(date) && _isPastActiveDate(date)) || _isAfterMaxDate(date);
        }
    }

    function _getEndDateOptions() {
        return {
            value: vm.dates.endDate,
            disableDates: disableEndDates
        };

        function disableEndDates(date) {
            return _isBeforeMinDate(date) ||
                _isAfterMaxDate(date);
        }
    }

    function _isBeforeMinDate(date) {
        if (vm.minDate) {
            return moment(date).startOf('day').isBefore(moment(vm.minDate).startOf('day'));
        } else {
            return _isBeforeCurrentDate(date);
        }
    }

    function _isBeforeCurrentDate(date) {
        return moment(date).startOf('day').isBefore(moment().startOf('day'));
    }

    function _isAfterMaxDate(date) {
        if (vm.maxDate) {
            return moment(date).startOf('day').isAfter(moment(vm.maxDate).startOf('day'));
        } else {
            return _isAfterMaxDateRange(date);
        }
    }

    function _isAfterMaxDateRange(date) {
        return Math.abs(moment(date).startOf('day').diff(moment().startOf('day'), 'days')) >= vm.maxDateDiffDays;
    }

    function _isPastActiveDate(date) {
        return vm.pastActiveDate ? moment(date).startOf('day').diff(moment(vm.pastActiveDate).startOf('day'), 'days') !==
            0 : true;
    }
}
