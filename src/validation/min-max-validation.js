(function () {
    "use strict";
    /**
     * minMaxValidation
     * Description : This is a custom validation to find if the text box is within the range of minimum value and maximum value
     * Four inputs are taken from element attributes
     * minVal = minimum value
     * maxVal = maximum value
     * noNumberValidation = if no numbervalidation is needed make it true
     * decimal = if number with decimal validation is needed make it true
     * Currently implemented in edit-alert-setting (Edit-alert.html)
     */
    angular.module('rmsv2.commonComponents').directive('minMaxValidation', function () {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var minVal = attrs.minVal,
                    maxVal = attrs.maxVal,
                    decimal = attrs.decimal,
                    noNumberValidation = attrs.noNumberValidation,
                    isTextSelected = function (input) {
                        if (typeof input.selectionStart === "number") {
                            return input.selectionStart === 0 && input.selectionEnd === input.value.length;
                        } else if (typeof document.selection !== "undefined") {
                            input.focus();
                            return document.selection.createRange().text === input.value;
                        }
                    },
                    validateField = function (fieldVal) {
                        var valid;
                        if (isNaN(parseInt(fieldVal))) {
                            valid = false;
                        } else if (isNaN(Number(fieldVal))) {
                            valid = false;
                        } else {
                            if (fieldVal <= parseInt(minVal) || fieldVal > parseInt(maxVal)) {
                                valid = false;
                            } else {
                                valid = true;
                            }
                        }

                        ctrl.$setValidity('minMaxValidation', valid);
                        return fieldVal;
                    };

                ctrl.$parsers.push(validateField);
                ctrl.$formatters.unshift(validateField);

                //Validate the decimal and numerals only
                elem.bind('keypress', function (e) {
                    if (!noNumberValidation) {
                        //Accept decimal upto two decimal points only
                        if (decimal) {
                            if (!(e.keyCode >= 48 && e.keyCode <= 57) || !(e.keyCode >= 96 && e
                                    .keyCode <= 105) && e.keyCode === 32) {
                                if (e.keyCode !== 46) {
                                    e.preventDefault();
                                }
                            }

                            var clean = elem[0].value.replace(/[^-0-9\.]/g, ''),
                                periodIndex = clean.indexOf('.'),
                                selectionStart = elem[0].selectionStart;

                            var decimalCheck = clean.split('.');
                            if (!angular.isUndefined(decimalCheck[1])) {
                                if (decimalCheck[1].length >= 2 && (selectionStart >
                                        periodIndex)) {
                                    e.preventDefault();
                                }
                            }
                        }
                        //Accept Numbers Only and prevent the user to type other than numbers
                        else if (!decimal && !(e.keyCode >= 48 && e.keyCode <= 57) || !(e.keyCode >=
                                96 && e.keyCode <= 105) && e.keyCode === 32) {
                            e.preventDefault();
                        }
                    }
                });
            }
        };
    });
}());
