define( function( require )
{   "use strict";

    var React       = require( "react" )
      , PageHeader  = require( "react-bootstrap/lib/PageHeader" )
      , Table       = require( "react-bootstrap/lib/Table" )

      , Sync        = require( "./sync/Sync" )
      ;

    return React.createClass({
        render: function()
        {
            return React.createElement(
                "div"
              , null
              , React.createElement( PageHeader, null, "Config" )
              , React.createElement( Sync, { config: this.props.config }, null )
            );
        }
    });
});
