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
        var items = this.props.children.map(this.createNavItem);

        return React.createElement(
            Nav,
            {
                activeKey: this.props.activeKey
            },
            items
        );
    }

    createNavItem( config ) {

        var { href } = config;
        return React.createElement(
            NavItem,
            React.__spread({
                eventKey: href,
                key: href
            }, config )
        );
    }
}

NavBar.propTypes = {};

NavBar.defaultProps = {
    brand: React.createElement(Brand),
    fixedTop: true,
    fluid: true
};
