angular.module('rmsv2.commonComponents').controller('HotelSelectCtrl', function ($uibModalInstance, $sce,
    hotelSelectionService,
    spinnerService, ToastService, $state) {
    var vm = this;

    vm.searchInput = '';
    vm.historyList = [];
    vm.searchType = 'Hotel Code';
    vm.showSearchResults = false;
    vm.searchLength = 0;

    // runs on init to grab the user's history of hotel selections.
    hotelSelectionService.getHotelHistory()
        .then(function (response) {
            vm.historyList = response;

            spinnerService.stop('chooseHotelPopup');
        }, function (reason) {
            console.log('Error when API was called');
        });

    // Runs on init to grab the list of all user's hotels
    hotelSelectionService.getUserHotelList()
        .then(function (response) {
            vm.allHotelList = response;
        });

    // When the user chooses a hotel, we set the current hotel for the user and close
    // the popup.
    vm.chooseHotel = function (hotel) {
        spinnerService.start('hotelSelected');

        hotelSelectionService.setCurrentHotel(hotel)
            .then(function (response) {
                if (response) {
                    $uibModalInstance.close('success');
                    spinnerService.stop('hotelSelected');
                    $state.go('dashboard', {}, {
                        reload: true
                    });
                }
            }, function () {
                ToastService.showToast('alert-danger', false,
                    'Something went wrong with your Search. Please try again.', '');
            });
    };

    // Changes search type depending on type user selects
    vm.assignSearchType = function (type) {
        if (type === 'Hotel Code') {
            vm.searchLength = 0;
        } else {
            vm.searchLength = 2;
        }
        vm.searchType = type;
        vm.searchInput = '';
    };

    // highlights the proper search-for characters
    vm.highlight = function (text, search) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'i'),
            '<span class="highlightedText">$&</span>'));
    };

    vm.search = function () {
        if (vm.searchType === 'Hotel Code') {
            if (vm.searchInput.length === 5) {
                var found = _.find(vm.allHotelList, {
                    'mnemonic': vm.searchInput
                });
                if (found) {
                    vm.chooseHotel(found);
                }
            }
        } else if (vm.searchType === 'Hotel Name') {

        } else if (vm.searchType === 'City Name') {

        }
    };

    vm.convert = function () {
        if (vm.searchType === 'Hotel Code') {
            if (vm.searchInput) {
                vm.searchInput = vm.searchInput.toUpperCase();
            }
        }
    };
});
