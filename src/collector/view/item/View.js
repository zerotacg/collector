import React from "react";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

export default class View extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            doc: {}
        };
    }

    componentWillMount( props )
    {
        console.log( "view.mount" );
        props = props || this.props;
        this.onChanges();
        this.changes = props.db.changes({
            live: true
          , doc_ids: [ props.id ]
          , since: "now"
        }).on( "paused", () => this.onChanges );
    }

    componentWillUnmount()
    {
        console.log( "view.unmount" );
        this.changes.cancel();
        this.changes = undefined;
    }

    componentWillReceiveProps( nextProps )
    {
        console.log( "view.receiveProps", this.props, nextProps );
        this.componentWillUnmount();
        this.componentWillMount( nextProps );
    }

    render()
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
                  , { className: "media-object", height: 64, src: doc.image }
                )
             )
          , React.createElement(
                "div"
              , { className: "media-body" }
              , React.createElement(
                    "h4"
                  , { className: "media-heading" }
                  , doc.name
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

    renderFields( doc )
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

    onChanges()
    {
        var props = this.props;
        props.db.get( props.id, { rev: props.rev } ).then( doc => this.onData( doc ) );
    }

    onData( doc )
    {
        console.log( "view", doc );
        this.setState({ doc: doc });
    }
}

View.propTypes = {
    id: React.PropTypes.string.isRequired
  , rev: React.PropTypes.string
  , ignore: React.PropTypes.arrayOf( React.PropTypes.string).isRequired
};

View.defaultProps = {
    ignore: [ "_id", "_rev" ]
};
