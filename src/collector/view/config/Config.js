define( function( require )
{   "use strict";

    var React       = require( "react" )
      , PageHeader  = require( "react-bootstrap/lib/PageHeader" )
      , Table       = require( "react-bootstrap/lib/Table" )
      ;

    return React.createClass({
        render: function()
        {
            return React.createElement(
                "div"
              , null
              , React.createElement(
                    PageHeader
                  , null
                  , "Config"
                )
            );
        }
    });
});
