angular.module('rmsv2.commonComponents').directive('dtdValidDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.validDate = function (modelValue) {
                if (!modelValue) {
                    return true;
                }

                var format = attrs.dtdValidDate || 'DDMMMYYYY';

                return moment(modelValue, format, true).isValid();
            };

            attrs.$observe('dtdValidDate', function () {
                ctrl.$validate();
            });
        }
    };
});
