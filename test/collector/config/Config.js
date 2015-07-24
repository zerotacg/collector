import chai from "chai";
import Rx from "rx";
import Config from "src/collector/config/Config";

describe( "config", function () {
    "use strict";

    describe( "Config", function () {
        var expect = chai.expect;
        var config, defaults, storage, key;

        beforeEach( "setup", function() {
            storage = {
                value: undefined

              , getItem: function()
                {
                    return Promise.resolve( this.value );
                }
            };

            key = "db";
            defaults = {};
            defaults[key] = "db default value";

            config = new Config({
                defaults,
                storage
            });
        });

        describe( "#get( string )", function () {
            function expectConfigToEqual( expected, done ) {
                config.get(key)
                    .then(function ( value ) {
                        expect(value).to.equal(expected);
                    })
                    .then(done, done)
                ;
            }

            it( "should return the default value is undefined", function ( done ) {
                storage.value = undefined;

                expectConfigToEqual( defaults[key], done);
            });

            it( "should return the default value is null", function ( done ) {
                storage.value = null;

                expectConfigToEqual( defaults[key], done);
            });

            it( "should return the stored value if available", function ( done ) {
                storage.value = "stored value";
                expectConfigToEqual( storage.value, done);
            });
        });

        describe("#stream( string )", function () {
            var storage;
            var scheduler;

            beforeEach("setup", function() {
                scheduler= new Rx.TestScheduler();

                storage = {
                    getItem: function()
                    {
                        return scheduler.createResolvedPromise( 1, this.value );
                    }
                };

                config = new Config({
                    defaults,
                    storage,
                    scheduler
                });
            });

            it("should return an Observable", function () {
                var stream = config.stream();
                expect( stream ).to.be.an.instanceof( Rx.Observable );
            });

            it("should stream the value from storage", function () {
                storage.value = "stored value";
                expectStreamOnNextToEqual( storage.value );
            });

            function expectStreamOnNextToEqual( expected ) {
                var stream = config.stream( key );
                var actual;
                stream.subscribeOnNext(value => {
                    actual = value;
                });
                scheduler.advanceBy(1);
                expect(actual).to.equal(expected);
            }

            it("should stream the values from updates", function () {
                var stream = config.stream( key );
                var actual;

                stream.subscribeOnNext( value => { actual = value; } );

                var new_value = "value 1";
                config.set( key, new_value );
                scheduler.advanceBy( 1 );
                expect( actual ).to.equal( new_value );

                new_value = "value 2";
                config.set( key, new_value );
                scheduler.advanceBy( 1 );
                expect( actual ).to.equal( new_value );
            });

        });
    });
});
