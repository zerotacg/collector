import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";
import Rx from "rx";

import { render } from "../TestUtils";

import NavBar from "collector/component/navigation/NavBar";
import Recent from "collector/component/navigation/item/Recent";

describe("component", function () {
    describe("navigation", function () {
        describe("NavBar", function () {
            var expect = chai.expect;

            describe("#render()", function () {
                var nav;

                beforeEach("setup", function () {
                    nav = render(NavBar);
                });

                it("should not fail", function () {
                    expect( nav ).to.be.ok;
                });

                it("should contain a NavBar", function () {
                    expectNavToContainType(Recent);
                });

                function expectNavToContainType( Type ) {
                    var found = TestUtils.findRenderedComponentWithType(nav, Type);
                    expect(found).to.be.ok;
                }

                it("should have a path_observable", function () {
                    expect( nav.state ).to.have.property( "path" );
                });

                it("should listen to path changes", function ( done ) {
                    var path = "recent";
                    var subject = new Rx.Subject();
                    var nav = render(NavBar, {
                        path: subject
                    });
                    subject.subscribeOnCompleted(function() {
                        expect( nav.state.path ).to.equal( path );
                        done();
                    });
                    subject.onNext( path );
                    subject.onCompleted();
                });
            });
        });
    });
});
