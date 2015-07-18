import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";

import Main from "collector/component/Main";
import NavBar from "collector/component/navigation/NavBar";

describe("component", function () {
    describe("Main", function () {
        var expect = chai.expect;

        describe("#render()", function () {
            beforeEach("setup", function () {
            });

            function renderComponent( props ) {
                var element = React.createElement(Main, props);
                return TestUtils.renderIntoDocument(element);
            }

            it("should not fail", function () {
                var main = renderComponent();
                expect( main ).to.be.ok;
            });
        });
    });
});
