define( function( require )
{   "use strict";

    var React           = require( "react" )
      , ListGroup       = require( "react-bootstrap/lib/ListGroup" )
      , ListGroupItem   = require( "react-bootstrap/lib/ListGroupItem" )
      , List            = require( "./List" )
      ;

    return React.createClass({
        getDefaultProps: function()
        {
            return {
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
              , this.state.items.map( function( genre ) {
                    return React.createElement(
                        ListGroupItem
                      , { key: genre, href: "#genre/" + genre }
                      , genre
                    );
                })
            );
        }

      , onChanges: function()
        {
            this.props.db.query( "genre", { reduce: "_count", group: true } ).then( this.onGenres );
        }

      , onGenres: function( result )
        {
            var items = result.rows.map( function( row ) {
                return row.key;
            });
            this.setState({ items: items });
        }
    });
});
