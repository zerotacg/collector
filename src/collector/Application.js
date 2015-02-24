define(function (require)
{   "use strict";

    var React       = require( "react" )
      , PouchDB     = require( "pouchdb" )
      , Router      = require( "director" )
      , Config      = require( "./controller/Config")
      , MainView    = require( "./view/Main" )
      ;

    function Application()
    {
        this.config = new Config();
        var db = this.db = new PouchDB( "collector" );
        db.changes({ live: true, since: "now" }).on( "change", function( change ) {
            console.log( "change", change );
        });
        this.router = new Router({
            "home": this.onHome.bind( this )
          , "config": this.onConfig.bind( this )
        });
    }

    Application.prototype.init = function()
    {
        this._main_view = React.render(
            React.createElement( MainView, { config: this.config }, null )
          , document.body
        );
        this.router.init();

        this.db.query( "added", { include_docs: true })
            .then( function( result ) {
                return result.rows.map( function( row ) {
                    return row.doc;
                });
            })
            .then( this.setItems.bind( this ) )
        ;
    };

    Application.prototype.getMainView = function()
    {
        return this._main_view;
    };

    Application.prototype.setPath = function( path )
    {
        this.getMainView().setState({ path: path });
    };

    Application.prototype.setConfig = function( config )
    {
        this.getMainView().setState({ config: config });
    };

    Application.prototype.setItems = function( items )
    {
        this.getMainView().setState({ items: items });
    };

    Application.prototype.onHome = function()
    {
        this.setPath( "home" );
    };

    Application.prototype.onConfig = function()
    {
        this.setPath( "config" );
    };

    return Application;
});
