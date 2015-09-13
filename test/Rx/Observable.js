import chai from "chai";
import Rx from "rx";

import { expectMessagesToEqual, expectMessageToEqual } from "test/Rx/ReactiveTest";

describe("Rx", function () {
    var expect = chai.expect;
    describe("Observable", function () {
        describe("Cold Observable", function () {
            var onNext = Rx.ReactiveTest.onNext;
            var onError = Rx.ReactiveTest.onError;

            var scheduler;

            beforeEach("setup", function () {
                scheduler = new Rx.TestScheduler();
            });

            it("should start emission time after subscription time", function () {
                var items= [
                    onNext(100, 1)
                  , onNext(200, 2)
                  , onNext(300, 3)
                ];
                var observable = scheduler.createColdObservable.apply( scheduler, items );

                var timing = {
                    created: 100
                  , subscribed: 200
                  , disposed: Infinity
                };
                var resolution = getResolutionWithTiming(() => observable, timing);

                var expected = [
                    onNext( timing.subscribed + items[0].time, items[0].value.value )
                  , onNext( timing.subscribed + items[1].time, items[1].value.value )
                  , onNext( timing.subscribed + items[2].time, items[2].value.value )
                ];
                expectMessagesToEqual(resolution.messages, expected);
            });

            it("should be able to send multiple errors", function () {
                var items= [
                    onError(1)
                  , onError(2)
                  , onError(3)
                ];
                var observable = scheduler.createColdObservable.apply( scheduler, items );

                var resolution = scheduler.startWithCreate(() => observable);

                var expected = [
                    onError(201)
                  , onError(202)
                  , onError(203)
                ];
                expectMessagesToEqual(resolution.messages, expected);
            });

            function getResolutionWithTiming( create, timing ) {
                return scheduler.startWithTiming(
                    create,
                    timing.created,
                    timing.subscribed,
                    timing.disposed
                );
            }
        });
    });
});
