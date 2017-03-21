angular.module('rmsv2.commonComponents').directive('dspDateRange', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.dateRange = function (modelValue) {
                if (!modelValue || attrs.dspDateRange.length === 0) {
                    return true;
                }

                var params = JSON.parse(attrs.dspDateRange);

                if (!params.comparisonDate || !params.maxDiff) {
                    return true;
                }

                var format = 'DDMMMYYYY';

                var modelDate = moment(modelValue, format, true);
                var comparisonDate = moment(params.comparisonDate, format, true);
                var maxDiff = params.maxDiff;

                if (!modelDate.isValid() || !comparisonDate.isValid()) {
                    return true;
                }

                return Math.abs(modelDate.diff(comparisonDate, 'days')) < maxDiff;
            };

            attrs.$observe('dspDateRange', function () {
                ctrl.$validate();
            });
        }
    };
});
