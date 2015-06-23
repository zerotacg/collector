import DocUri       from "docuri";
import Events       from "events";
import React        from "react";
import director     from "director";

//import Main         from "./component/Main";
import NavBar       from "component/nav/NavBar";
import Config       from "./controller/Config";
import collector    from "./database/collector";

export default class Application extends Events
{
    constructor()
    {
        super();
        this.config = new Config();
        //this.db = this.createDatabase();
        //this.router = this.createRouter();
        //this.uri = this.createUri();
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
            "recent": this.setPath.bind( this, "recent" )
          , "config": this.setPath.bind( this, "config" )
          , "genre": this.onGenre.bind( this )
          , "genre/:genre": this.onGenre.bind( this )
          , "view/:path": this.onItemView.bind( this )
          , "field": this.onField.bind( this )
          , "field/:path": this.onField.bind( this )
          //, "type": this.setPath.bind( this, "type" )
          , "new/:path": this.onTypeNew.bind( this )
          , "edit/:path": this.onTypeEdit.bind( this )
          , "browse": this.onBrowse.bind( this )
          , "browse/:path": this.onBrowse.bind( this )
          , "add/:barcode": this.onAdd.bind( this )
          , "clear": this.onClear.bind( this )
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
        });

        return uri;
    }

    init()
    {
        var nav = React.createElement(
            NavBar
          , {app: this}
        );

        React.render( nav, document.getElementById( "navigation" ) );
    }
}
