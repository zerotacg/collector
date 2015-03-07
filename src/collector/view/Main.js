var global = this;

define( function( require )
{   "use strict";

    var React   = require( "react" )
      , Grid    = require( "react-bootstrap/lib/Grid" )
      , Nav     = require( "react-bootstrap/lib/Nav" )
      , Navbar  = require( "react-bootstrap/lib/Navbar" )
      , NavItem = require( "react-bootstrap/lib/NavItem" )

      , Config      = require( "./config/Config" )
      , Genre       = require( "./Genre" )
      , Database    = require( "./../list/Database" )
      , List        = require( "./List" )
      , ItemView    = require( "./item/View" )
      , TypeView    = require( "./meta/Type" )
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
                path: "recent"
            };
        }

      , render: function()
        {
            console.log( "main.render", this.state );
            return React.createElement(
                "div"
              , null
              , this.renderNavigation()
              , React.createElement(
                    Grid
                  , { fluid: false }
                  , this.renderView()
                )
            );
        }

      , renderNavigation: function()
        {
            var location = global.location
              , ret = location.href.replace( location.hash, "" ) + "#add/{CODE}"
              , encoded = encodeURIComponent( ret )
              ;

            return React.createElement(
                Navbar
              , { brand: this.renderBrand(), fixedTop: true }
              , React.createElement(
                    Nav
                  , { activeKey: this.state.path }
                  , React.createElement(
                        NavItem
                      , { href: "#recent", eventKey: "recent" }
                      , "Recent"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "#genre", eventKey: "genre" }
                      , "Genre"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "#field", eventKey: "field" }
                      , "Field"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "http://zxing.appspot.com/scan?ret=" + encoded, eventKey: "scan1" }
                      , "Scan"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "zxing://scan/?ret=" + encoded, eventKey: "scan2" }
                      , "Scan"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "intent://scan/?ret=" + encoded + "#Intent;scheme=zxing;package=com.google.zxing.client.android;end", eventKey: "scan3" }
                      , "Scan"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "#config", eventKey: "config" }
                      , "Config"
                    )
                  , React.createElement(
                        NavItem
                      , { href: "#type", eventKey: "type" }
                      , "Type"
                    )
                )
            );
        }

      , renderBrand: function()
        {
            return React.createElement(
                "a"
              , { href: "" }
              , "Collector"
            );
        }

      , renderView: function()
        {
            var render = this[ "render_" + this.state.path ] || this.render_home;
            return render && render.call( this );
        }

      , render_home: function()
        {
            return React.createElement(
                List
              , {
                    db: this.props.db
                  , uri: this.props.uri
                  , key: "added"
                  , view: "added"
                  , query: {
                        descending: true
                      , limit: 10
                    }
                }
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

      , render_genre: function()
        {
            var genre = this.state.genre;
            if( genre )
            {
                genre = genre === "None" ? null : genre;
                return React.createElement(
                    List
                  , {
                        db: this.props.db
                      , uri: this.props.uri
                      , key: "genre"
                      , view: "genre"
                      , query: { key: genre }
                    }
                  , null
                );
            }
            return React.createElement(
                Genre
              , { db: this.props.db, uri: this.props.uri }
              , null
            );
        }

      , render_field: function()
        {
            return React.createElement(
                Database
              , this.state.field
              , null
            );
        }

      , render_view: function()
        {
            return React.createElement(
                ItemView
              , React.__spread( { db: this.props.db, uri: this.props.uri }, this.state.view )
              , null
            );
        }

      , render_type: function()
        {
            return React.createElement(
                TypeView
              , {
                    db: this.props.db
                  , uri: this.props.uri
                  , router: this.props.router
                  , doc: this.state.doc
                }
              , null
            );
        }
    });
});
