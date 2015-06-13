import PouchDB from "pouchdb";

import config from "../config";

export default class Config
{
    constructor()
    {
        this.db = new PouchDB( config.db.config );
    }

    init()
    {
    }

    addTarget( target )
    {
        target.type = "config.sync.target";
        this.db.post( target );
    }

    removeTarget( target )
    {
        this.db.remove( target );
    }

    targets()
    {
        return this.db.allDocs({ include_docs: true })
            .then( function( result ) {
                return result.rows.map( function( row ) {
                    return row.doc;
                });
            })
        ;
    }
}
