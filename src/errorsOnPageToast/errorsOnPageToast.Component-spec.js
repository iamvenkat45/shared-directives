describe('Component: Errors On Page Toast', function () {

    var mockSomeService = {
        get: function () {
            return this;
        },
        then: function () {
            return this;
        }
    };

    beforeEach(module('rmsv2.commonComponents', function ($provide) {
        // mock your dependencies here
        $provide.value('SomeService', mockSomeService);
    }));

    describe('Controller', function () {
        var $componentController,
            ctrl;

        var bindings = {
            onChange: function () {}
        };

        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;
        }));
        beforeEach(function () {
            ctrl = $componentController('errorsOnPageToast', null, bindings);
        });

        describe('#$onInit()', function () {
            it('calls the initialization methods', function () {
                ctrl._getGridData = jasmine.createSpy('_getGridData');

                ctrl.$onInit();

                expect(ctrl._getGridData).toHaveBeenCalled();
            });

            it('sets the vm.initialized flag to TRUE', function () {
                expect(ctrl.initialized).toEqual(false);

                ctrl.$onInit();

                expect(ctrl.initialized).toEqual(true);
            });
        });
    });
});
