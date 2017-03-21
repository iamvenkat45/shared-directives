angular.module('rmsv2.commonComponents').directive('dtdCurrentDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.currentDate = function (modelValue) {
                if (!modelValue) {
                    return true;
                }
                var pastActiveDate;

                if (attrs.dtdCurrentDate) {
                    var param = JSON.parse(attrs.dtdCurrentDate);
                    pastActiveDate = moment(param).startOf('day');
                }

                var modelDate = moment(modelValue, 'DDMMMYYYY', true);
                var currentDate = moment().startOf('day');

                if (!modelDate.isValid()) {
                    return true;
                }

                return modelDate.startOf('day').isSameOrAfter(currentDate) || modelDate.isSame(
                    pastActiveDate);
            };

            attrs.$observe('dtdCurrentDate', function () {
                ctrl.$validate();
            });
        }
    };
});
