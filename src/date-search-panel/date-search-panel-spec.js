describe('Component: Date Search Panel', function () {

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
                isInitiallyOpen: true,
                initialDates: {
                    startDate: new Date(),
                    endDate: new Date()
                },
                onSearch: function () {},
                onPanelToggle: function () {}
            };
        });
        beforeEach(function () {
            ctrl = $componentController('dateSearchPanel', null, bindings);
        });

        describe('#$onInit()', function () {
            it('calls the initialization methods', function () {
                ctrl._initializePanelStatus = jasmine.createSpy(
                    '_initializePanelStatus');
                ctrl._initializeDates = jasmine.createSpy('_initializeDates');

                ctrl.$onInit();

                expect(ctrl._initializePanelStatus).toHaveBeenCalled();
                expect(ctrl._initializeDates).toHaveBeenCalled();
            });

            it('sets the initialized attribute to true', function () {
                ctrl.$onInit();

                expect(ctrl.initialized).toEqual(true);
            });
        });

        describe('#_initializePanelStatus()', function () {
            it('sets showPanel to TRUE if isInitiallyOpen binding is TRUE', function () {
                ctrl.isInitiallyOpen = true;

                ctrl._initializePanelStatus();

                expect(ctrl.showPanel).toEqual(true);
            });

            it('sets showPanel to FALSE if isInitiallyOpen binding is FALSE', function () {
                ctrl.isInitiallyOpen = false;

                ctrl._initializePanelStatus();

                expect(ctrl.showPanel).toEqual(false);
            });

            it('sets showPanel to TRUE if isInitiallyOpen binding is UNDEFINED', function () {
                delete ctrl.isInitiallyOpen;

                ctrl._initializePanelStatus();

                expect(ctrl.showPanel).toEqual(true);
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

        describe('#togglePanel()', function () {
            it('toggles the showPanel flag', function () {
                var showPanel = true;
                ctrl.showPanel = showPanel;

                ctrl.togglePanel();

                expect(ctrl.showPanel).toEqual(!showPanel);
            });

            it('calls the callback', function () {
                var showPanel = true;
                ctrl.showPanel = showPanel;
                ctrl.onPanelToggle = jasmine.createSpy('onPanelToggle');

                ctrl.togglePanel();

                expect(ctrl.onPanelToggle).toHaveBeenCalledWith(jasmine.objectContaining({
                    isOpen: !showPanel
                }));
            });
        });

        describe('#handleSearch()', function () {
            beforeEach(function () {
                ctrl._setFormUntouched = function () {};
            });

            it('calls the callback', function () {
                ctrl.dates = 'placeholder dates';
                ctrl.onSearch = jasmine.createSpy('onSearch');

                ctrl.handleSearch();

                expect(ctrl.onSearch).toHaveBeenCalledWith(jasmine.objectContaining({
                    dates: ctrl.dates
                }));
            });

            it('sets the form to untouched state', function () {
                ctrl._setFormUntouched = jasmine.createSpy('_setFormUntouched');

                ctrl.handleSearch();

                expect(ctrl._setFormUntouched).toHaveBeenCalled();
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
            it('calls $setUntouched on searchForm', function () {
                ctrl.searchForm = {
                    $setUntouched: jasmine.createSpy('$setUntouched')
                };

                ctrl._setFormUntouched();

                expect(ctrl.searchForm.$setUntouched).toHaveBeenCalled();
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
