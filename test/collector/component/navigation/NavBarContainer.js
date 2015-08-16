import chai from "chai";
import React from "react";
import TestUtils from "react/addons/TestUtils";
import NavItem from "react-bootstrap/lib/NavItem";
import Rx from "rx";

import { render } from "../TestUtils";

import NavBarContainer from "collector/component/navigation/NavBarContainer";

describe("component", function () {
    describe("navigation", function () {
        describe("NavBarContainer", function () {
            var expect = chai.expect;

            describe("#render()", function () {
                var nav;

                beforeEach("setup", function () {
                    nav = render(NavBarContainer);
                });

                it("should not fail", function () {
                    expect( nav ).to.be.ok;
                });

                it("should have a path_observable", function () {
                    expect( nav.state ).to.have.property( "path" );
                });

                it("should listen to path changes", function ( done ) {
                    var path = "recent";
                    var subject = new Rx.Subject();
                    var nav = render(NavBarContainer, {
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
