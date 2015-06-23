var expect = require( "chai" ).expect
  , React = require( "react" )
  , System = require( "systemjs" )
  ;

describe( "Brand", function () {
    "use strict";

    var brand;

    beforeEach( function( done ) {
        System
            .import( "./config.js" )
            .then(function() {
                return System.import( "src/collector/component/Brand");
            })
            .then(function( Brand ) {
                brand = React.createElement( Brand );
                done();
            })
            .catch( done )
        ;
    });

    describe( "#render()", function () {
        it( "should return an anchor", function () {
            expect( "fail" ).to.not.be.ok;
        });
    });
});
