define(function (require)
{   "use strict";

    var PouchDB = require( "pouchdb" );

    return {
        /**
         * @param {Object} target
         * @param {string} target.url
         * @param {string} target.name
         */
        addTarget: function ( target )
        {
            this.targetDB().then( function( db ) {
                var doc = Object.assign({ _id: target.url }, target );
                db.put( doc );
            });

            return this.sync( target.url, target );
        },

        /**
         * @returns {Promise}
         */
        targetDB: function()
        {
            return (
                Promise.resolve( this._target_db )
                    .then( function( db ) {
                        return db || this.createTargetDB();
                    }.bind( this ))
            );
        },

        createTargetDB: function()
        {
            return this.info().then( function( info ) {
                var name = info.db_name + "/target";
                return (this._target_db = new PouchDB( name ));
            }.bind( this ));
        },

        initTargets: function()
        {
            this.targetDB()
                .then( function( db ) {
                    return db.allDocs();
                })
                .then( function( result ) {
                    result.rows.forEach( function( target ) {
                        this.sync( target.url, target );
                    }, this );
                }.bind( this ));
        }
    };
});
