describe('HotelSelectCtrl', function () {

    beforeEach(module('rmsv2.commonComponents'));

    var scope, ctrl;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('HotelSelectCtrl', {
            $scope: scope
        });
    }));

    it('should ...', inject(function () {

        expect(1).toEqual(1);

    }));

});
