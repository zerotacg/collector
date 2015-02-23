define(function (require)
{   "use strict";

    var React       = require( "react" )
      , PouchDB     = require( "pouchdb" )
      , Router      = require( "director" )
      , Database    = require( "./Database" )
      , MainView    = require( "./view/Main" )
      ;

    function Application()
    {
        this.db = Database;
        this.router = new Router({
            "home": this.onHome.bind( this )
          , "config": this.onConfig.bind( this )
        });
    }

    Application.prototype.init = function()
    {
        this._main_view = React.render(
            React.createElement( MainView, null, null )
          , document.body
        );
        this.router.init();
        this.db.targetDB()
            .then( function( db ) {
                return db.allDocs({ include_docs: true });
            })
            .then( function( result ) {
                return result.rows.map( function( row ) {
                    return row.doc;
                });
            })
            .then( function( targets ) {
                return targets.reduce( function( prev, target ) {
                    return prev.then( function( targets ) {
                        var db = new PouchDB( target.url );
                        return db.info()
                            .then( function( info ) {
                                target.info = info;
                                return target;
                            })
                            .catch( function( error ) {
                                target.error = error;
                                return target;
                            })
                            .then( function( target ) {
                                targets.push( target );
                                return targets;
                            })
                        ;
                    });
                }, Promise.resolve([]) );
            })
            .then( function( targets ) {
                return {
                    sync: {
                        targets: targets
                    }
                };
            })
            .then( this.setConfig.bind( this ) )
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
