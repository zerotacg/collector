import React        from "react";
import Grid         from "react-bootstrap/lib/Grid";
import Nav          from "react-bootstrap/lib/Nav";
import Navbar       from "react-bootstrap/lib/Navbar";
import NavItem      from "react-bootstrap/lib/NavItem";

import Brand        from "../Brand";
import { default as Value, EVENT_CHANGE } from "../../store/Value";

export default class NavBar extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            path: this.props.path.get()
        };

        this.onPathChange = this.setPath.bind( this );
    }

    componentWillMount()
    {
        this.props.path.on( EVENT_CHANGE, this.onPathChange );
    }

    componentWillUnmount()
    {
        this.props.path.removeListener( EVENT_CHANGE, this.onPathChange );
    }

    setPath( path )
    {
        this.setState({ path: path });
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
                  , { href: this.props.uri.recent( this.props ), eventKey: "recent" }
                  , "Recent"
                )
            )
        );
    }
}

NavBar.propTypes = {
    path: React.PropTypes.instanceOf( Value ).isRequired
  , db: React.PropTypes.string
  , uri: React.PropTypes.shape({
        recent: React.PropTypes.func
    }).isRequired
};

NavBar.defaultProps = {
    brand: React.createElement( Brand )
  , fixedTop: true
  , fluid: true
};
