import DocUri       from "docuri";
import Events       from "events";
import React        from "react";
import director     from "director";

import Config       from "./config/Config";
//import Main         from "./component/Main";
import NavBar       from "./component/nav/NavBar";
import Value        from "./store/Value";
import collector    from "./database/collector";

export default class Application extends Events
{
    constructor()
    {
        super();
        this.config = new Config();
        this.path = new Value();
        //this.db = this.createDatabase();
        this.router = this.createRouter();
        this.uri = this.createUri();
    }

    createDatabase()
    {
        var db = this.db = collector;
        db.changes({ live: true, since: "now" }).on( "paused", this.onChange.bind( this ) );

        return Promise.resolve( db );
    }

    createRouter()
    {
        var router = new director.Router();
        router.configure({
            on: console.log.bind( console, "router" )
        });
        router.param( "path", /(.+)/ );
        router.mount({
            "recent": this.path.set.bind( this.path, "recent" )
          //, "add/:barcode": this.onAdd.bind( this )
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
        var nav = React.createElement(
            NavBar
          , { path: this.path, uri: this.uri }
        );

        React.render( nav, document.getElementById( "navigation" ) );
    }
}
