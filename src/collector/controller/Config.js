define(function (require)
{   "use strict";

    var PouchDB = require( "pouchdb" );

    function Config()
    {
        this.db = new PouchDB( "collector-config" );
    }

    Config.prototype.init = function()
    {
    };

    Config.prototype.addTarget = function( target )
    {
        target.type = "config.sync.target";
        this.db.post( target );
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
        ;
    };

    return Config;
});
