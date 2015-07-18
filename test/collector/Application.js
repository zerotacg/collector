import chai from "chai";
import Application from "src/collector/Application";

describe("collector", function () {
    "use strict";

    describe("Application", function () {
        var expect = chai.expect;
        var config, factory;

        beforeEach("setup", function () {
            config = {
                value: undefined,
                get: function () {
                    return Promise.resolve( this.value );
                }
            };

            factory = {
                createDatabase( config ) {
                    return Promise.resolve( config );
                }
            };
        });

        describe("#constructor(Object)", function () {
            it("should create a promise that resolves to the database", function ( done ) {
                var db_config = { name: "test-db" };

                config.value = db_config;

                var app = new Application({ config, factory });
                expect( app.db ).to.be.an.instanceof( Promise );
                app.db
                    .then( db => {
                        expect( db ).to.equal( db_config );
                    })
                    .then( done )
                    .catch( done )
                ;
            });
        });
    });
});
