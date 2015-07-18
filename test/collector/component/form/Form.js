import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";
import Input from "react-bootstrap/lib/Input";

import Form from "collector/component/form/Form";

describe( "component", function () {
describe( "form", function () {
describe( "Form", function () {
    var expect = chai.expect;
    var form;


    describe( "#render()", function () {
        beforeEach( "setup", function() {
            form = createForm();
        });

        function createForm( props ) {
            var element = React.createElement( Form, props );
            return TestUtils.renderIntoDocument( element );
        }

        function expectToHaveTag( tagName ) {
            var dom = TestUtils.findRenderedDOMComponentWithTag( form, tagName );
            expect( dom ).to.be.ok;
        }

        function expectToBeComponent( component ) {
            expect( TestUtils.isCompositeComponent( component ) ).to.be.true;
        }

        it( "should contain a form", function () {
            expectToHaveTag( "form" );
        });

        it( "should contain a save button", function () {
            expectToBeComponent( form.refs.saveButton );
        });

        it( "should add inputs for all fields", function () {
            var fields = [
                    { key: "text", type: "text" }
                  , { key: "password", type: "password" }
                ];
            var form = createForm( { fields } );
            var inputs = TestUtils.scryRenderedDOMComponentsWithTag( form, "input" );
            expect( inputs ).to.have.length.of.at.least( fields.length );
            expect( inputs[0].props.type ).to.equal( fields[0].type );
            expect( inputs[1].props.type ).to.equal( fields[1].type );
        });
    });
});
});
});
