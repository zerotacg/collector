import React        from "react";
import Grid         from "react-bootstrap/lib/Grid";
import Nav          from "react-bootstrap/lib/Nav";
import Navbar       from "react-bootstrap/lib/Navbar";
import NavItem      from "react-bootstrap/lib/NavItem";

import Brand        from "../Brand";

export default class NavBar extends Navbar
{
    constructor( props )
    {
        super( props );

        this.state = {
            path: undefined
        };
    }

    render()
    {
        return React.createElement(
            Navbar
          , { brand: React.createElement( Brand ), fixedTop: true, fluid: true }
          , React.createElement(
                Nav
              , { activeKey: this.state.path }
              , React.createElement(
                    NavItem
                  , { href: "#recent", eventKey: "recent" }
                  , "Recent"
                )
            )
        );
    }
}
