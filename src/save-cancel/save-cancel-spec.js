describe('Component: Save Cancel Bar', function () {

    beforeEach(module('rmsv2.commonComponents'));

    describe('Controller', function () {
        var $componentController,
            ctrl;

        var bindings = {};

        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;
        }));
        beforeEach(function () {
            bindings = {
                canSave: true,
                canCancel: true,
                onSave: function () {},
                onCancel: function () {}
            };
        });
        beforeEach(function () {
            ctrl = $componentController('saveCancel', null, bindings);
        });

        describe('#$onInit()', function () {
            it('calls the initialization methods', function () {
                ctrl._checkPassiveEventsSupport = jasmine.createSpy(
                    '_checkPassiveEventsSupport');

                ctrl.$onInit();

                expect(ctrl._checkPassiveEventsSupport).toHaveBeenCalled();
            });
        });

        describe('#$postLink()', function () {
            it('calls the postLink methods', function () {
                ctrl._rememberElements = jasmine.createSpy('_rememberElements');
                ctrl._addEventListeners = jasmine.createSpy('_addEventListeners');
                ctrl._toggleDock = jasmine.createSpy('_toggleDock');

                ctrl.$postLink();

                expect(ctrl._rememberElements).toHaveBeenCalled();
                expect(ctrl._addEventListeners).toHaveBeenCalled();
                expect(ctrl._toggleDock).toHaveBeenCalled();
            });
        });

        describe('#$onDestroy()', function () {
            it('calls the onDestroy methods', function () {
                ctrl._dereferenceElements = jasmine.createSpy('_dereferenceElements');
                ctrl._removeEventListeners = jasmine.createSpy('_addEventListeners');

                ctrl.$onDestroy();

                expect(ctrl._dereferenceElements).toHaveBeenCalled();
                expect(ctrl._removeEventListeners).toHaveBeenCalled();
            });
        });

        describe('#save()', function () {
            it('calls the onSave callback', function () {
                ctrl.onSave = jasmine.createSpy('onSave');

                ctrl.save();

                expect(ctrl.onSave).toHaveBeenCalled();
            });
        });

        describe('#cancel()', function () {
            it('calls the onCancel callback', function () {
                ctrl.onCancel = jasmine.createSpy('onCancel');

                ctrl.cancel();

                expect(ctrl.onCancel).toHaveBeenCalled();
            });
        });
    });
});
