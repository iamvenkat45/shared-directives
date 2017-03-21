describe('Component: Date to Date Fields', function () {

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
                maxDateDiffDays: 350,
                initialDates: {
                    startDate: new Date(),
                    endDate: new Date()
                }
            };
        });
        beforeEach(function () {
            ctrl = $componentController('dateToDateFields', null, bindings);
        });

        describe('#$onInit()', function () {
            it('calls the initialization methods', function () {
                ctrl._initializeDates = jasmine.createSpy('_initializeDates');

                ctrl.$onInit();

                expect(ctrl._initializeDates).toHaveBeenCalled();
            });

            it('sets the initialized attribute to true', function () {
                ctrl.$onInit();

                expect(ctrl.initialized).toEqual(true);
            });
        });

        describe('#_initializeDates()', function () {
            it('sets defaultDates to equal initialDates binding', function () {
                ctrl.initialDates = {
                    startDate: new Date(),
                    endDate: new Date()
                };

                ctrl._initializeDates();

                expect(JSON.stringify(ctrl.defaultDates)).toEqual(JSON.stringify(ctrl.initialDates));
            });

            it('sets dates to equal initialDates binding', function () {
                ctrl.initialDates = {
                    startDate: new Date(),
                    endDate: new Date()
                };

                ctrl._initializeDates();

                expect(JSON.stringify(ctrl.dates)).toEqual(JSON.stringify(ctrl.initialDates));
            });

            it('initializes startDateOptions', function () {
                expect(ctrl.startDateOptions).toBeUndefined();

                ctrl._initializeDates();

                expect(ctrl.startDateOptions).not.toBeUndefined();
            });

            it('initializes endDateOptions', function () {
                expect(ctrl.endDateOptions).toBeUndefined();

                ctrl._initializeDates();

                expect(ctrl.endDateOptions).not.toBeUndefined();
            });

            it('initializes dateStrings', function () {
                expect(ctrl.dateStrings).toBeUndefined();

                ctrl._initializeDates();

                expect(ctrl.dateStrings).not.toBeUndefined();
            });

            it('initializes defaultDateStrings', function () {
                expect(ctrl.defaultDateStrings).toBeUndefined();

                ctrl._initializeDates();

                expect(ctrl.defaultDateStrings).not.toBeUndefined();
            });
        });

        describe('#reset()', function () {
            beforeEach(function () {
                ctrl._setFormUntouched = function () {};
            });

            it('resets dates with values from defaultDates', function () {
                ctrl.dates = 'dates';
                ctrl.defaultDates = 'defaultDates';

                ctrl.reset();

                expect(ctrl.dates).toEqual(ctrl.defaultDates);
            });

            it('resets dateStrings with values from defaultDateStrings', function () {
                ctrl.dateStrings = 'dateStrings';
                ctrl.defaultDateStrings = 'defaultDateStrings';

                ctrl.reset();

                expect(ctrl.dateStrings).toEqual(ctrl.defaultDateStrings);
            });

            it('sets the form to untouched state', function () {
                ctrl._setFormUntouched = jasmine.createSpy('_setFormUntouched');

                ctrl.reset();

                expect(ctrl._setFormUntouched).toHaveBeenCalled();
            });
        });

        describe('#_setFormUntouched()', function () {
            it('calls $setUntouched on dateForm', function () {
                ctrl.dateForm = {
                    $setUntouched: jasmine.createSpy('$setUntouched')
                };

                ctrl._setFormUntouched();

                expect(ctrl.dateForm.$setUntouched).toHaveBeenCalled();
            });
        });

        describe('#_isBeforeCurrentDate()', function () {
            it('returns TRUE for dates from the past that are over the max day difference',
                function () {
                    var pastDate = new Date();
                    pastDate.setDate(pastDate.getDate() - 1);

                    expect(ctrl._isBeforeCurrentDate(pastDate)).toEqual(true);
                });

            it('returns FALSE for dates from the future', function () {
                var futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 1);

                expect(ctrl._isBeforeCurrentDate(futureDate)).toEqual(false);
            });

            it('returns FALSE for today\'s date', function () {
                expect(ctrl._isBeforeCurrentDate(new Date())).toEqual(false);
            });
        });

        describe('#_isAfterMaxDateRange()', function () {
            beforeEach(function () {
                ctrl.maxDateDiffDays = 10;
            });

            it('returns TRUE for dates from the PAST that are OVER the max day difference',
                function () {
                    var pastDate = new Date();
                    pastDate.setDate(pastDate.getDate() - (ctrl.maxDateDiffDays + 1));

                    expect(ctrl._isAfterMaxDateRange(pastDate)).toEqual(true);
                });

            it('returns TRUE for dates from the FUTURE that are OVER the max day difference',
                function () {
                    var futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + (ctrl.maxDateDiffDays + 1));

                    expect(ctrl._isAfterMaxDateRange(futureDate)).toEqual(true);
                });

            it('returns FALSE for dates from the PAST that are UNDER the max day difference',
                function () {
                    var pastDate = new Date();
                    pastDate.setDate(pastDate.getDate() - (ctrl.maxDateDiffDays - 1));

                    expect(ctrl._isAfterMaxDateRange(pastDate)).toEqual(false);
                });

            it('returns FALSE for dates from the FUTURE that are UNDER the max day difference',
                function () {
                    var futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + (ctrl.maxDateDiffDays - 1));

                    expect(ctrl._isAfterMaxDateRange(futureDate)).toEqual(false);
                });

            it('returns TRUE for dates from the PAST that are AT the max day difference',
                function () {
                    var pastDate = new Date();
                    pastDate.setDate(pastDate.getDate() - (ctrl.maxDateDiffDays));

                    expect(ctrl._isAfterMaxDateRange(pastDate)).toEqual(true);
                });

            it('returns TRUE for dates from the FUTURE that are AT the max day difference',
                function () {
                    var futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + (ctrl.maxDateDiffDays));

                    expect(ctrl._isAfterMaxDateRange(futureDate)).toEqual(true);
                });
        });
    });
});
