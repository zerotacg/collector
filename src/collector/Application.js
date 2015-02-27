define(function (require)
{   "use strict";

    var React       = require( "react" )
      , Router      = require( "director" )
      , Config      = require( "./controller/Config")
      , collector   = require( "./database/collector" )
      , MainView    = require( "./view/Main" )
      ;

    function Application()
    {
        this.config = new Config();
        var db = this.db = collector;
        db.changes({ live: true, since: "now" }).on( "change", this.onChange.bind( this ) );
        this.router = new Router({
            "home": this.onHome.bind( this )
          , "config": this.onConfig.bind( this )
          , "genre": this.onGenre.bind( this )
          , "genre/:genre": this.onGenre.bind( this )
        });
    }

    Application.prototype.init = function()
    {
        this._main_view = React.render(
            React.createElement( MainView, { config: this.config, db: this.db }, null )
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

    Application.prototype.onHome = function()
    {
        this.setPath( "home" );
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

    return Application;
});
