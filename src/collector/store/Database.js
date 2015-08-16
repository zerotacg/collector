import Rx from "rx";

export default class Database {

    constructor( config ) {
        this.view = config.view;
        this.queryOptions = config.queryOptions;
        this.db = config.db;
        this.items = this.db.flatMapLatest(this.queryDatabase, this);
    }

    queryDatabase( db ) {
        return (
            db.query(this.view, this.queryOptions)
                .then( this.getDocuments )
        );
    }

    getDocuments( result )
    {
        return result.rows.map( row => row.doc );
    }

    getItems() {
        return this.items;
    }
}
