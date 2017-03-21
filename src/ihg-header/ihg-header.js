var ihgHeaderController;

angular.module('rmsv2.commonComponents').directive('ihgHeader', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            title: '@',
            // hamList: '=',
            adminList: '=',
            userLoggedIn: '=',
            route: '=',
            userData: '='
        },
        templateUrl: 'src/common_components/ihg-header/ihg-header.html',
        controller: ihgHeaderController,
        controllerAs: 'vm',
        bindToController: true,
        link: function (scope, element, attrs, fn) {

        }
    };
});

ihgHeaderController = ['$state', '$scope', 'AuthorizationService', 'IdeasService', '$uibModal', 'spinnerService',
    'Globals', 'UserService', '$rootScope', 'HeaderMenuService', 'NavigateAwayService',
    function ($state, $scope, AuthorizationService, IdeasService, $uibModal, spinnerService, Globals, UserService,
        $rootScope, HeaderMenuService, NavigateAwayService) {
        var vm = this;

        // allows clicking off of Hamburger Menu to close it.
        vm.hamClosed = true;
        vm.hamJustClosed = false;
        vm.hamClickDown = false;
        vm.showHotelBox = false;
        //vm.hamList = [];

        // Listner to check for updates in the main menu list
        $scope.$on('updateMenu', function () {
            vm.hamList = HeaderMenuService.getMenuList();
        });

        vm.closeHam = function () {
            if (vm.hamJustClosed && vm.hamClickDown) {
                vm.hamJustClosed = false;
                vm.hamClickDown = false;
            } else {
                vm.hamJustClosed = false;
                vm.hamClickDown = false;
                if (vm.hamClosed) {
                    vm.hamClosed = false;
                    setTimeout(function () {
                        //  console.log('start');
                        var hamMenu = document.getElementById("hamDropDown");
                        hamMenu.focus();
                    }, 100);
                }
            }

        };
        vm.hamDown = function () {
            if (!vm.hamClosed) {
                vm.hamClickDown = true;
            }
        };
        vm.hamBlur = function () {
            vm.hamClosed = !vm.hamClosed;
            vm.hamJustClosed = true;
        };

        // allows clicking off of Admin Menu to close it.
        vm.adminClosed = true;
        vm.adminJustClosed = false;
        vm.adminClickDown = false;

        vm.closeAdmin = function () {
            if (vm.adminJustClosed && vm.adminClickDown) {
                vm.adminJustClosed = false;
                vm.adminClickDown = false;
            } else {
                vm.adminJustClosed = false;
                vm.adminClickDown = false;
                if (vm.adminClosed) {
                    vm.adminClosed = false;
                    setTimeout(function () {
                        var adminMenu = document.getElementById("adminDropDown");
                        adminMenu.focus();
                    }, 100);
                }
            }

        };
        vm.adminDown = function () {
            if (!vm.adminClosed) {
                vm.adminClickDown = true;
            }
        };
        vm.adminBlur = function () {
            vm.adminClosed = !vm.adminClosed;
            vm.adminJustClosed = true;
        };

        vm.menuHover = function ($event, menuItem) {
            vm.showSubmenu = false;
            if ($event.currentTarget.innerText.indexOf(vm.hamList[0].name) !== -1) {
                menuItem.active = !menuItem.active;
                vm.childMenu = menuItem;
                // vm.showSubmenu = true;
            } else if ($event.currentTarget.innerText.indexOf(vm.hamList[1].name) !== -1) {
                menuItem.active = !menuItem.active;
                vm.childMenu = menuItem;
                //vm.showSubmenu = true;
            } else if ($event.currentTarget.innerText.indexOf(vm.hamList[2].name) !== -1) {
                menuItem.active = !menuItem.active;
                vm.childMenu = menuItem;
                //vm.showSubmenu = true;
            } else if ($event.currentTarget.innerText.indexOf(vm.hamList[3].name) !== -1) {
                menuItem.active = !menuItem.active;
                vm.childMenu = menuItem;
                //vm.showSubmenu = true;
            } else {
                //vm.showSubmenu = false;
            }
        };

        // ADMIN/USER MENU ITEM FUNCTIONS

        vm.logout = function () {
            var notifyUser = false;
            Globals.logout = true;
            NavigateAwayService.notifyChangeOccured();
            if (Globals.modifiedList.length === 0) {
                AuthorizationService.logoutUser(notifyUser);
            } else {
                $rootScope.$broadcast('showUnsavedChanges', 'logout');
            }
        };

        vm.navigateHome = function () {
            $state.go('dashboard', {}, {
                reload: true
            });
        };

        // Navigate to Ideas page
        vm.ideas = function () {
            IdeasService.postIdeasLink();
        };

        // Help and Support Selection Event - open modal window
        vm.support = function () {
            //  spinnerService.start('helpSupport');
            $uibModal.open({
                templateUrl: 'src/common_pages/help-support/help-support.html',
                controller: 'HelpSupportCtrl',
                controllerAs: 'vm',
                backdrop: 'static',
                size: 'lg'
            }).result.then(function (result) {

            }, function (results) {

            });
        };

        vm.setPageAccess = function (viewOnly, hotelSelectorRequired) {
            var pageAccess = {
                "viewOnly": viewOnly,
                "hotelSelectorRequired": hotelSelectorRequired
            };
            HeaderMenuService.setPageAccess(pageAccess);
        };

        // Hamburger Menu Navigation function.
        // Try not to pollute too much!
        vm.hamNavigate = function (link, viewOnly, hotelSelectorRequired) {
            if (link) {
                vm.hamBlur();
                vm.setPageAccess(viewOnly, hotelSelectorRequired);
                $state.go(link);
            } else {
                vm.hamBlur();
            }
        };

        // Set the position of the sub-menu fly-out
        var leftPosition = 0;
        vm.subPosition = function (index) {
            if (index === 0) {
                leftPosition = 230;
                return {
                    'left': leftPosition + 'px'
                };
            } else {
                leftPosition += 230;
                return {
                    'left': leftPosition + 'px'
                };
            }
        };


        // // navigation for edit user page
        // vm.editUser = function () {
        //     window.location = "#/edit-user";
        // };
        //
        // vm.manageUsers = function () {
        //     window.location = "#/manage-users";
        // };


        // Set Hotel Box Details - image and description
        var setHotelBox = function () {
            vm.showHotelBox = true;
            vm.hotelLogoImage = 'images/Logos_for_Global_Header/' + vm.userData.user.currentLocation.brandImage;
            vm.hotelDescription = vm.userData.user.currentLocation.name + ' (' + vm.userData.user.currentLocation
                .mnemonic + ')';
        };

        // Hotel Identifier Selection Event - open modal window
        vm.hotelSelect = function () {
            if (UserService.isMultipleHoteluser()) {
                spinnerService.start('chooseHotelPopup');
                vm.openHotelSelector = true;
                $uibModal.open({
                    templateUrl: 'src/common_components/ihg-header/hotel-select/hotel-select.html',
                    controller: 'HotelSelectCtrl',
                    controllerAs: 'vm',
                    backdrop: true,
                    backdropClass: 'transparent-modal-backdrop'
                }).result.then(function (result) {
                    vm.openHotelSelector = false;
                    setHotelBox();
                }, function (results) {
                    vm.openHotelSelector = false;
                });
            }
        };

        $rootScope.$on('show-hotel-selection-popup', function (event, args) {
            vm.hotelSelect();
        });

        // Function to show the corporate/ hotel radio button selected
        vm.selectRadio = function (value) {
            NavigateAwayService.notifyChangeOccured();
            if (Globals.modifiedList.length !== 0) {
                $rootScope.$broadcast('showUnsavedChanges', 'hotel');
            } else {
                if (value === "Corporate" && !vm.showCorpSelected) {
                    vm.showCorpSelected = true;
                    Globals.showCorpSelected = vm.showCorpSelected;
                    vm.showHotelSelected = false;
                    $state.go('dashboard');
                } else if (value === "Hotel") {
                    // if hotel box not selected and radio btn present
                    if (vm.showHotelBox && !vm.showHotelSelected) {
                        vm.showHotelSelected = true;
                        vm.showCorpSelected = false;
                        Globals.showCorpSelected = vm.showCorpSelected;
                        vm.setHeaderColor();
                        $state.go('dashboard');
                    } else {
                        vm.hotelSelect();
                    }
                }
            }
        };

        // Display Corporate box, if the user is corporate or hotel selection box is not open
        vm.showCorporateBox = function () {
            if (vm.openHotelSelector) {
                return false;
            } else if (angular.isDefined(vm.userData)) {
                return vm.userData.user.corporateUser;
            } else {
                return false;
            }
        };

        // Set header bar color based on corporate user or hotel brand
        vm.setHeaderColor = function () {
            if (angular.isDefined(vm.userData)) {
                if (vm.userData.user.corporateUser && vm.showCorpSelected) {
                    return {
                        'background-color': '#3b3f51'
                    };
                } else if (vm.userData.user.currentLocation != null) {
                    return {
                        'background-color': vm.userData.user.currentLocation.brandColor
                    };
                } else {
                    return {
                        'background-color': '#3b3f51'
                    };
                }
            } else {
                return {
                    'background-color': '#3b3f51'
                };
            }
        };

        //Set hotel identifier details - based on the user is corporate/existing hotel user/ first time user
        vm.setHotelDetails = function () {
            if (angular.isDefined(vm.userData)) {
                if (vm.userData.user.corporateUser) {
                    vm.showCorpSelected = true;
                    Globals.showCorpSelected = vm.showCorpSelected;
                    vm.showHotelSelected = false;
                }
                if (vm.userData.user.currentLocation != null) {
                    setHotelBox();
                } else {
                    vm.showHotelBox = false;
                    vm.selectHotelText = "Select a Hotel";
                }
            } else {
                vm.showHotelBox = false;
                vm.selectHotelText = "Select a Hotel";
            }
        };

        $scope.$watch("vm.showHotelBox", function setGlobal() {
            Globals.showHotelBox = vm.showHotelBox;
        });
    }
];
