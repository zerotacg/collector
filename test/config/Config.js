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
                    .then(done)
                    .catch(done)
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
            it("should return an Observable", function () {
                var stream = config.stream( "db" );
                expect( stream ).to.be.an.instanceof( Rx.Observable );
            });

            it("should stream the default value if no config is available", function () {
                var stream = config.stream( "db" );
                /*
                expect( stream ).to.be.an.instanceof( Rx.Observable );
                stream.subscribeOnNext(function( db_config ) {
                    expect( db_config ).to.equal( defaults.db );
                    done();
                });
                */
            });

        });
    });
});
