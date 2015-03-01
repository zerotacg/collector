define( function( require )
{   "use strict";

    var React = require( "react" );

    return {
        componentWillMount: function()
        {
            var props = this.props;
            this.queryDB( props );
            this.registerChanges( props );
        }

      , componentWillUnmount: function()
        {
            this.cancelChanges();
        }

      , componentWillReceiveProps: function( nextProps )
        {
            this.queryDB( nextProps );
            this.registerChanges( nextProps );
        }

      , queryDB: function( props )
        {
            var db = this.db( props )
              , view = this.view( props )
              , options = this.queryOptions( props )
              ;
            console.log( "database_mixin.query", view, options );
            this.setState({ data: undefined });
            db.query( view, options )
                .then( this.onData )
                .catch( function( error ) {
                    console.warn( "database_mixin", error );
                })
            ;
        }

      , db: function( props )
        {
            return props.db;
        }

      , view: function( props )
        {
            return props.view;
        }

      , registerChanges: function( props )
        {
            var db = this.db( props )
              , options = this.changesOptions( props )
              ;
            this.cancelChanges();
            this.changes = db.changes( options ).on( "change", this.onChanges );
        }

      , changesOptions: function( props )
        {
            return {
                live: true
              , since: "now"
              , view: this.view( props )
            };
        }

      , cancelChanges: function()
        {
            if ( this.changes )
            {
                this.changes.cancel();
                this.changes = undefined;
            }
        }

      , onChanges: function()
        {
            this.queryDB( this.props );
        }

      , onData: function( data )
        {
            if( !this.isMounted() )
            {
                return;
            }
            console.log( "database_mixin.data", data );
            this.setState({ data: data });
        }
    };
});
