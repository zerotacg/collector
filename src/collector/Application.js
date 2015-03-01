define(function (require)
{   "use strict";

    var DocUri      = require( "docuri" )
      , React       = require( "react" )
      , Router      = require( "director" )
      , Config      = require( "./controller/Config")
      , collector   = require( "./database/collector" )
      , MainView    = require( "./view/Main" )
      , ItemList    = require( "./view/item/List" )
      ;

    var log_arguments = function( name ){
        return function() { console.log( name, arguments ); };
    };

    function Application()
    {
        this.config = new Config();
        var db = this.db = collector;
        db.changes({ live: true, since: "now" }).on( "change", this.onChange.bind( this ) );
        this.router = this.createRouter();
        var uri = this.uri = DocUri;
        uri.routes({
            ":Barcode": "id"
          , "#view/:_id": "view"
          , "#genre(/:key)": "genre"
          , "#field(/*key)": "field"
        });
    }

    Application.prototype.createRouter = function()
    {
        var router = new Router({
            "recent": this.onRecent.bind( this )
          , "config": this.onConfig.bind( this )
          , "genre": this.onGenre.bind( this )
          , "genre/:genre": this.onGenre.bind( this )
        });

        router.param( "_id", /(([^\/]*\/)*?[^\/]*)\/?$/ );
        router.on( "view/:_id", this.onItemView.bind( this ) );
        router.param( "key", /(([^\/]*\/)*?[^\/]*)\/?$/ );
        router.on( "field", this.onField.bind( this ) );
        router.on( "field/:key", this.onField.bind( this ) );

        return router;
    };

    Application.prototype.init = function()
    {
        this._main_view = React.render(
            React.createElement( MainView, {
                config: this.config
              , db: this.db
              , uri: this.uri
            }, null )
          , document.body
        );
        this.router.init();
        this.onChange();
    };

    Application.prototype.getMainView = function()
    {
        return this._main_view;
    };

    Application.prototype.setPath = function( path )
    {
        console.log( "path", path );
        this.getMainView().setState({ path: path });
    };

    Application.prototype.onRecent = function()
    {
        this.setPath( "recent" );
    };

    Application.prototype.onConfig = function()
    {
        this.setPath( "config" );
    };

    Application.prototype.onChange = function( change )
    {
        console.info( "change", change );
    };

    Application.prototype.onGenre = function( genre )
    {
        genre = genre && decodeURIComponent( genre );
        console.log( "genre", genre );
        this.getMainView().setState({ path: "genre", genre: genre });
    };
    Application.prototype.onItemView = function( id )
    {
        id = id && decodeURIComponent( id );
        console.log( "view", id );
        this.getMainView().setState({ path: "view", view: { id: id } });
    };

    Application.prototype.onField = function( key )
    {
        if ( key )
        {
            key = decodeURIComponent( key).split( "/" );
        }
        console.log( "field", key );
        this.getMainView().setState({
            path: "field"
          , field: {
                view: "field"
              , viewKey: key
              , db: this.db
              , uri: this.uri
              , keyLength: 2
              , docList: ItemList
            }
        });
    };

    return Application;
});
