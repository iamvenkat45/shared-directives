var hintPopoverComponent = {
    bindings: {
        title: '@',
        content: '@',
        trigger: '@',
        placement: '@'
    },
    templateUrl: 'src/common_components/hint-popover/hint-popover.html',
    controller: HintPopoverController,
    controllerAs: 'hp'
};

angular.module('rmsv2.commonComponents').component('hintPopover', hintPopoverComponent);

/* @ngInject */
function HintPopoverController($element) {
    var vm = this;

    vm.$postLink = handlePostLink;

    ///////////////////////

    function handlePostLink() {
        _initializePopover();
    }

    function _initializePopover() {
        $element.find('.hint-popover').popover({
            'title': vm.title,
            'content': vm.content,
            'trigger': vm.trigger || 'focus click',
            'placement': vm.placement || 'top'
        });
    }
}
