var userSearchPanelComponent = {
    bindings: {
        isInitiallyOpen: '<?',
        onSearch: '&'
    },
    templateUrl: 'src/common_components/user-search-panel/user-search-panel.html',
    controller: UserSearchPanelController,
    controllerAs: 'usp'
};

angular.module('rmsv2.commonComponents').component('userSearchPanel', userSearchPanelComponent);

/* @ngInject */
function UserSearchPanelController(UserManagementService) {
    var usp = this;

    usp.$onInit = initialize;
    usp.togglePanel = togglePanel;
    usp.handleSearch = handleSearch;
    usp.clearFields = clearFields;
    usp.searchUser = {};
    usp.domains = [];

    //Below functions are private to this controller but exposed only because of unit test purpose
    usp._initializePanelStatus = _initializePanelStatus;
    usp._getDomains = _getDomains;

    function initialize() {
        usp._initializePanelStatus();
        usp._getDomains();
        usp.initialized = true;
    }

    function _initializePanelStatus() {
        usp.showPanel = angular.isDefined(usp.isInitiallyOpen) ? usp.isInitiallyOpen : true;
    }

    function togglePanel() {
        usp.showPanel = !usp.showPanel;
    }

    function handleSearch() {
        usp.onSearch({
            searchParams: angular.copy(usp.searchUser)
        });
    }

    function clearFields() {
        usp.searchUser = {};
        usp.searchForm.$setUntouched();
    }

    function _getDomains() {
        usp.domains = UserManagementService.getDomains();
    }
}
