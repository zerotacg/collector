import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";
import Input from "react-bootstrap/lib/Input";

import Form from "collector/component/form/Form";

describe( "component", function () {
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

        it( "should contain a submit button", function () {
            expect( TestUtils.isCompositeComponent( component.refs.saveButton ) ).to.be.true;
        });

        it( "should add inputs for all fields", function () {
            var fields = [
                    { key: "text", type: "text" }
                  , { key: "password", type: "password" }
                ]
              , element = React.createElement( Form,  { fields } )
              , component = TestUtils.renderIntoDocument( element )
              ;

            var inputs = TestUtils.scryRenderedDOMComponentsWithTag( component, "input" );
            expect( inputs ).to.have.length.of.at.least( fields.length );
            expect( inputs[0].props.type ).to.equal( fields[0].type );
            expect( inputs[1].props.type ).to.equal( fields[1].type );
        });
    });
});
});
});
