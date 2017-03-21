describe('Component: User Search Panel', function () {

    beforeEach(module('rmsv2.commonComponents'));

    describe('UserSearchPanelController', function () {
        console.log('test1');
        var $componentController,
            ctrl;

        var bindings = {};

        //Mock the UserManagementService implementation for getDomains method
        var mockDomains = [{
            "domainName": "ALL",
            "domainValue": ""
        }, {
            "domainName": "AMER",
            "domainValue": "AMER"
        }];

        var userManagementService = {
            getDomains: function () {
                return mockDomains;
            }
        };

        console.log('test2');
        beforeEach(inject(function (_$componentController_) {
            console.log('test3');
            $componentController = _$componentController_;
        }));

        console.log('test4');
        beforeEach(function () {
            bindings = {
                isInitiallyOpen: true,
                onSearch: function () {}
            };
        });

        beforeEach(function () {
            console.log('test1');
            ctrl = $componentController('userSearchPanel', {
                UserManagementService: userManagementService
            }, bindings);
        });

        describe('#$onInit()', function () {
            it('should call the initialization methods', function () {
                ctrl._initializePanelStatus = jasmine.createSpy(
                    '_initializePanelStatus');
                ctrl._getDomains = jasmine.createSpy(
                    '_getDomains');
                ctrl.$onInit();
                expect(ctrl._initializePanelStatus).toHaveBeenCalled();
                expect(ctrl._getDomains).toHaveBeenCalled();
            });

            it('should set the initialized attribute to true', function () {
                ctrl.$onInit();
                expect(ctrl.initialized).toEqual(true);
            });
        });

        describe('#_initializePanelStatus()', function () {
            it('should set showPanel to TRUE if isInitiallyOpen binding is TRUE', function () {
                ctrl.isInitiallyOpen = true;
                ctrl._initializePanelStatus();
                expect(ctrl.showPanel).toEqual(true);
            });

            it('should set showPanel to FALSE if isInitiallyOpen binding is FALSE', function () {
                ctrl.isInitiallyOpen = false;
                ctrl._initializePanelStatus();
                expect(ctrl.showPanel).toEqual(false);
            });

            it('should set showPanel to TRUE if isInitiallyOpen binding is UNDEFINED', function () {
                delete ctrl.isInitiallyOpen;
                ctrl._initializePanelStatus();
                expect(ctrl.showPanel).toEqual(true);
            });
        });

        describe('#_getDomains()', function () {
            it('should set domains to mockDomains', function () {
                ctrl.domains = [];
                ctrl._getDomains();
                expect(ctrl.domains).toEqual(mockDomains);
            });
        });

        describe('#togglePanel()', function () {
            it('should toggle the showPanel flag', function () {
                var showPanel = true;
                ctrl.showPanel = showPanel;
                ctrl.togglePanel();
                expect(ctrl.showPanel).toEqual(!showPanel);
            });
        });

        describe('#handleSearch()', function () {
            it('should call the callback on parent controller', function () {
                ctrl.searchUser = {
                    qUserName: "testUserName",
                    qFirstName: "Test First Name",
                    qLastName: "Test Last Name"
                };
                ctrl.onSearch = jasmine.createSpy('onSearch');
                ctrl.handleSearch();
                expect(ctrl.onSearch).toHaveBeenCalledWith(jasmine.objectContaining({
                    searchParams: ctrl.searchUser
                }));
            });
        });

        describe('#clearFields()', function () {
            beforeEach(function () {
                ctrl.searchForm = {
                    $setUntouched: jasmine.createSpy('$setUntouched')
                };
            });

            it('should make the searchUser object empty', function () {
                ctrl.searchUser = {};
                ctrl.clearFields();
                expect(ctrl.searchUser).toEqual({});
            });

            it('should set the form to untouched state', function () {
                ctrl.clearFields();
                expect(ctrl.searchForm.$setUntouched).toHaveBeenCalled();
            });
        });
    });
});
