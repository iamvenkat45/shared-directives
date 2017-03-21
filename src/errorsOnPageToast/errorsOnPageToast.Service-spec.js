describe('Service: Errors On Page Toast', function () {
    var service;

    beforeEach(module('rmsv2.commonComponents'));

    beforeEach(inject(function (_ErrorsOnPageToastService_) {
        service = _ErrorsOnPageToastService_;
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
