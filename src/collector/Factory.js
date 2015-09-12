import PouchDB from "pouchdb";
import DocUri from "docuri";

export default class Factory
{
    createDatabase( config )
    {
        return new PouchDB(config);
    }

    createUri()
    {
        var uri = this.uri = DocUri;
        uri.routes({
            ":type/:key": "id",
            "#view/:_id": "view",
            "#edit/:_id": "edit",
            "#genre(/:key)": "genre",
            "#field(/*key)": "field",
            "#browse(/*paths)": "browse",
            "#(:db/)recent": "recent"
        });

        return uri;
    }
}
