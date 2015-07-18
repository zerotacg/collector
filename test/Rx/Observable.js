import chai from "chai";
import Rx from "rx";

describe("Rx", function () {
    var expect = chai.expect;
    describe("Observalbe", function () {
        describe("#sample()", function () {
            it("should return the last item on subscription", function () {
                var onNext = Rx.ReactiveTest.onNext;
                var scheduler = new Rx.TestScheduler();
                var observable = scheduler.createColdObservable(
                    onNext(150, 1),
                    onNext(210, 2),
                    onNext(220, 3)
                );
                var resolution = scheduler.startWithCreate(
                    function() {
                        return observable;
                    }
                );
                console.info( resolution.messages );
                expect( "fail" ).not.to.be.ok;
            });
        });
    });
});
