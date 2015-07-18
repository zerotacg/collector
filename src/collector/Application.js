import director from "director";
import DocUri from "docuri";
import Events from "events";
import LocalForage  from "localforage";
import React from "react";
import Rx from "rx";
import PouchDB from "pouchdb";

import Config       from "./config/Config";
import defaults     from "./config/defaults";
//import Main         from "./component/Main";
import Form         from "./component/form/Form";
import NavBar       from "./component/navigation/NavBar";
import Value        from "./store/Value";
//import collector    from "./database/collector";

import "bootstrap/css/bootstrap.css!";

export default class Application extends Events
{
    constructor( cfg )
    {
        super();
        this.config = cfg.config;
        this.factory = cfg.factory;
        this.path = new Value();
        this.db = this.factory.createDatabase( this.config.get("db") );
        this.router = this.createRouter();
        this.uri = this.createUri();
    }

    createRouter()
    {
        var router = new director.Router();
        router.configure({
            on: function(){ console.log("router", arguments ); }
        });
        router.param( "path", /(.+)/ );
        router.mount({
            "recent": this.path.set.bind( this.path, "recent" )
          //, "add/:barcode/:foo": console.log.bind( console, "add/:barcode" )
        });

        return router;
    }

    createUri()
    {
        var uri = this.uri = DocUri;
        uri.routes({
            ":type/:key": "id"
          , "#view/:_id": "view"
          , "#edit/:_id": "edit"
          , "#genre(/:key)": "genre"
          , "#field(/*key)": "field"
          , "#browse(/*paths)": "browse"
          , "#(:db/)recent": "recent"
        });

        return uri;
    }

    init()
    {
        this.router.init();
        React.render( this.createNavBar(), document.getElementById( "application" ) );
    }

    createNavBar()
    {
        return React.createElement(
            NavBar,
            { path: this.path_stream }
        );
    }
}
