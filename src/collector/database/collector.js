import PouchDB from "pouchdb";

import config from "../config/config";

var db = new PouchDB( config.db );
/*
db.bulkDocs([
    require( "./added" )
  , require( "./genre" )
]);
*/

export default db;
