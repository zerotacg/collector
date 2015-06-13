import React from  "react";
import Badge from "react-bootstrap/lib/Badge";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";

export default class Genre extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            items: []
        };
    }

    componentWillMount()
    {
        this.onChanges();
        this.changes = this.props.db.changes({
            live: true
          , view: "genre"
          , since: "now"
        }).on( "paused", this.onChanges );
    }

    componentWillUnmount()
    {
        this.changes.cancel();
        this.changes = undefined;
    }

    render()
    {
        return React.createElement(
            ListGroup
          , null
          , this.state.items.map( this.renderRow )
        );
    }

    renderRow( row )
    {
        row.key = row.key || "None";
        row.href = this.props.uri.genre( row );

        return React.createElement(
            ListGroupItem
          , row
          , React.createElement(
                Badge
              , null
              , row.value
            )
          , row.key
        );
    }

    onChanges()
    {
        this.props.db.query( "genre", this.props.query ).then( this.onGenres );
    }

    onGenres( result )
    {
        var items = result.rows.map( function( row ) {
            return row;
        });
        this.setState({ items: items });
    }
}

Genre.defaultProps = {
    query: {
        group: true
      , group_level: 1
    }
};
