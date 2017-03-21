angular.module('rmsv2.commonComponents').filter('startsWith', function () {
    return function (items, prefix, itemProperty) {
        if (!items || !items.length) {
            return;
        }
        return items.filter(function (item) {
            var findIn = itemProperty ? item[itemProperty] : item;

            return findIn.toString().indexOf(prefix) === 0;
        });
    };
});
