import PouchDB from "pouchdb";

export default class Factory
{
    createDatabase( config )
    {
        return new PouchDB(config);
    }
}
