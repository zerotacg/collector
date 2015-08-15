import PouchDB from "pouchdb";

import recent from "_design/recent/document";

export default class extends PouchDB {

    constructor() {
        super();
        this.install();
    }

    install() {
        this.bulkDocs([
            recent
        ]);
    }
}
