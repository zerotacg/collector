define( function( require )
{   "use strict";

    var React       = require( "react" )
      , Button      = require( "react-bootstrap/lib/Button" )
      , Glyphicon   = require( "react-bootstrap/lib/Glyphicon" )
      ;

    return React.createClass({
        render: function()
        {
            return React.createElement(
                Button
              , { onClick: this.handleClick }
              , this.renderIcon()
            );
        }

      , renderIcon: function()
        {
            return React.createElement(
                Glyphicon
              , { glyph: "remove" }
              , null
            );
        }

      , handleClick: function()
        {
            this.props.onClick( this.props.value );
        }
    });
});
