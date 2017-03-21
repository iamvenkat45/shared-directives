angular.module('rmsv2.commonComponents').directive('dspValidDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.validDate = function (modelValue) {
                if (!modelValue) {
                    return true;
                }

                var format = attrs.dspValidDate || 'DDMMMYYYY';

                return moment(modelValue, format, true).isValid();
            };

            attrs.$observe('dspValidDate', function () {
                ctrl.$validate();
            });
        }
    };
});
