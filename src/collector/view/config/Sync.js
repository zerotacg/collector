define( function( require )
{   "use strict";

    var React       = require( "react" )
      , PageHeader  = require( "react-bootstrap/lib/PageHeader" )
      , Table       = require( "react-bootstrap/lib/Table" )
      ;

    var Target = React.PropTypes.shape({
        url: React.PropTypes.string
    });

    return React.createClass({
        propTypes: {
            targets: React.PropTypes.arrayOf( Target )
        }

      , getDefaultProps: function()
        {
            return {
                targets: []
            };
        }

      , render: function()
        {
            return React.createElement(
                "div"
              , null
              , React.createElement(
                    PageHeader
                  , null
                  , React.createElement( "small", null, "Sync" )
                )
              , React.createElement(
                    Table
                  , null
                  , this.thead()
                  , this.tbody()
                )
            );
        }

      , thead: function()
        {
            return React.createElement(
                "thead"
              , null
              , React.createElement(
                    "tr"
                  , null
                  , React.createElement( "th", null, "Url" )
                )
            );
        }

      , tbody: function()
        {
            var targets = this.props.targets.map( function( target, index ) {
                return React.createElement(
                    "tr"
                  , { key: index }
                  , React.createElement( "td", null, target.url )
                );
            });
            return React.createElement(
                "tbody"
                , null
                , targets
            );
        }
    });
});
