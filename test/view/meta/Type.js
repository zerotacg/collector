import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";

import Type from "src/collector/view/meta/Type";

var expect = chai.expect;

describe( "view", function () {
    "use strict";
    describe( "meta", function () {
        describe( "Type", function () {
            beforeEach( "setup", function() {
            });

            describe( "#render()", function () {
                it( "should render a form with an id and rev field", function () {
                    var doc = {}
                      , element = React.createElement( Type, { doc })
                      , component = TestUtils.renderIntoDocument( element )
                      ;

                    // given a document and fields it should render a form with inputs according to the fields and values according to the document

                    expect( TestUtils.isElement( element ) ).to.be.ok;

                    var form = TestUtils.findRenderedDOMComponentWithTag( component, "form" );
                    expect( form ).to.be.ok;

                    var inputs = TestUtils.scryRenderedDOMComponentsWithTag( form, "input" );
                    expect( inputs ).to.have.length( 2 );

                    var input = React.findDOMNode( inputs[0] );
                    expect( input.type ).to.equal( "text" );
                    expect( input.name ).to.equal( "_id" );
                });
            });
        });
    });
});
