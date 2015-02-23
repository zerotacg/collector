define(function (require)
{   "use strict";

    var PouchDB = require( "pouchdb" );

    function Config()
    {
        this.db = new PouchDB( "collector/config" );
    }

    Config.prototype.init = function()
    {
    };

    Config.prototype.addTarget = function( target )
    {
        this.db.post( Object.assign({ path: "sync.target" }, target ) );
    };

    Config.prototype.removeTarget = function( target )
    {
        this.db.remove( target );
    };

    Config.prototype.targets = function()
    {
        return this.db.allDocs({ include_docs: true })
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
        ;
    };

    return Config;
});
