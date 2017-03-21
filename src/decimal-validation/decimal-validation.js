angular.module('rmsv2.commonComponents').directive('decimalValidation', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }
            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                if (clean.indexOf('-') !== -1) {
                    clean = clean.replace('-', '');
                }

                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean = negativeCheck[0] + '-' + negativeCheck[1];
                    if (negativeCheck[0].length > 0) {
                        clean = negativeCheck[0];
                    }

                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    if (decimalCheck[0] === "" && decimalCheck[1] === "") {
                        clean = "0.0";
                    } else {
                        decimalCheck[1] = decimalCheck[1].slice(0, 1);
                        if (decimalCheck[0] === "") {
                            decimalCheck[0] = "0";
                        } else if (decimalCheck[1] === "") {
                            decimalCheck[1] = "0";
                        }
                        clean = decimalCheck[0] + '.' + decimalCheck[1];
                    }
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });
            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });

        }
    };
}).directive('ngMin', ['Globals', function (Globals) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = +attr.ngMin || 0;
                if (!Globals.isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
}]).directive('ngMax', ['Globals', function (Globals) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = +attr.ngMax || Infinity;
                if (!Globals.isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
}]);
