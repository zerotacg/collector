import React from "react";
import { PageHeader, Table } from "react-bootstrap";

import Edit     from "./Edit";
import Remove   from "./Remove";
import Target   from "./Target";

export default class extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            target: undefined
          , targets: []
        };
    }

    componentWillMount()
    {
        this.onChanges();
        this.changes = this.props.config.db.changes({ live: true, since: "now" }).on( "paused", this.onChanges );
    }

    componentWillUnmount()
    {
        this.changes.cancel();
        this.changes = undefined;
    }

    render()
    {
        return React.createElement(
            "div"
          , null
          , React.createElement(
                PageHeader
              , null
              , React.createElement( "small", null, "Sync" )
            )
          , this.edit()
          , React.createElement(
                Table
              , { striped: true }
              , this.thead()
              , this.tbody()
            )
        );
    }

    edit()
    {
        return React.createElement(
            Edit
          , { onChange: this.onEdit, onSubmit: this.onAdd, value: this.state.target }
          , null
        );
    }

    thead()
    {
        return React.createElement(
            "thead"
          , null
          , React.createElement(
                "tr"
              , null
              , React.createElement( "th", null, null )
              , React.createElement( "th", null, "Url" )
            )
        );
    }

    tbody()
    {
        var targets = this.state.targets.map( function( target, index ) {
            return React.createElement(
                "tr"
              , { key: index }
              , React.createElement(
                    "td"
                  , null
                  , React.createElement(
                        Remove
                      , { onClick: this.onRemove, value: index }
                      , null
                    )
                )
              , React.createElement( "td", null, target.url )
            );
        }.bind( this ));
        return React.createElement(
            "tbody"
          , null
          , targets
        );
    }

    onEdit( target )
    {
        this.setState({ target: target });
    }

    onAdd( target )
    {
        this.setState({ targets: this.state.targets.concat([target]) });
        this.props.config.addTarget( target );
    }

    onRemove( index )
    {
        var targets = this.state.targets;
        this.props.config.removeTarget( targets[index] );

        targets = targets.filter( function( value, key ) {
            return key !== index;
        });
        this.setState({ targets: targets });
    }

    onChanges()
    {
        this.props.config.targets().then( function( targets ) {
            this.setState({ targets: targets });
        }.bind( this ));
    }
}
