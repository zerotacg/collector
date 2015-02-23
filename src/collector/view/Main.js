define( function( require )
{   "use strict";

    var React   = require( "react" )
      , Grid    = require( "react-bootstrap/lib/Grid" )
      , Nav     = require( "react-bootstrap/lib/Nav" )
      , Navbar  = require( "react-bootstrap/lib/Navbar" )
      , NavItem = require( "react-bootstrap/lib/NavItem" )

      , Config  = require( "./config/Config" )
      , List    = require( "./List" )
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
                path: "home"
            };
        }

      , render: function()
        {
            return React.createElement(
                Grid
              , null
              , this.renderNavigation()
              , this.renderView()
            );
        }

      , renderNavigation: function()
        {
            return React.createElement(
                Navbar
              , null
              , React.createElement(
                    Nav
                  , { activeKey: this.state.path }
                  , React.createElement(
                        NavItem
                      , { href: "#home", eventKey: "home" }
                      , "Home"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "#config", eventKey: "config" }
                      , "Config"
                    )
                )
            );
        }

      , renderView: function()
        {
            var render = this[ "render_" + this.state.path ];
            return render && render.call( this );
        }

      , render_home: function()
        {
            return React.createElement(
                List
              , { items: this.state.items }
              , null
            );
        }

      , render_config: function()
        {
            return React.createElement(
                    Config
                  , { config: this.props.config }
                  , null
                );
        }
    });
});
