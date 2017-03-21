/* @ngInject */
angular.module('rmsv2.commonComponents').directive('dspTimeParadox', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.timeParadox = function (modelValue) {
                if (!modelValue || attrs.dspTimeParadox.length === 0) {
                    return true;
                }

                var dates = JSON.parse(attrs.dspTimeParadox);
                var format = 'DDMMMYYYY';

                var inputDate = moment(modelValue, format, true);
                var comparisonDate = dates.startDate ? dates.startDate : dates.endDate;
                comparisonDate = moment(comparisonDate, format, true);

                if (!inputDate.isValid() || !comparisonDate.isValid()) {
                    return true;
                }

                if (dates.startDate) {
                    return inputDate.isSameOrAfter(comparisonDate);
                } else {
                    return inputDate.isSameOrBefore(comparisonDate);
                }
            };

            attrs.$observe('dspTimeParadox', function () {
                ctrl.$validate();
            });
        }
    };
});
