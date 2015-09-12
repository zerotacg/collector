import director from "director";
import React from "react";
import Rx from "rx";

import Viewport         from "./component/Viewport";
import ListContainer    from "./component/list/ListContainer";
import NavBarContainer  from "./component/navigation/NavBarContainer";
import Value            from "./store/Value";
import DatabaseStore    from "./store/Database";

import "bootstrap/css/bootstrap.css!";
import "resources/css/collector.css!";

export default class Application
{
    constructor( cfg )
    {
        this.config = cfg.config;
        this.factory = cfg.factory;
        this.path = new Value();
        this.db = this.createDatabase();
        this.router = this.createRouter();
        this.uri = this.createUri();
    }

    createDatabase() {
        var db_config = this.config.get("db");
        return db_config.then( config => this.factory.createDatabase(config) );
    }

    createRouter()
    {
        var router = new director.Router();
        router.configure({
            on: function () {
                console.log("router", arguments);
            }
        });
        router.param( "path", /(.+)/ );
        router.mount({
            "recent": this.path.set.bind( this.path, "recent" )
        });

        return router;
    }

    createUri()
    {
        return this.factory.createUri();
    }

    init()
    {
        this.router.init();
        React.render( this.createViewport(), document.getElementById( "viewport" ) );
    }

    createViewport()
    {
        return React.createElement(
            Viewport,
            null,
            this.createNavBar(),
            this.createContent()
        );
    }

    createNavBar()
    {
        return React.createElement(
            NavBarContainer,
            { path: this.path_stream }
        );
    }

    createContent()
    {
        var store = this.store = this.createRecentStore( this.db );
        return React.createElement(
            ListContainer,
            {
                itemStream: store.getItems(),
                uri: this.uri
            }
        );
    }

    createRecentStore( db )
    {
        db = Rx.Observable.fromPromise(db);

        return new DatabaseStore({
            db,
            view: "added",
            queryOptions: {
                include_docs: true,
                descending: true
            }
        });
    }
}
