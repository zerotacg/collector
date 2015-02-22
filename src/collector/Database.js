define(function (require)
{   "use strict";

    var PouchDB = require( "pouchdb" )
      , Target  = require( "./database/plugin/Target" )
      ;

    PouchDB.plugin( Target );

    var db = new PouchDB( "collector" );

    return db;
});
