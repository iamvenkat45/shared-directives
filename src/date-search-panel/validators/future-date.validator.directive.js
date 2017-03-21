angular.module('rmsv2.commonComponents').directive('dspFutureDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.futureDate = function (modelValue) {
                if (!modelValue || attrs.dspFutureDate.length === 0) {
                    return true;
                }

                var maxDiffDaysFromToday = JSON.parse(attrs.dspFutureDate);

                if (!maxDiffDaysFromToday) {
                    return true;
                }

                var format = 'DDMMMYYYY';

                var modelDate = moment(modelValue, format, true);

                if (!modelDate.isValid()) {
                    return true;
                }

                return Math.abs(modelDate.diff(moment().startOf('day'), 'days')) <=
                    maxDiffDaysFromToday;
            };

            attrs.$observe('dspFutureDate', function () {
                ctrl.$validate();
            });
        }
    };
});
