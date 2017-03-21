angular.module('rmsv2.commonComponents').directive('dspCurrentDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.currentDate = function (modelValue) {
                if (!modelValue) {
                    return true;
                }

                var modelDate = moment(modelValue, 'DDMMMYYYY', true);
                var currentDate = moment().startOf('day');

                if (!modelDate.isValid()) {
                    return true;
                }

                return modelDate.startOf('day').isSameOrAfter(currentDate);
            };

            attrs.$observe('dspCurrentDate', function () {
                ctrl.$validate();
            });
        }
    };
});
