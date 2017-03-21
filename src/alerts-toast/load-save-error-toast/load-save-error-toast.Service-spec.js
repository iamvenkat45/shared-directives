describe('Service: Load Save Error Toast', function () {
    var service;

    beforeEach(module('rmsv2.commonComponents'));

    beforeEach(inject(function (_LoadSaveErrorToastService_) {
        service = _LoadSaveErrorToastService_;
    }));

    describe('#return42()', function () {
        it('returns 42 asynchronously', function (done) {
            service.return42()
                .then(test42)
                .then(done);

            function test42(data) {
                expect(data).toEqual(42);
            }
        });
    });
});
