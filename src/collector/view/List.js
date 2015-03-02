define( function( require )
{   "use strict";

    var React = require( "react" );

    return React.createClass({
        propTypes: {
            uri: React.PropTypes.shape({
                view: React.PropTypes.func.isRequired
            }).isRequired
          , view: React.PropTypes.string.isRequired
        }

      , getDefaultProps: function()
        {
            return {
                view: "recent"
            };
        }

      , getInitialState: function()
        {
            return {
                items: []
            };
        }

      , componentWillMount: function( props )
        {
            props = props || this.props;
            this.onChanges();
            this.changes = props.db.changes({
                live: true
              , view: props.view
              , since: "now"
            }).on( "change", this.onChanges );
        }

      , componentWillUnmount: function()
        {
            this.changes.cancel();
            this.changes = undefined;
        }

      , componentWillReceiveProps: function( nextProps )
        {
            //this.setState({ items: [] });
            this.componentWillUnmount();
            this.componentWillMount( nextProps );
        }

      , render: function()
        {
            var items = this.state.items.map( this.renderItem );

            return React.createElement(
                "ul"
              , { className: "media-list" }
              , items
            );
        }

      , renderItem: function( item, index )
        {
            return React.createElement(
                "li"
              , { key: index, className: "media" }
              , React.createElement(
                    "div"
                  , { className: "media-left" }
                  , this.renderAnchor( item, this.renderImage( item.Image ) )
                )
              , React.createElement(
                    "div"
                  , { className: "media-body" }
                  , this.renderAnchor( item, this.renderHeading( item.Title ) )
                )
            );
        }

      , renderAnchor: function( item, child )
        {
            return React.createElement(
                "a"
              , { href: this.props.uri.view( item ) }
              , child
            );
        }

      , renderImage: function( image )
        {
            return  React.createElement(
                "img"
              , { src: image, height: 64 }
              , null
            );
        }

      , renderHeading: function( title )
        {
            return React.createElement(
                "h4"
              , { className: "media-heading" }
              , title
            );
        }

      , onChanges: function()
        {
            var options = React.__spread({
                include_docs: true
              , reduce: false
            }, this.props.query );
            this.props.db.query( this.props.view, options ).then( this.onData );
        }

      , onData: function( result )
        {
            if( !this.isMounted() )
            {
                return;
            }

            var items = result.rows.map( function( row ) {
                return row.doc;
            });
            this.setState({ items: items });
        }
    });
});
