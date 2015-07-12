import chai from "chai";
import Config from "src/collector/config/Config";

describe( "config", function () {
    "use strict";

    describe( "Config", function () {
        var expect = chai.expect;
        var storage;

        beforeEach( "setup", function() {
            storage = {
                value: undefined

              , getItem: function()
                {
                    return Promise.resolve( this.value );
                }
            };
        });

        describe( "#getDefault( string )", function () {
            it( "should return the value in the defaults for given key", function () {
                var defaults = { db: "db default value" }
                  , config = new Config({ defaults: defaults })
                  ;

                expect( config.getDefault( "db" ) ).to.equal( defaults.db );
            });
        });

        describe( "#map( string, any )", function () {
            it( "should return the the default for given key if the value is undefined", function () {
                var defaults = { db: "db default value" }
                  , config = new Config({ defaults: defaults })
                  ;

                expect( config.map( "db", undefined ) ).to.equal( defaults.db );
            });

            it( "should return the the the value if not undefined", function () {
                var defaults = { db: "db default value" }
                  , config = new Config({ defaults: defaults })
                  ;

                expect( config.map( "db", "value") ).to.equal( "value" );
            });
        });

        describe( "#get( string )", function () {
            it( "should return the default value if nothing is stored", function ( done ) {
                var defaults = { db: "db default value" }
                  , config = new Config({ defaults: defaults, storage: storage })
                  ;

                config.get( "db" )
                    .then(function( value ) {
                        expect( value ).to.equal( defaults.db );
                    })
                    .then( done )
                    .catch( done )
                ;
            });

            it( "should return the stored value if available", function ( done ) {
                var config = new Config({ storage: storage });

                storage.value = "stored value";

                config.get( "db" )
                    .then(function( value ) {
                        expect( value ).to.equal( storage.value );
                    })
                    .then( done )
                    .catch( done )
                ;
            });
        });
    });
});
