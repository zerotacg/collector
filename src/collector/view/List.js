define( function( require )
{   "use strict";

    var React           = require( "react" )
      , ListGroup       = require( "react-bootstrap/lib/ListGroup" )
      , ListGroupItem   = require( "react-bootstrap/lib/ListGroupItem" )
      ;

    return React.createClass({
        getDefaultProps: function()
        {
            return {
                items: []
            };
        }

      , getInitialState: function()
        {
            return {
            };
        }

      , render: function()
        {
            var items = this.props.items.map( function( item, index ) {
                return React.createElement(
                    ListGroupItem
                  , { key: index }
                  , item.title
                );
            });

            return React.createElement(
                ListGroup
              , null
              , items
            );
        }
    });
});
