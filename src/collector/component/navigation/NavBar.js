import React        from "react";
import Nav          from "react-bootstrap/lib/Nav";
import Navbar       from "react-bootstrap/lib/Navbar";
import NavItem      from "react-bootstrap/lib/NavItem";

import Brand from "../Brand";

export default class NavBar extends React.Component {
    render() {
        return React.createElement(Navbar, this.props, this.renderNav());
    }

    renderNav() {
        var items = this.props.items.map(this.createNavItem);

        return React.createElement(
            Nav,
            {
                activeKey: this.props.path
            },
            items
        );
    }

    createNavItem( config ) {

        var path = "recent";
        var text = "Recent";
        return React.createElement(
            NavItem,
            {
                href: "#" + path,
                eventKey: path,
                key: path,
                children: text
            }
        );
    }
}

NavBar.propTypes = {};

NavBar.defaultProps = {
    brand: React.createElement(Brand),
    fixedTop: true,
    fluid: true
};
