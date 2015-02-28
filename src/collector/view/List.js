define( function( require )
{   "use strict";

    var React = require( "react" );

    return React.createClass({
        getDefaultProps: function()
        {
            return {
                view: "added"
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
            console.log( "list.mount" );
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
            console.log( "list.unmount" );
            this.changes.cancel();
            this.changes = undefined;
        }

      , componentWillReceiveProps: function( nextProps )
        {
            console.log( "list.receiveProps", this.props, nextProps );
            //this.setState({ items: [] });
            //this.componentWillUnmount();
            //this.componentWillMount( nextProps );
        }

      , render: function()
        {
            console.log( "list.render", this.state.items );
            var items = this.state.items.map( function( item, index ) {
                return React.createElement(
                    "li"
                  , { key: index, className: "media" }
                  , React.createElement(
                        "div"
                      , { className: "media-left" }
                      , React.createElement(
                            "img"
                          , { src: item.image, height: 64 }
                          , null
                        )
                    )
                  , React.createElement(
                        "div"
                      , { className: "media-body" }
                      , React.createElement(
                            "h4"
                          , { className: "media-heading" }
                          , item.title
                        )
                    )
                );
            });

            return React.createElement(
                "ul"
              , { className: "media-list" }
              , items
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

            console.log( "list", this.isMounted(), result );
            var items = result.rows.map( function( row ) {
                return row.doc;
            });
            this.setState({ items: items });
        }
    });
});
