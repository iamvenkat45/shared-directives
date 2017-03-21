var kendoGridSettingsButtonCtrl;

angular.module('rmsv2.commonComponents').directive('kendoGridSettingsButton', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            options: '<',
            rowClick: '<',
            columnClick: '<',
            isPaginationDisabled: '<'
        },
        templateUrl: 'src/common_components/kendo-support-directives/kendo-grid-settings-button/kendo-grid-settings-button.html',
        controller: kendoGridSettingsButtonCtrl,
        controllerAs: 'vm',
        bindToController: true,
        link: function (scope, element, attrs, fn) {


        }
    };
});

kendoGridSettingsButtonCtrl = ['$scope', '$rootScope', '$timeout', 'spinnerService', function ($scope, $rootScope,
    $timeout, spinnerService) {
    var vm = this;

    // set passed in data to easy to use variables
    vm.predefinedViews = vm.options().predefinedViews;
    vm.rows = vm.options().rows;
    vm.columns = vm.options().columns;
    vm.fullNames = vm.options().fullNames;
    vm.columnsObject = {};
    vm.showStickyFooter = vm.options().showStickyFooter;
    vm.open = false;
    var content = '';

    // get the columns array object
    var getColumnsObject = function () {
        for (var column in vm.columns.values) {
            vm.columnsObject[vm.columns.values[column]] = vm.columns.default.indexOf(vm.columns.values[
                column]) > -1;
        }
    };

    // check if the columns checkbox is disabled
    vm.checkDisabled = function (value) {
        return vm.columns.disabled.indexOf(value) > -1;
    };

    // PREDEFINED VIEWS - collections of columns that should be shown and hidden
    var buildPredefinedViewsTemplate = function () {
        content += '<div class="col-md-12 section-space">' +
            '<div class="section-header">{{vm.predefinedViews.title}}</div>' +
            '<div ng-repeat="value in vm.predefinedViews.values">' +
            '<label class="label-font">' +
            '<input type="radio" class="radio-margin" ng-change="vm.predefinedViewsClickHandler(value)" ng-model="vm.predefinedViews.default" value="{{value}}">' +
            '{{value}}' +
            '</label>' +
            '</div>' +
            '</div>';
    };

    // ROWS - list of numbers that change the number of rows per page of the grid
    var buildRowsTemplate = function () {
        content += '<div class="col-md-12 section-space section-rows">' +
            '<div class="section-header">{{vm.rows.title}}</div>' +
            '<div class="rows-inline row-option" ng-repeat="value in vm.rows.values track by $index">' +
            '<label class="label-font">' +
            '<input type="radio" class="radio-margin" ng-change="vm.rowClickHandler(value)" ng-model="vm.rows.default" ng-disabled="vm.isPaginationDisabled" value="{{value}}">' +
            '{{vm.rows.labels ? vm.rows.labels[$index] : value}}</label>' +
            '</div>' +
            '</div>';
    };

    // COLUMNS - list of columns to display, which should be enabled to change, and initial settings of each column
    var buildColumnsTemplate = function () {
        content += '<div class="col-md-12 section-space">' +
            '<div class="section-header">{{vm.columns.title}}</div>' +
            '<div ng-repeat="value in vm.columns.values track by $index">' +
            '<label class="label-font">' +
            '<input type="checkbox" class="radio-margin" ng-change="vm.columnClickHandler(value)" ng-model="vm.columnsObject[value]" ng-disabled="vm.checkDisabled(value)" value="{{value}}">' +
            '{{vm.fullNames[value]}}</label>' +
            '</div>' +
            '</div>';
    };

    // section divider template
    var buildDividerTemplate = function () {
        content += '<div class="col-md-12 section-border"></div>';
    };

    // start building the popup
    var buildContent = function () {
        var content = '<div class="settings-popup">';
        if (vm.predefinedViews) {
            buildPredefinedViewsTemplate();
        }
        if (vm.predefinedViews && vm.rows) {
            buildDividerTemplate();
        }
        if (vm.rows) {
            buildRowsTemplate();
        }
        if (vm.predefinedViews && vm.columns || vm.rows && vm.columns) {
            buildDividerTemplate();
        }
        if (vm.columns) {
            getColumnsObject();
            buildColumnsTemplate();
        }
        // close contents with a closing div
        content += '</div>';
    };
    buildContent();

    // update columns object if the predefined view is changed.
    var updateColumnsObject = function (value) {
        for (var column in vm.columns.values) {
            vm.columnsObject[vm.columns.values[column]] = vm.predefinedViews.viewsList[value].indexOf(vm.columns
                .values[column]) > -1;
        }
    };

    // predefined view click event handler
    vm.predefinedViewsClickHandler = function (value) {
        updateColumnsObject(value);
        vm.columnClick(vm.columnsObject);
    };

    // row click event handler
    vm.rowClickHandler = function (value) {
        if (!vm.isPaginationDisabled) {
            spinnerService.start('refresh-grid');
            $timeout(function () {
                //  vm.settingsButton.hide();
                vm.rowClick(value);
            }, 20);
        }

    };

    // column click event handler
    vm.columnClickHandler = function (value) {
        if (!vm.checkDisabled(value)) {
            vm.columnClick(vm.columnsObject);
        }
    };

    // build options object for ToolTip
    vm._options = {
        content: content,
        callout: false,
        position: 'left',
        autoHide: false,
        width: 200,
        showOn: 'click',
        hide: onHide,
        show: onShow
    };

    function onHide() {
        if (vm.showStickyFooter) {
            $timeout(function () {
                $rootScope.stickyFooter = false;
            }, 20);

        }
    }

    function onShow() {
        if (vm.showStickyFooter) {
            $timeout(function () {
                $rootScope.stickyFooter = true;
            }, 20);
        }
    }

    // hide settings panel when clicked on the gear icon
    vm.hideSettings = function () {
        if (vm.open) {
            vm.settingsButton.hide();
        }
        vm.open = !vm.open;
    };
}];
