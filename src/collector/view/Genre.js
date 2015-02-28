define( function( require )
{   "use strict";

    var React           = require( "react" )
      , Badge           = require( "react-bootstrap/lib/Badge" )
      , ListGroup       = require( "react-bootstrap/lib/ListGroup" )
      , ListGroupItem   = require( "react-bootstrap/lib/ListGroupItem" )
      ;

    return React.createClass({
        getDefaultProps: function()
        {
            return {
                query: {
                    group: true
                  , group_level: 1
                }
            };
        }

      , getInitialState: function()
        {
            return {
                items: []
            };
        }

      , componentWillMount: function()
        {
            this.onChanges();
            this.changes = this.props.db.changes({
                live: true
              , view: "genre"
              , since: "now"
            }).on( "change", this.onChanges );
        }

      , componentWillUnmount: function()
        {
            this.changes.cancel();
            this.changes = undefined;
        }

      , render: function()
        {
            return React.createElement(
                ListGroup
              , null
              , this.state.items.map( this.renderRow )
            );
        }

      , renderRow: function( row )
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

      , onChanges: function()
        {
            this.props.db.query( "genre", this.props.query ).then( this.onGenres );
        }

      , onGenres: function( result )
        {
            var items = result.rows.map( function( row ) {
                return row;
            });
            this.setState({ items: items });
        }
    });
});
