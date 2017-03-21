angular.module('rmsv2.commonComponents').directive('collapseOnOff', function () {
    return {
        restrict: 'E',
        scope: {
            id: '='
        },
        replace: true,
        template: "<div><i class='fa fa-expand hand-cur' aria-hidden='true'></i></div>",
        link: function (scope, elem, attrs) {
            elem.bind("click", function () {

                var grid = $("#" + this.id).data("kendoGrid");
                var allMasterRows = grid.tbody.find('>tr.k-master-row');
                if (elem.children().hasClass('fa-expand')) {
                    elem.children().removeClass('fa-expand');
                    elem.children().addClass('fa-compress');
                    for (var i = 0; i < allMasterRows.length; i++) {
                        grid.expandRow(allMasterRows.eq(i));
                    }
                } else {
                    elem.children().removeClass('fa-compress');
                    elem.children().addClass('fa-expand');
                    for (var ii = 0; ii < allMasterRows.length; ii++) {
                        grid.collapseRow(allMasterRows.eq(ii));
                    }
                }

            });
        }
    };
});

angular.module('rmsv2.commonComponents').directive('removeOkBtn', function () {
    return {
        restrict: 'E',
        replace: true,
        template: "<span data-field='command' class='k-filtercell' data-role='filtercell'><span class='k-operator-hidden'><div class='align-center'><a href='' ng-click = 'clearfilters()' ng-disabled='isableFiltersButton()' id='k-action-reset-filter' class=' alignment btn btn-default k-action-filter clearFilterBtn-margin fa fa-close ' data-role='button' role='button' aria-disabled='false' tabindex='0'></a><a href='' ng-click='submit()' ng-disabled='disableFiltersButton()' id='k-action-submit-filter' class='alignment btn btn-default k-action-filter fa fa-check ' data-role='button' role='button' aria-disabled='false' tabindex='0'></a></div></span></span>",
        link: function (scp, element, attrs, controller) {
            var temp = scp;
            element.bind("click", function () {
                console.log('close filter');
            });
        },
    };
});

angular.module('rmsv2.commonComponents').directive('showHideFilter', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            id: '='
        },
        template: '<input type="button" value="Show Filters" class="btn btn-default btn-clr btn-grid-toggle-filters">',
        link: function (scope, elem, attrs) {
            elem.bind("click", function () {
                var el;
                if (elem.val() === "Hide Filters") {
                    elem.val("Show Filters");
                    el = $("#" + this.id).find('.k-filter-row');
                    el.hide();
                } else {
                    elem.val("Hide Filters");
                    el = $("#" + this.id).find('.k-filter-row');
                    el.show();
                }
            });
        }
    };
});

angular.module('rmsv2.commonComponents').directive('validateCls', function () {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, elem, attrs) {

            scope.$watch(function () {
                return elem.attr('class');
            }, function (newValue) {
                console.log(newValue);
            });
        }
    };
});

