define( function( require )
{   "use strict";

    var React           = require( "react" )
      , Badge           = require( "react-bootstrap/lib/Badge" )
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
            };
        }

      , render: function()
        {
            return React.createElement(
                ListGroup
              , null
              , this.state.items.map( this.renderRow )
            );
        }
    });
});
