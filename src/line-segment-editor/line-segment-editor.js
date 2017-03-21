var lineSegmentEditorCtrl;

angular.module('rmsv2.commonComponents').directive('lineSegmentEditor', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            lseOptions: '&', // Number : # of slots on line... years worth of days = 365
            pointPositions: '=' // Array  : list of points shown on graph (always min of 2)
        },
        templateUrl: 'src/common_components/line-segment-editor/line-segment-editor.html',
        controller: lineSegmentEditorCtrl,
        controllerAs: 'vm',
        bindToController: true,
        link: function (scope, element, attrs, fn) {

        }
    };
});

lineSegmentEditorCtrl = ['$scope', '$timeout', function ($scope, $timeout) {
    var vm = this;
    vm.colors = ['#707372',
        '#5cb85c',
        '#3d893d',
        '#d96932',
        '#d71920',
        '#00597c',
        '#00bbe7',
        '#622567',
        '#c50084'
    ];

    vm.segments = [{
            upperLabel: 'Season 1',
            lowerLabel: '01JAN - 31JUN',
            styles: {
                width: '10%',
                height: '15px'
            }
        },
        {
            upperLabel: 'Season 2',
            lowerLabel: '01JUL - 31DEC',
            styles: {
                width: '20%',
                height: '15px'
            }
        },
        {
            upperLabel: 'Season 2',
            lowerLabel: '01JUL - 31DEC',
            styles: {
                width: '30%',
                height: '15px'
            }
        },
        {
            upperLabel: 'Season 2',
            lowerLabel: '01JUL - 31DEC',
            styles: {
                width: '10%',
                height: '15px'
            }
        },
        {
            upperLabel: 'Season 2',
            lowerLabel: '01JUL - 31DEC',
            styles: {
                width: '20%',
                height: '15px'
            }
        }
    ];

    function onResize(data) {
        console.log(data.toElement.id);

        console.log(vm.segments);
        vm.segments[3].styles.width = '20%';
        vm.segments[4].styles.width = '10%';
        $scope.$apply();
    }

    function onDrag(data) {
        //console.log(data);
    }
    var makeSegmentsResizable = function () {
        $("#sample4").colResizable({
            liveDrag: true,
            draggingClass: "",
            onResize: onResize,
            onDrag: onDrag,
            gripInnerHtml: "<div class='foodGrip'></div>"
        });
    };

    vm.tableRendered = function () {
        // This will only run after the ng-repeat has rendered its things to the DOM
        $timeout(function () {
            makeSegmentsResizable();
        }, 0);
    };

    vm.slotArray = [];
    $scope.$watch(function () {
        return vm.lseOptions();
    }, function (newValue, oldValue) {
        console.log(newValue);

        // slotCount: '@',     // Number : # of slots on line... years worth of days = 365
        // maxSegments: '@',   // Number : # of segments that can show at maximum
        // labelTemplate: '@', // String : template for label across bottom of
        // hoverTemplate: '@', // String : template for onHover label
        // mainTemplate: '@', // String : template for top label of the main header er things
        // lineColors: '@',    // Array  : a rainbow of colors
        // padding: '@',       // Number : how close a segment can be nudged against another

        for (var i = 0; i < Number(newValue.slotCount); i++) {
            vm.slotArray.push({
                text: '|',
                id: i
            });
        }
        var width = 100 / newValue.slotCount;
        width = String(width) + '%';
        vm.slotWidth = {
            'width': width
        };
    }, true);

    vm.slotEntered = function (index) {
        console.log(index);
    };

    vm.seasonClick = function (index) {
        index++;
        console.log('Season' + index);
    };


    /* vegetables */

    // #veg{
    //     background-color:#ACE1A0;
    //     border-right: 1px solid #2D6021 !important;
    // }
    // #veg:before{
    //     content:" ";
    //     display: block;
    //     width:27px;
    //     height:40px;
    // }
    //
    // /* bread */
    // #bread{
    //     background-color:#FFF798;
    //     border-right: 1px solid #827807 !important;
    // }
    // #bread:before{
    //     content:" ";
    //     display: block;
    //     width:36px;
    //     height:40px;
    //     margin-left:2px;
    // }
    //
    //
    // /* meat */
    // #meat{
    //     background-color: #FFAF6E;
    //     border-right: 1px solid #AB5D1D !important;
    // }
    // #meat:before{
    //     content:" ";
    //     display: block;
    //     width:36px;
    //     height:40px;
    //     margin-left:2px;
    // }
    //
    // /* milk */
    // #milk{
    //     background-color: #ACCEFD;
    //     border-right: 1px solid #1A4C91 !important;
    // }
    // #milk:before{
    //     content:" ";
    //     display: block;
    //     width:37px;
    //     height:40px;
    //     margin-left:2px;
    // }
    //
    // /* sweets */
    // #sweets{
    //     background-color: #E1D2F2;
    // }
    // #sweets:before{
    //     content:" ";
    //     display: block;
    //     width:30px;
    //     height:40px;
    //     margin-left:2px;
    // }



    //
    // #707372
    // #5cb85c
    // #3d893d
    // #d96932
    // #d71920
    // #00597c
    // #00bbe7
    // #622567
    // #c50084



}];