angular.module('rmsv2.commonComponents').directive('arrangeKendoPager', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            id: "@",
            submit: '&',
            clearfilters: '&',
        },
        controller: function ($scope) {
            $scope.ctrlSubmitFilter = function ($scope) {
                $scope.submit();
            };
            $scope.ctrlClearfilter = function ($scope) {
                $scope.clearfilter();
            };
        },
        link: function (scope, elt, attrs) {
            scope.exchangeElements = function (firstElt, lastElt) {

                var clonedElement1 = firstElt.cloneNode(true);
                var clonedElement2 = lastElt.cloneNode(true);

                firstElt.parentNode.removeChild(lastElt);
                firstElt.parentNode.insertBefore(clonedElement2, firstElt);
            };

            scope.domManipulation = function (firstElt, lastElt) {
                var clonedElement1 = firstElt.cloneNode(true);
                var clonedElement2 = lastElt.cloneNode(true);

                firstElt.parentNode.removeChild(lastElt);
                firstElt.parentNode.insertBefore(clonedElement2, firstElt);

                var col1 = document.createElement("div");
                col1.setAttribute('class', 'col-sm-3');

                var col2 = document.createElement("div");
                col2.setAttribute('class', 'col-sm-6');

                var col3 = document.createElement("div");
                col3.setAttribute('class', 'col-sm-2');

                var col4 = document.createElement("div");
                col4.setAttribute('class', 'col-sm-1');

                firstElt.parentNode.appendChild(col1);
                firstElt.parentNode.appendChild(col2);
                firstElt.parentNode.appendChild(col3);
                firstElt.parentNode.appendChild(col4);
            };

            scope.domManipulation(elt.children()[2].childNodes[0], elt.children()[2].childNodes[5]);
            elt.children()[2].childNodes[1].children[0].childNodes[0].nodeValue = '';
            elt.children()[2].childNodes[2].children[0].childNodes[0].nodeValue = '';
            elt.children()[2].childNodes[4].children[0].childNodes[0].nodeValue = '';
            elt.children()[2].childNodes[5].children[0].childNodes[0].nodeValue = '';

            elt.children()[2].childNodes[1].removeAttribute('title');
            elt.children()[2].childNodes[2].removeAttribute('title');
            elt.children()[2].childNodes[3].removeAttribute('title');
            elt.children()[2].childNodes[4].removeAttribute('title');
            elt.children()[2].childNodes[5].removeAttribute('title');

            var e1 = elt.children()[2].childNodes[0].cloneNode(true);
            var e2 = elt.children()[2].childNodes[1].cloneNode(true);
            var e3 = elt.children()[2].childNodes[2].cloneNode(true);
            var e4 = elt.children()[2].childNodes[3].cloneNode(true);
            var e5 = elt.children()[2].childNodes[4].cloneNode(true);
            var e6 = elt.children()[2].childNodes[5].cloneNode(true);

            elt.children()[2].childNodes[6].appendChild(e1);

            elt.children()[2].childNodes[7].appendChild(e2);
            elt.children()[2].childNodes[7].appendChild(e3);
            elt.children()[2].childNodes[7].appendChild(e4);
            elt.children()[2].childNodes[7].appendChild(e5);
            elt.children()[2].childNodes[7].appendChild(e6);

            elt.children()[2].removeChild(elt.children()[2].childNodes[0]);
            elt.children()[2].removeChild(elt.children()[2].childNodes[0]);
            elt.children()[2].removeChild(elt.children()[2].childNodes[0]);
            elt.children()[2].removeChild(elt.children()[2].childNodes[0]);
            elt.children()[2].removeChild(elt.children()[2].childNodes[0]);
            elt.children()[2].removeChild(elt.children()[2].childNodes[0]);


            elt.children()[2].childNodes[1].children[0].classList.add('col-sm-1', 'col-sm-offset-1',
                'bg-clr');
            elt.children()[2].childNodes[1].children[0].classList.remove('k-link');
            elt.children()[2].childNodes[1].children[0].childNodes[0].classList.remove('k-icon');
            elt.children()[2].childNodes[1].children[0].childNodes[0].classList.add('btn', 'btn-default',
                'fa', 'fa-angle-double-left');


            elt.children()[2].childNodes[1].children[1].classList.add('col-sm-1', 'bg-clr');
            elt.children()[2].childNodes[1].children[1].classList.remove('k-link');
            elt.children()[2].childNodes[1].children[1].childNodes[0].classList.remove('k-icon');
            elt.children()[2].childNodes[1].children[1].childNodes[0].classList.add('btn', 'btn-default',
                'fa', 'fa-angle-left');

            elt.children()[2].childNodes[1].children[2].classList.add('col-sm-6', 'align-center',
                'padding-top-5', 'ng-binding');
            elt.children()[2].childNodes[1].children[2].childNodes[1].classList.remove('k-textbox');
            elt.children()[2].childNodes[1].children[2].childNodes[1].classList.add('data-table-page-input',
                'ng-valid', 'ng-dirty', 'ng-touched');
            elt.children()[2].childNodes[1].children[2].childNodes[1].setAttribute('validate-cls', '');

            elt.children()[2].childNodes[1].children[3].classList.add('col-sm-1', 'bg-clr');
            elt.children()[2].childNodes[1].children[3].classList.remove('k-link');
            elt.children()[2].childNodes[1].children[3].childNodes[0].classList.remove('k-icon');
            elt.children()[2].childNodes[1].children[3].childNodes[0].classList.add('btn', 'btn-default',
                'fa', 'fa-angle-right');

            elt.children()[2].childNodes[1].children[4].classList.add('col-sm-1', 'bg-clr');
            elt.children()[2].childNodes[1].children[4].classList.remove('k-link');
            elt.children()[2].childNodes[1].children[4].childNodes[0].classList.remove('k-icon');
            elt.children()[2].childNodes[1].children[4].childNodes[0].classList.add('btn', 'btn-default',
                'fa', 'fa-angle-double-right');

            var settingBtn = document.createElement("setting-btn");
            settingBtn.setAttribute('ng-click', 'settingBtn()');
            elt.children()[2].childNodes[3].appendChild(settingBtn);

            var showhideDiv = document.createElement("show-hide-filter");
            showhideDiv.setAttribute('class', 'align-right');
            showhideDiv.setAttribute('id', scope.id);

            showhideDiv.setAttribute('ng-click', 'showHidebtn(event)');
            elt.children()[2].childNodes[2].appendChild(showhideDiv);
            //                elt.children()[0].setAttribute('class','firstpos');
            //                elt.children()[2].setAttribute('class','secondpos');
            //
            //                 scope.$watch(function() {
            //                     if(elt.children()[1].childNodes[1].children[2].childNodes[1].classList.toString()==="k-textbox"){
            //                         elt.children()[2].childNodes[1].children[2].childNodes[1].classList.remove('k-textbox');
            //                         elt.children()[2].childNodes[1].children[2].childNodes[1].classList.add('data-table-page-input', 'ng-valid', 'ng-dirty', 'ng-touched');
            //                       //  $compile(elt.contents())(scope);
            //                     }
            //                    //return elt;
            //                 });
            // angular.element( document.querySelector( '.k-filter-row' )).append("<span data-field='command' class='k-filtercell' data-role='filtercell'><span class='k-operator-hidden'><div class='align-center'><a href='' ng-disabled='isableFiltersButton()' id='k-action-reset-filter' class='btn btn-default k-action-filter fa fa-close ' data-role='button' role='button' aria-disabled='false' tabindex='0' ></a><a href='' ng-disabled='disableFiltersButton()' id='k-action-submit-filter' class='btn btn-default k-action-filter fa fa-check ' data-role='button' role='button' aria-disabled='false' tabindex='0' ></a></div><button type='button' class='k-button k-button-icon' title='Clear' data-bind='visible:operatorVisible' style='display: none;'><span class='k-icon k-i-close'></span></button></span></span>");
            //angular.element( document.querySelector( '.k-filter-row' ));
            //var elm = angular.element("<span data-field='command' class='k-filtercell' data-role='filtercell'><span class='k-operator-hidden'><div class='align-center'><a href='' ng-disabled='isableFiltersButton()' id='k-action-reset-filter' class='btn btn-default k-action-filter fa fa-close ' data-role='button' role='button' aria-disabled='false' tabindex='0' ></a><a href='' ng-disabled='disableFiltersButton()' id='k-action-submit-filter' class='btn btn-default k-action-filter fa fa-check ' data-role='button' role='button' aria-disabled='false' tabindex='0' ></a></div><button type='button' class='k-button k-button-icon' title='Clear' data-bind='visible:operatorVisible' style='display: none;'><span class='k-icon k-i-close'></span></button></span></span>");

            // $("#"+scope.id).find('.k-filter-row').children()[length-1];
            //  var length = angular.element( document.querySelector( '.k-filter-row' )).children().length;
            var length = $("#" + scope.id).find('.k-filter-row').children().length;
            var removeOkBtn = document.createElement("remove-ok-btn");

            var temp = $("#" + scope.id).find('.k-filter-row').children()[length - 1];
            temp.childNodes[0].remove();
            removeOkBtn.setAttribute('submit', scope.submit);
            removeOkBtn.setAttribute('clearfilter', scope.clearfilters);
            $("#" + scope.id).find('.k-filter-row').children()[length - 1].appendChild(removeOkBtn);

            var getRow = $("#" + scope.id).find('.k-filter-row').children();

            angular.forEach(getRow, function (item) {
                $("#" + scope.id).find('.k-dropdown-operator').remove();
                $("#" + scope.id).find('.k-button').remove();
                // angular.element( item.querySelector( '.k-autocomplete' )).remove();

                //                        var autocomplete = angular.element(item.querySelector( '.k-autocomplete' )).kendoAutoComplete({
                //                                              suggest: false,
                ////                                               filtering: function(e) {
                ////                                                                                var filter = e.filter;
                ////
                //////                                                                                if (!filter.value) {
                //////                                                                                  //prevent filtering if the filter does not value
                //////                                                                                  e.preventDefault();
                //////                                                                                }
                ////                                                                            }
                //
                //                       }).data("kendoAutoComplete");
                //
                //
                //                      if(autocomplete!==undefined){
                //
                //
                //
                //                          autocomplete.options.suggest = false;
                //                         // autocomplete.options.filtering();
                //                                  autocomplete.bind("open", function(e) {
                //                                      e.preventDefault();
                //                                  });
                //                      }

            });

            var tmp = $("#" + scope.id).find('.k-filter-row').children();
            if (tmp.hasClass('k-hierarchy-cell')) {
                $("#" + scope.id).find('.k-filter-row').children()[0].childNodes[0].nodeValue = '';
                var collapseOnOff = document.createElement("collapse-on-off");
                collapseOnOff.setAttribute('id', scope.id);
                $("#" + scope.id).find('.k-filter-row').children()[0].appendChild(collapseOnOff);
            }

            $("#" + scope.id).find('.k-filter-row').hide();
            $compile(elt.contents())(scope);
        }

    };
});

