import React from "react";
import { Grid, Nav, Navbar, NavItem } from "react-bootstrap";

import Config      from "./config/Config";
import Genre       from "./Genre";
import Database    from "../list/Database";
import List        from "./List";
import Tree        from "./Tree";
import ItemView    from "./item/View";
import TypeView    from "./meta/Type";

export default class extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            path: "recent"
        };
    }

    render()
    {
        console.log( "main.render", this.state );
        return React.createElement(
            "div"
          , null
          , this.renderNavigation()
            /*
          , React.createElement(
                Grid
              , { fluid: false }
              , this.renderView()
            )
            */
        );
    }

    renderNavigation()
    {
        var ret = location.href.replace( location.hash, "" ) + "#add/{CODE}"
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
                  , { href: "#browse", eventKey: "browse" }
                  , "Browse"
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

    renderBrand()
    {
        return React.createElement(
            "a"
          , { href: "" }
          , "Collector"
        );
    }

    renderView()
    {
        var render = this[ "render_" + this.state.path ] || this.render_home;
        return render && render.call( this );
    }

    render_home()
    {
        return React.createElement(
            List
          , {
                db: this.props.db
              , uri: this.props.uri
              , key: "added"
              , view: "added"
            }
          , null
        );
    }

    render_config()
    {
        return React.createElement(
            Config
          , { config: this.props.config }
          , null
        );
    }

    render_genre()
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
                  , viewKey: genre
                  , limit: null
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

    render_field()
    {
        return React.createElement(
            Database
          , this.state.field
          , null
        );
    }

    render_view()
    {
        return React.createElement(
            ItemView
          , React.__spread( { db: this.props.db, uri: this.props.uri }, this.state.view )
          , null
        );
    }

    render_browse()
    {
        return React.createElement(
            Tree
          , React.__spread( { db: this.props.db, uri: this.props.uri }, this.state.data )
          , null
        );
    }

    render_type()
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
}
