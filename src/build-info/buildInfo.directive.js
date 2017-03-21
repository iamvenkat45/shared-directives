angular.module('rmsv2.commonComponents').directive('buildInfo', function ($http, $document) {
    var link = function (scope) {
        var keys = '',
            code = '6566826567656865668265', //enter the text as 'abracadabra' and press enter
            timer = null,
            isInput = function (event) {
                return (event.target.tagName === 'BUTTON') ||
                    (event.target.tagName === 'A') ||
                    (event.target.tagName === 'INPUT') ||
                    (event.target.tagName === 'SELECT') ||
                    (event.target.tagName === 'TEXTAREA');
            },
            success = function () {

                $http.get('./build.json', {
                    cache: false
                }).then(function (response) {
                    scope.buildDetails = response.data;
                    scope.debugVisible = true;
                });
            },
            cleanup = function () {
                clearTimeout(timer);

                keys = '';
            },
            keyup = function (event) {
                clearTimeout(timer);

                keys += event.which;

                timer = setTimeout(cleanup, 1000);

                if (keys === code) {
                    // If the event is triggered by an input-based event,
                    // we want to stop any propagation of the event. This way,
                    // no other event-handlers will have a chance to try and
                    // mess with it. This makes sense since we don't want to
                    // interrupt the user while they are typing.
                    if (isInput(event)) {
                        event.stopImmediatePropagation();
                    } else {
                        // Since we are managing this key event, don't let the browser execute the default behavior for this event.
                        event.preventDefault();
                        success();
                    }
                }
            };

        $document.off('keyup', keyup).on('keyup', keyup);
    };

    return {
        restrict: 'A',
        link: link,
        templateUrl: 'src/common_components/build-info/build-info.html'
    };
});
