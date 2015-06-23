import React        from "react";
import Grid         from "react-bootstrap/lib/Grid";
import Nav          from "react-bootstrap/lib/Nav";
import Navbar       from "react-bootstrap/lib/Navbar";
import NavItem      from "react-bootstrap/lib/NavItem";

import Brand        from "../Brand";

export default class NavBar extends React.Component
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
          , this.props
          , React.createElement(
                Nav
              , { activeKey: this.state.path, eventKey: "nav" }
              , React.createElement(
                    NavItem
                  , { href: "#recent", eventKey: "recent" }
                  , "Recent"
                )
            )
        );
    }
}

NavBar.defaultProps = {
    brand: React.createElement( Brand )
  , fixedTop: true
  , fluid: true
};
