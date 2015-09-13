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
        this.db = this.factory.createDatabase(this.config);
        this.path = new Value();
        this.router = this.factory.createRouter( this.path );
        this.path_stream = this.factory.createPathStream( this.path );
        this.uri = this.factory.createUri();
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
