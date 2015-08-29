import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";

import Viewport from "collector/component/Viewport";

describe("component", function () {
    describe("Viewport", function () {
        var expect = chai.expect;

        describe("#render()", function () {
            beforeEach("setup", function () {
            });

            function renderComponent( props ) {
                var element = React.createElement(Viewport, props);
                return TestUtils.renderIntoDocument(element);
            }

            it("should not fail", function () {
                var viewport = renderComponent();
                expect( viewport ).to.be.ok;
            });
        });
    });
});
