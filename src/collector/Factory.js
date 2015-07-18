import PouchDB from "pouchdb";

export default class Factory
{
    createDatabase( config )
    {
        return (
            Promise.resolve(config)
            .then(config => {
                return new PouchDB(config);
            })
        );
    }
}
