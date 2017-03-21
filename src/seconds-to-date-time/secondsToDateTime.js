angular.module('rmsv2.commonComponents').filter('secondsToDateTime', function () {
    return function (seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
});

angular.module('rmsv2.commonComponents').filter('dateFormat', function () {
    return function (date) {
        return ((moment(date, "MMDDYYYY")).format("DDMMMYYYY")).toUpperCase();
    };
});
