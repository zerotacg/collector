import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";
import Input from "react-bootstrap/lib/Input";

import Form from "collector/component/form/Form";

describe( "component", function () {
    "use strict";

    describe( "form", function () {
        describe( "Form", function () {
            var expect = chai.expect;
            var element, component;

            beforeEach( "setup", function() {
                element = React.createElement( Form );
                component = TestUtils.renderIntoDocument( element );
            });

            describe( "#render()", function () {
                it( "should contain a form", function () {
                    var form = TestUtils.findRenderedDOMComponentWithTag( component, "form" );
                    expect( form ).to.be.ok;
                });

                it( "should contain submit button", function () {
                    var inputs = TestUtils.scryRenderedDOMComponentsWithTag( component, "input" )
                            .filter( input => input.props.type === "submit" )
                    ;

                    expect( inputs ).to.have.length( 1 );
                });
            });
        });
    });
});
