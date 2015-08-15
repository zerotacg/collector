export default class {

    install( app )
    {
        this.addRoutes( app );
        this.addTypes( app );
    }

    addRoutes( app )
    {
        app.path( "sync", function() {
            this.mount({});
        });
    }

    addTypes( app )
    {
        app.type( "sync", {
            items: [
                "db-source",
                "db-target",
                "db-live",
                "db-retry"
            ]
        });
    }
}
