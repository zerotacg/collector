import React        from "react";
import Grid         from "react-bootstrap/lib/Grid";
import Nav          from "react-bootstrap/lib/Nav";
import Navbar       from "react-bootstrap/lib/Navbar";
import NavItem      from "react-bootstrap/lib/NavItem";

import { default as Value, EVENT_CHANGE } from "../../store/Value";

import Brand from "../Brand";
import Recent from "./item/Recent";

export default class NavBar extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            path: undefined
        };
    }

    componentDidMount()
    {
        var path = this.props.path;
        if ( path )
        {
            this.subscription = this.props.path.subscribeOnNext( this.setPath, this );
        }
    }

    componentWillUnmount()
    {
        this.subscription && this.subscription.dispose();
    }

    setPath( path )
    {
        this.setState({ path });
    }

    render()
    {
        return React.createElement(
            Navbar,
            this.props,
            this.renderNav()
        );
    }

    renderNav() {
        return React.createElement(
            Nav,
            { activeKey: this.state.path },
            React.createElement(Recent)
        );
    }
}

NavBar.propTypes = {
    path: React.PropTypes.shape({

    })
};

NavBar.defaultProps = {
    brand: React.createElement( Brand ),
    fixedTop: true,
    fluid: true
};
