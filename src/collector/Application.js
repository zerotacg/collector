import DocUri       from "docuri";
import React        from "react";
import director     from "director";
import Config       from "./controller/Config";
import collector    from "./database/collector";
import MainView     from "./view/Main";
import ItemList     from "./view/item/List";

export default class Application
{
    constructor()
    {
        this.config = new Config();
        var db = this.db = collector;
        db.changes({ live: true, since: "now" }).on( "paused", this.onChange.bind( this ) );
        this.router = this.createRouter();
        var uri = this.uri = DocUri;
        uri.routes({
            ":type/:key": "id"
          , "#view/:_id": "view"
          , "#edit/:_id": "edit"
          , "#genre(/:key)": "genre"
          , "#field(/*key)": "field"
          , "#browse(/*paths)": "browse"
        });
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

    init()
    {
        this._main_view = React.render(
            React.createElement( MainView, {
                config: this.config
              , db: this.db
              , uri: this.uri
              , router: this.router
            }, null )
          , document.body
        );
        this.router.init();
        this.onChange();
    }

    getMainView()
    {
        return this._main_view;
    }

    setPath( path )
    {
        console.log( "path", path );
        this.getMainView().setState({ path: path });
    }

    onChange( change )
    {
        console.info( "change", change );
    }

    onGenre( genre )
    {
        genre = genre && decodeURIComponent( genre );
        this.getMainView().setState({ path: "genre", genre: genre });
    }

    onItemView( id )
    {
        id = id && decodeURIComponent( id );
        this.getMainView().setState({ path: "view", view: { id: id } });
    }

    onField( key )
    {
        if ( key )
        {
            key = decodeURIComponent( key).split( "/" );
        }
        this.getMainView().setState({
            path: "field"
          , field: {
                view: "values"
              , viewKey: key
              , db: this.db
              , uri: this.uri
              , keyLength: 2
              , docList: ItemList
            }
        });
    }

    onTypeNew( type )
    {
        console.log( "type/new", type );
        var doc = {
            type: type && decodeURIComponent( type )
        };
        this.getMainView().setState({ path: "type", doc: doc });
    }

    onTypeEdit( id )
    {
        var doc = {
            _id: id && decodeURIComponent( id )
        };
        console.log( "type/edit", id );
        this.getMainView().setState({ path: "type", doc: doc });
    }

    onBrowse( path )
    {
        path = path && decodeURIComponent( path );
        var paths = path && path.split( "/" ) || [];
        console.log( "browse", path, paths );
        this.getMainView().setState({ path: "browse", data: { paths: paths } });
    }

    onAdd( barcode )
    {
        barcode = barcode && decodeURIComponent( barcode );
        var doc = { _id: barcode, added: (new Date()).toJSON() };
        this.db.put( doc )
            .then( console.log.bind( console, "added" ) )
            .catch( console.log.bind( console, "added.error" ) )
            .then( function() {
                window.location.assign( this.uri.edit( doc ) );
            }.bind( this ))
        ;
    }

    onClear()
    {
        this.db.destroy();
        this.config.db.destroy();
    }
}
