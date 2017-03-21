angular.module('rmsv2.commonComponents').directive('numberDecimal', function () {
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
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
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
});

angular.module('rmsv2.commonComponents').directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return '';
            }

            ngModelCtrl.$parsers.push(fromUser);
            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

angular.module('rmsv2.commonComponents').directive('negativeNumberDecimal', function () {
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

                // clean out all alpha chars
                var clean = val.replace(/[^-0-9\.]/g, '');

                // remove excess or misplaced negative char (-)
                var isNeg = clean[0] === '-' ? true : false;
                if (isNeg && clean.split('-').length - 1 > 1) {
                    clean = clean.replace(/-/g, '');
                    if (isNeg) {
                        clean = '-' + clean;
                    }
                } else if (!isNeg && clean.split('-').length - 1 > 0) {
                    clean = clean.replace(/-/g, '');
                }

                var decimalCheck_a = clean.split('.');
                var sum = 0;
                for (var i = 0; i < decimalCheck_a[0].length; i++) {
                    var num = decimalCheck_a[0][i];
                    if (num !== '-') {
                        sum += Number(num);
                    }
                }
                // remove starting zero
                if ((clean[0] === '0' || (isNeg && clean[1] === '0')) && sum > 0) {
                    clean = clean.replace(/0/, '');
                }

                var decimalCheck_b = clean.split('.');
                // restrict values after dot to 2 chars
                if (!angular.isUndefined(decimalCheck_b[1])) {
                    decimalCheck_b[1] = decimalCheck_b[1].slice(0, 2);
                    clean = decimalCheck_b[0] + '.' + decimalCheck_b[1];
                }

                // set new 'clean' version of input
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
});


/*directive to remove leading zeros*/
angular.module('rmsv2.commonComponents').directive('noLeadingZeros', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            elm.blur(function () {
                var value = ctrl.$viewValue;

                if (value !== "") {
                    ctrl.$setViewValue(value * 1 + "");
                    ctrl.$render();
                }

            });
        }

    };
});