angular.module('rmsv2.commonComponents').directive('arrangeKendoPagerClient', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            id: "@",
            submit: '&',
            clearfilters: '&',
        },
        controller: function ($scope) {
            $scope.ctrlSubmitFilter = function ($scope) {
                $scope.submit();
            };
            $scope.ctrlClearfilter = function ($scope) {
                $scope.clearfilter();
            };
        },
        link: function (scope, elt, attrs) {
            scope.exchangeElements = function (firstElt, lastElt) {

                var clonedElement1 = firstElt.cloneNode(true);
                var clonedElement2 = lastElt.cloneNode(true);

                firstElt.parentNode.removeChild(lastElt);
                firstElt.parentNode.insertBefore(clonedElement2, firstElt);
            };

            scope.domManipulation = function (firstElt, lastElt) {
                var clonedElement1 = firstElt.cloneNode(true);
                var clonedElement2 = lastElt.cloneNode(true);

                firstElt.parentNode.removeChild(lastElt);
                firstElt.parentNode.insertBefore(clonedElement2, firstElt);

                var col1 = document.createElement("div");
                col1.setAttribute('class', 'col-sm-3');

                var col2 = document.createElement("div");
                col2.setAttribute('class', 'col-sm-6');

                var col3 = document.createElement("div");
                col3.setAttribute('class', 'col-sm-2');

                var col4 = document.createElement("div");
                col4.setAttribute('class', 'col-sm-1');

                firstElt.parentNode.appendChild(col1);
                firstElt.parentNode.appendChild(col2);
                firstElt.parentNode.appendChild(col3);
                firstElt.parentNode.appendChild(col4);
            };
            scope.domManipulation(elt.children()[1].childNodes[0], elt.children()[1].childNodes[5]);
            elt.children()[1].childNodes[1].children[0].childNodes[0].nodeValue = '';
            elt.children()[1].childNodes[2].children[0].childNodes[0].nodeValue = '';
            elt.children()[1].childNodes[4].children[0].childNodes[0].nodeValue = '';
            elt.children()[1].childNodes[5].children[0].childNodes[0].nodeValue = '';

            elt.children()[1].childNodes[1].removeAttribute('title');
            elt.children()[1].childNodes[2].removeAttribute('title');
            elt.children()[1].childNodes[3].removeAttribute('title');
            elt.children()[1].childNodes[4].removeAttribute('title');
            elt.children()[1].childNodes[5].removeAttribute('title');

            var e1 = elt.children()[1].childNodes[0].cloneNode(true);
            var e2 = elt.children()[1].childNodes[1].cloneNode(true);
            var e3 = elt.children()[1].childNodes[2].cloneNode(true);
            var e4 = elt.children()[1].childNodes[3].cloneNode(true);
            var e5 = elt.children()[1].childNodes[4].cloneNode(true);
            var e6 = elt.children()[1].childNodes[5].cloneNode(true);

            elt.children()[1].childNodes[6].appendChild(e1);

            elt.children()[1].childNodes[7].appendChild(e2);
            elt.children()[1].childNodes[7].appendChild(e3);
            elt.children()[1].childNodes[7].appendChild(e4);
            elt.children()[1].childNodes[7].appendChild(e5);
            elt.children()[1].childNodes[7].appendChild(e6);

            elt.children()[1].removeChild(elt.children()[1].childNodes[0]);
            elt.children()[1].removeChild(elt.children()[1].childNodes[0]);
            elt.children()[1].removeChild(elt.children()[1].childNodes[0]);
            elt.children()[1].removeChild(elt.children()[1].childNodes[0]);
            elt.children()[1].removeChild(elt.children()[1].childNodes[0]);
            elt.children()[1].removeChild(elt.children()[1].childNodes[0]);


            elt.children()[1].childNodes[1].children[0].classList.add('col-sm-1', 'col-sm-offset-1',
                'bg-clr');
            elt.children()[1].childNodes[1].children[0].classList.remove('k-link');
            elt.children()[1].childNodes[1].children[0].childNodes[0].classList.remove('k-icon');
            elt.children()[1].childNodes[1].children[0].childNodes[0].classList.add('btn', 'btn-default',
                'fa', 'fa-angle-double-left');


            elt.children()[1].childNodes[1].children[1].classList.add('col-sm-1', 'bg-clr');
            elt.children()[1].childNodes[1].children[1].classList.remove('k-link');
            elt.children()[1].childNodes[1].children[1].childNodes[0].classList.remove('k-icon');
            elt.children()[1].childNodes[1].children[1].childNodes[0].classList.add('btn', 'btn-default',
                'fa', 'fa-angle-left');

            elt.children()[1].childNodes[1].children[2].classList.add('col-sm-6', 'align-center',
                'padding-top-5', 'ng-binding');
            elt.children()[1].childNodes[1].children[2].childNodes[1].classList.remove('k-textbox');
            elt.children()[1].childNodes[1].children[2].childNodes[1].classList.add('data-table-page-input',
                'ng-valid', 'ng-dirty', 'ng-touched');
            elt.children()[1].childNodes[1].children[2].childNodes[1].setAttribute('validate-cls', '');

            elt.children()[1].childNodes[1].children[3].classList.add('col-sm-1', 'bg-clr');
            elt.children()[1].childNodes[1].children[3].classList.remove('k-link');
            elt.children()[1].childNodes[1].children[3].childNodes[0].classList.remove('k-icon');
            elt.children()[1].childNodes[1].children[3].childNodes[0].classList.add('btn', 'btn-default',
                'fa', 'fa-angle-right');

            elt.children()[1].childNodes[1].children[4].classList.add('col-sm-1', 'bg-clr');
            elt.children()[1].childNodes[1].children[4].classList.remove('k-link');
            elt.children()[1].childNodes[1].children[4].childNodes[0].classList.remove('k-icon');
            elt.children()[1].childNodes[1].children[4].childNodes[0].classList.add('btn', 'btn-default',
                'fa', 'fa-angle-double-right');

            var settingBtn = document.createElement("setting-btn");
            settingBtn.setAttribute('ng-click', 'settingBtn()');
            elt.children()[1].childNodes[3].appendChild(settingBtn);

            var showhideDiv = document.createElement("show-hide-filter");
            showhideDiv.setAttribute('class', 'align-right');
            showhideDiv.setAttribute('id', scope.id);

            showhideDiv.setAttribute('ng-click', 'showHidebtn(event)');
            elt.children()[1].childNodes[2].appendChild(showhideDiv);
            //                elt.children()[0].setAttribute('class','firstpos');
            //                elt.children()[1].setAttribute('class','secondpos');
            //
            //                 scope.$watch(function() {
            //                     if(elt.children()[1].childNodes[1].children[2].childNodes[1].classList.toString()==="k-textbox"){
            //                         elt.children()[1].childNodes[1].children[2].childNodes[1].classList.remove('k-textbox');
            //                         elt.children()[1].childNodes[1].children[2].childNodes[1].classList.add('data-table-page-input', 'ng-valid', 'ng-dirty', 'ng-touched');
            //                       //  $compile(elt.contents())(scope);
            //                     }
            //                    //return elt;
            //                 });
            // angular.element( document.querySelector( '.k-filter-row' )).append("<span data-field='command' class='k-filtercell' data-role='filtercell'><span class='k-operator-hidden'><div class='align-center'><a href='' ng-disabled='isableFiltersButton()' id='k-action-reset-filter' class='btn btn-default k-action-filter fa fa-close ' data-role='button' role='button' aria-disabled='false' tabindex='0' ></a><a href='' ng-disabled='disableFiltersButton()' id='k-action-submit-filter' class='btn btn-default k-action-filter fa fa-check ' data-role='button' role='button' aria-disabled='false' tabindex='0' ></a></div><button type='button' class='k-button k-button-icon' title='Clear' data-bind='visible:operatorVisible' style='display: none;'><span class='k-icon k-i-close'></span></button></span></span>");
            //angular.element( document.querySelector( '.k-filter-row' ));
            //var elm = angular.element("<span data-field='command' class='k-filtercell' data-role='filtercell'><span class='k-operator-hidden'><div class='align-center'><a href='' ng-disabled='isableFiltersButton()' id='k-action-reset-filter' class='btn btn-default k-action-filter fa fa-close ' data-role='button' role='button' aria-disabled='false' tabindex='0' ></a><a href='' ng-disabled='disableFiltersButton()' id='k-action-submit-filter' class='btn btn-default k-action-filter fa fa-check ' data-role='button' role='button' aria-disabled='false' tabindex='0' ></a></div><button type='button' class='k-button k-button-icon' title='Clear' data-bind='visible:operatorVisible' style='display: none;'><span class='k-icon k-i-close'></span></button></span></span>");

            // $("#"+scope.id).find('.k-filter-row').children()[length-1];
            //  var length = angular.element( document.querySelector( '.k-filter-row' )).children().length;
            var length = $("#" + scope.id).find('.k-filter-row').children().length;
            var removeOkBtn = document.createElement("remove-ok-btn");

            var temp = $("#" + scope.id).find('.k-filter-row').children()[length - 1];
            temp.childNodes[0].remove();
            removeOkBtn.setAttribute('submit', scope.submit);
            removeOkBtn.setAttribute('clearfilter', scope.clearfilters);
            $("#" + scope.id).find('.k-filter-row').children()[length - 1].appendChild(removeOkBtn);

            var getRow = $("#" + scope.id).find('.k-filter-row').children();

            angular.forEach(getRow, function (item) {
                $("#" + scope.id).find('.k-dropdown-operator').remove();
                $("#" + scope.id).find('.k-button').remove();
                // angular.element( item.querySelector( '.k-autocomplete' )).remove();

                //                        var autocomplete = angular.element(item.querySelector( '.k-autocomplete' )).kendoAutoComplete({
                //                                              suggest: false,
                ////                                               filtering: function(e) {
                ////                                                                                var filter = e.filter;
                ////
                //////                                                                                if (!filter.value) {
                //////                                                                                  //prevent filtering if the filter does not value
                //////                                                                                  e.preventDefault();
                //////                                                                                }
                ////                                                                            }
                //
                //                       }).data("kendoAutoComplete");
                //
                //
                //                      if(autocomplete!==undefined){
                //
                //
                //
                //                          autocomplete.options.suggest = false;
                //                         // autocomplete.options.filtering();
                //                                  autocomplete.bind("open", function(e) {
                //                                      e.preventDefault();
                //                                  });
                //                      }

            });

            var tmp = $("#" + scope.id).find('.k-filter-row').children();
            if (tmp.hasClass('k-hierarchy-cell')) {
                $("#" + scope.id).find('.k-filter-row').children()[0].childNodes[0].nodeValue = '';
                var collapseOnOff = document.createElement("collapse-on-off");
                collapseOnOff.setAttribute('id', scope.id);
                $("#" + scope.id).find('.k-filter-row').children()[0].appendChild(collapseOnOff);
            }
            $("#" + scope.id).find( '.k-filter-row').hide();
            $compile(elt.contents())(scope);
        }

    };
});

