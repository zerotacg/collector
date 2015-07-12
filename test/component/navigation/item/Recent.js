import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";

import { render } from "test/component/TestUtils";

import Recent from "collector/component/navigation/item/Recent";

describe("component", function () {
    describe("navigation", function () {
        describe("item", function () {
            describe("Recent", function () {
                var expect = chai.expect;

                describe("#render()", function () {
                    beforeEach("setup", function () {
                    });

                    it("should not fail", function () {
                        expect( render( Recent ) ).to.be.ok;
                    });
                });
            });
        });
    });
});
