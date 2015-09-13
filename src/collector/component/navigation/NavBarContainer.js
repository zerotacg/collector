import React from "react";

import NavBar from "./NavBar";
import Recent from "./item/Recent";

export default class NavBarContainer extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            path: undefined
        };
    }

    componentWillMount()
    {
        var path = this.props.path;
        if ( path )
        {
            this.subscription = path.subscribeOnNext( this.setPath, this );
        }
    }

    componentWillUnmount()
    {
        if ( this.subscription )
        {
            this.subscription.dispose();
        }
    }

    setPath( path )
    {
        this.setState({ path });
    }

    render()
    {
        console.log("nav container", this.state.path);
        return React.createElement(
            NavBar,
            {
                activeKey: this.state.path
            },
            [
                {
                    href: "#recent",
                    eventKey: "recent",
                    children: "Recent"
                }
            ]
        );
    }
}

NavBarContainer.propTypes = {
    path: React.PropTypes.shape({
        subscribeOnNext: React.PropTypes.func.isRequired
    })
};

NavBarContainer.defaultProps = {
};
