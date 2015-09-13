import director from "director";
import DocUri from "docuri";
import PouchDB from "pouchdb";
import Rx from "rx";

import { EVENT_CHANGE } from "./store/Value";

export default class Factory
{
    createDatabase( config )
    {
        return (
            config.get("db")
                .then( config => new PouchDB(config) )
        );
    }

    createRouter( path )
    {
        var router = new director.Router();
        router.configure({
            on: function () {
                console.log("router", arguments);
            }
        });
        router.param( "path", /(.+)/ );
        router.mount({
            "recent": () => { path.set("recent"); }
        });

        return router;
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

    createPathStream( path )
    {
        var stream = Rx.Observable.fromEvent(path, EVENT_CHANGE);

        stream = stream.replay( null, 1 );
        stream.connect();

        return stream;
    }
}