angular.module('rmsv2.commonComponents').directive('arrangeKendoPagerClientRoomDiff', function ($compile, $interval,
    $timeout,
    spinnerService) {
    var disabledClass = 'k-state-disabled';
    var changedClass = 'changed-disabled-class';

    return {
        restrict: 'A',
        scope: {
            id: "@",
            submit: '&',
            hideFilters: '<',
            clearfilters: '&',
            isPaginationDisabled: '<',
            settingsButtonOptions: '&',
            kendoGrid: '&',
            expandBtnOnHeader: '<',
            fullRowClick: '<'
        },
        controller: function ($scope) {
            $scope.ctrlSubmitFilter = function ($scope) {
                $scope.submit();
            };
            $scope.ctrlClearfilter = function ($scope) {
                $scope.clearfilter();
            };

            $scope.$watch('isPaginationDisabled', function (isDisabled) {
                // kendo... this is getting ridiculous
                $timeout(function () {
                    togglePagination(isDisabled);
                }, 100);
            });
        },
        link: function (scope, elt, attrs) {
            var waitUntilRendered;
            // This function will get the Grid and change it's pageCount
            scope.rowClick = function (count) {
                var grid = scope.kendoGrid();
                if (count === 'All') {
                    count = 1000000;
                }
                grid.dataSource.pageSize(count);

                if (scope.settingsButtonOptions().onRowNumberChange) {
                    scope.settingsButtonOptions().onRowNumberChange(count);
                }

                spinnerService.stop('refresh-grid');
            };

            // This function handles hiding and showing columns from the Settings button.
            scope.columnClick = function (columnList) {
                var grid = scope.kendoGrid();

                angular.forEach(columnList, function (colShow, colName) {
                    if (colShow) {
                        grid.showColumn(colName);
                    } else {
                        grid.hideColumn(colName);
                    }
                });

                if (scope.settingsButtonOptions().onColumnListChange) {
                    scope.settingsButtonOptions().onColumnListChange(columnList);
                }
            };

            //This function expands the detail row in hierarchical grid when any part of the row is clicked
            function onParentRowClick() {
                var grid = scope.kendoGrid();
                grid.element.on('click', 'tr.k-master-row', function (e) {
                    var expandCollapseLink = $(this).find("td.k-hierarchy-cell .k-icon");
                    expandCollapseLink.click();
                });
            }

            if (scope.fullRowClick) {
                onParentRowClick();
            }

            // this directive was having issues with running before the filter row was rendered properly.
            // I've added the interval to check every 100ms to see if the filter row has been rendered,
            // and when it does, then it will modify the grid in order to fix the pagination element.
            var stopWaiting = function () {
                $interval.cancel(waitUntilRendered);
            };

            waitUntilRendered = $interval(function () {
                var filterRow = angular.element(elt).find('.k-filter-row');
                var length = filterRow.children().length;
                if (length > 0) {
                    stopWaiting();
                    var pagerElement = angular.element(elt).find('.k-grid-pager');

                    if (scope.settingsButtonOptions()) {
                        var settingBtn = document.createElement("kendo-grid-settings-button");
                        settingBtn.setAttribute('class', 'pull-right');
                        // This adds a click handler for the rows options
                        settingBtn.setAttribute('row-click', 'rowClick');
                        // This adds a click handler for column changes.
                        settingBtn.setAttribute('column-click', 'columnClick');
                        settingBtn.setAttribute('options', 'settingsButtonOptions');
                        // keeps track of whether we should allow the user to change rows/page
                        settingBtn.setAttribute('is-pagination-disabled', 'isPaginationDisabled');
                        pagerElement.append(settingBtn);
                    }

                    var showhideDiv = document.createElement("show-hide-filter");
                    showhideDiv.setAttribute('class', 'align-right');
                    showhideDiv.setAttribute('id', scope.id);

                    showhideDiv.setAttribute('ng-click', 'showHidebtn(event)');
                    pagerElement.append(showhideDiv);

                    var removeOkBtn = document.createElement("remove-ok-btn");

                    var temp = filterRow.children()[length - 1];
                    $(temp.childNodes[0]).remove();

                    removeOkBtn.setAttribute('submit', scope.submit);
                    removeOkBtn.setAttribute('clearfilter', scope.clearfilters);
                    filterRow.children()[length - 1].appendChild(removeOkBtn);

                    var getRow = filterRow.children();

                    angular.forEach(getRow, function (item) {
                        $("#" + scope.id).find('.k-dropdown-operator').remove();
                        $("#" + scope.id).find('.k-button').remove();
                    });

                    var tmp = filterRow.children();
                    if (tmp.hasClass('k-hierarchy-cell')) {
                        filterRow.children()[0].childNodes[0].nodeValue = '';
                        var collapseOnOff = document.createElement("collapse-on-off");
                        collapseOnOff.setAttribute('id', scope.id);
                        if (scope.expandBtnOnHeader) {
                            filterRow.prev().find('th.k-hierarchy-cell').append(collapseOnOff);
                            $compile(filterRow.prev().contents())(scope);
                        } else {
                            filterRow.children()[0].appendChild(collapseOnOff);
                        }

                    }

                    console.log('hideFilters', scope.hideFilters);

                    if (scope.hideFilters !== true) {
                        filterRow.show();
                    } else {
                        filterRow.hide();
                    }


                    $compile(filterRow.contents())(scope);
                    $compile(pagerElement.contents())(scope);

                    // this makes sure the pagination will get disabled/enabled when the user filters the grid
                    var grid = scope.kendoGrid();
                    if (grid) {
                        scope.kendoGrid()._events.dataBound.push(function () {
                            $timeout(function () {
                                togglePagination(scope.isPaginationDisabled);
                            });
                        });
                    }
                }
            }, 100);

        }
    };

    function togglePagination(isDisabled) {
        if (isDisabled) {
            disablePagination();
        } else {
            enablePagination();
        }
    }

    function disablePagination() {
        disablePaginationInput();
        disableLinks();
    }

    function disablePaginationInput() {
        getPaginationInput().attr('disabled', true);
    }

    function disableLinks() {
        markLinksClassChanged();
        getPaginationLinks().toggleClass(disabledClass, true);
    }

    function markLinksClassChanged() {
        $.each(getPaginationLinks(), function (i, link) {
            link = $(link);
            if (!link.hasClass(disabledClass)) {
                link.toggleClass(changedClass, true);
            }
        });
    }

    function enablePagination() {
        enablePaginationInput();
        enableLinks();
    }

    function enablePaginationInput() {
        getPaginationInput().attr('disabled', false);
    }

    function enableLinks() {
        $.each(getPaginationLinks(), function (i, link) {
            link = $(link);
            if (link.hasClass(changedClass)) {
                link.toggleClass(disabledClass, false);
                link.toggleClass(changedClass, false);
            }
        });
    }

    function getPaginationLinks() {
        return $('.k-grid-pager .k-link');
    }

    function getPaginationInput() {
        return $('.k-grid-pager .k-pager-input .k-textbox');
    }
});

angular.module('rmsv2.commonComponents').directive('stopPropagationClick', function () {
    return {
        restrict: 'E',
        replace: true,
        //template:"<span class='fa fa-ellipsis-h' aria-hidden='true'>",
        link: function (scope, elt, attrs) {
            elt.bind("change", function () {
                if (window.event) {
                    window.event.stopPropagation();
                }
            });
        }
    };
});
