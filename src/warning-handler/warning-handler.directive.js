(function () {
    'use strict';

    /**
     * Warning Handler directive
     *
     * This (almost) seamlessly adds warning validations to form inputs.
     * Once you add this directive to an input, you can write warning validators the same way you write regular validators.
     * The directive adds new attributes to ngModel:
     *  - warningValidators (Object) - like $validators
     *  - warnings (Object) - like $error
     *  - warning (Boolean) - like $invalid
     *  - noWarning (Boolean) - like $valid
     * Any changes to the model value trigger validations to run.
     * As an added bonus, it also integrates with ng-messages nicely.
     * DOES NOT SUPPORT ASYNC VALIDATIONS.
     *
     * @example
     * // adding the handler and a warning validator to an input
     * <input name="someInput"
     *        warning-handler
     *        not-a-number-warning
     *        ng-model="vm.model" />
     * @example
     * // declaring a warning validator
     * app.directive('notANumberWarning', notANumberWarningDirective);
     * function notANumberWarningDirective() {
     *  return {
     *   require: 'ngModel',
     *   link: function(scope, elm, attrs, ngModel) {
     *    ngModel.warningValidators.notANumberWarning = function(modelValue) {
     *     return !isNaN(modelValue);
     *   }
     * }
     * @example
     * // integrating with ng-messages
     * <div class="warning-msg"
     *      ng-messages="vm.someForm.someInput.warnings"
     *      ng-show="vm.someForm.someInput.$valid && vm.someForm.someInput.warning">
     *   <span ng-message="notANumberWarning">Value is not a number :(</span>
     * </div>
     */
    angular.module('rmsv2.commonComponents')
        .directive('warningHandler', warningHandlerDirective);

    function warningHandlerDirective() {
        return {
            require: 'ngModel',
            link: linkFunction
        };

        ///////////////////////

        function linkFunction(scope, elm, attrs, ngModel) {
            if (!ngModel.warningValidators) {
                initializeWarningAttributes();
            }

            scope.$watch(watchFunction, runWarningValidators);

            //////////////////////////////////////

            function initializeWarningAttributes() {
                ngModel.warningValidators = {}; // like $validators
                ngModel.warnings = {}; // like $error
                ngModel.warning = false; // like $invalid
                ngModel.noWarning = true; // like $valid
                ngModel.validateWarnings = validateWarnings; // function to run validations manually
            }

            function watchFunction() {
                return ngModel.$modelValue;
            }

            function validateWarnings() {
                runWarningValidators(ngModel.$modelValue);
            }

            function runWarningValidators(modelValue) {
                var hasNoWarnings = getWarningValidatorNames().reduce(function (isOk, validatorName) {
                    var noWarning = ngModel.warningValidators[validatorName](modelValue);

                    if (noWarning) {
                        delete ngModel.warnings[validatorName];
                    } else {
                        ngModel.warnings[validatorName] = true;
                    }

                    return (!noWarning || !isOk) ? false : true;
                }, true);

                ngModel.noWarning = hasNoWarnings;
                ngModel.warning = !hasNoWarnings;
            }

            function getWarningValidatorNames() {
                var names = [];
                for (var name in ngModel.warningValidators) {
                    names.push(name);
                }

                return names;
            }
        }
    }
})();
