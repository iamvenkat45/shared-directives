angular.module('rmsv2.commonComponents').directive('dtdDateRange', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.dateRange = function (modelValue) {
                if (!modelValue || attrs.dtdDateRange.length === 0) {
                    return true;
                }

                var params = JSON.parse(attrs.dtdDateRange);

                if (!params.minDate || !params.maxDate) {
                    return true;
                }

                var format = 'DDMMMYYYY';

                var modelDate = moment(modelValue, format, true);
                var minDate = moment(params.minDate).startOf('day');
                var maxDate = moment(params.maxDate).startOf('day');

                if (!modelDate.isValid()) {
                    return true;
                }

                return modelDate.startOf('day').isSameOrAfter(minDate) && modelDate.startOf('day').isSameOrBefore(
                    maxDate);
            };

            attrs.$observe('dtdDateRange', function () {
                ctrl.$validate();
            });
        }
    };
});
