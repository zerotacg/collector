define( function( require )
{   "use strict";

    var React = require( "react" );

    return React.createClass({
        propTypes: {
            id: React.PropTypes.string.isRequired
          , rev: React.PropTypes.string
          , ignore: React.PropTypes.arrayOf( React.PropTypes.string).isRequired
        }

      , getDefaultProps: function()
        {
            return {
                ignore: [ "_id", "_rev" ]
            };
        }

      , getInitialState: function()
        {
            return {
                doc: {}
            };
        }

      , componentWillMount: function( props )
        {
            console.log( "view.mount" );
            props = props || this.props;
            this.onChanges();
            this.changes = props.db.changes({
                live: true
              , doc_ids: [ props.id ]
              , since: "now"
            }).on( "change", this.onChanges );
        }

      , componentWillUnmount: function()
        {
            console.log( "view.unmount" );
            this.changes.cancel();
            this.changes = undefined;
        }

      , componentWillReceiveProps: function( nextProps )
        {
            console.log( "view.receiveProps", this.props, nextProps );
            //this.setState({ items: [] });
            //this.componentWillUnmount();
            //this.componentWillMount( nextProps );
        }

      , render: function()
        {
            return React.createElement(
                "dl"
              , { className: "dl-horizontal" }
              , this.renderFields( this.state.doc )
            );
        }

      , renderFields: function( doc )
        {
            var ignore = this.props.ignore;
            var keys = Object.keys( doc )
                .filter( function( key ) {
                    return ignore.indexOf( key ) === -1;
                })
            ;

            return keys.reduce( function( children, key ) {
                children.push( React.createElement( "dt", { key: "label-" + key }, key ) );
                children.push( React.createElement( "dd", { key: "value-" + key }, doc[key] ) );

                return children;
            }, []);
        }

      , onChanges: function()
        {
            var props = this.props;
            props.db.get( props.id, { rev: props.rev } ).then( this.onData );
        }

      , onData: function( doc )
        {
            if( !this.isMounted() )
            {
                return;
            }

            console.log( "view", this.isMounted(), doc );
            this.setState({ doc: doc });
        }
    });
});
