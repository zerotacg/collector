define( function( require )
{   "use strict";

    var React       = require( "react" )
      , Button      = require( "react-bootstrap/lib/Button" )
      , Glyphicon   = require( "react-bootstrap/lib/Glyphicon" )
      ;

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
            this.onChanges( props );
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
            this.componentWillUnmount();
            this.componentWillMount( nextProps );
        }

      , render: function()
        {
            var doc = this.state.doc;

            return React.createElement(
                "div"
              , { className: "media" }
              , React.createElement(
                    "div"
                  , { className: "media-left" }
                  , React.createElement(
                        "img"
                      , { className: "media-object", height: 64, src: doc.Image }
                    )
                 )
              , React.createElement(
                    "div"
                  , { className: "media-body" }
                  , React.createElement(
                        "h4"
                      , { className: "media-heading" }
                      , doc.Title
                      , React.createElement(
                            Button
                          , { href: this.props.uri.edit( doc ) }
                          , React.createElement( Glyphicon, { glyph: "edit" } )
                        )
                    )
                  , React.createElement(
                        "dl"
                      , { className: "dl-horizontal" }
                      , this.renderFields( doc )
                    )
                )
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

      , onChanges: function( props )
        {
            props = props || this.props;
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
