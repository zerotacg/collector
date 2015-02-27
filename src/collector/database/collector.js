define( function( require )
{   "use strict";

    var PouchDB = require( "pouchdb" )
      ;

    var db = new PouchDB( "collector" );
    /*
    db.bulkDocs([
        require( "./added" )
      , require( "./genre" )
    ]);
    */
    return db;
});
