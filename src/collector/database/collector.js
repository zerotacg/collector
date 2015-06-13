import PouchDB from "pouchdb";

import config from "../config";

var db = new PouchDB( config.db.main );
/*
db.bulkDocs([
    require( "./added" )
  , require( "./genre" )
]);
*/

export default db;
