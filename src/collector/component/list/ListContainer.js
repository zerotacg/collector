import React from "react";

import List from "./List";

export default class ListContainer extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            items: []
        };
    }

    componentDidMount()
    {
        var itemStream = this.props.itemStream;
        if ( itemStream )
        {
            this.subscription = itemStream.subscribeOnNext( this.setItems, this );
        }
    }

    componentWillUnmount()
    {
        if ( this.subscription )
        {
            this.subscription.dispose();
            this.subscription = undefined;
        }
    }

    setItems( items )
    {
        this.setState({ items });
    }

    render()
    {
        return React.createElement(
            List,
            null,
            this.state.items
        );
    }
}
