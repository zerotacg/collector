var global = this;

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
            var location = global.location
              , ret = location.href.replace( location.hash, "#add/{CODE}" )
              //, encoded = encodeURIComponent( ret )
              ;

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
                      , { href: "http://zxing.appspot.com/scan?ret=" + ret, eventKey: "scan1" }
                      , "Scan"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "zxing://scan/?ret=" + ret, eventKey: "scan2" }
                      , "Scan"
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
