angular.module('rmsv2.commonComponents').directive('restrictTo', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var re = RegExp(attrs.restrictTo);
            var exclude =
                /Backspace|Enter|Tab|Delete|Del|ArrowUp|Up|ArrowDown|Down|ArrowLeft|Left|ArrowRight|Right/;

            element[0].addEventListener('keydown', function (event) {
                if (!exclude.test(event.key) && !re.test(event.key)) {
                    event.preventDefault();
                }
            });
        }
    };
});
