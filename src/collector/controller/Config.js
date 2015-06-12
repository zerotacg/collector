import PouchDB from "pouchdb";

export default class Config
{
    constructor()
    {
        this.db = new PouchDB( "collector-config" );
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
