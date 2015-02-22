requirejs.config({
    baseUrl: "bower_components"
  , paths: {
        "react": "react/react-with-addons"
      , "bootstrap": "react-bootstrap/lib"
      , "pouchdb": "pouchdb/dist/pouchdb"

      , "jquery": "jquery/dist/jquery.min"
      , "text": "requirejs-text/text"
      , "json": "requirejs-json/json"

      , "collector": "../src/collector"
    }
});

define( function( require ) {
    "use strict";

    var Application = require( "collector/Application" )
      , app = window.app = new Application()
      ;

    app.init();

    var data = require( "json!../export.json").xml
      , fields = data.fields.field
      , items = data.items.item
    ;

    fields = fields.reduce( function( prev, next ) {
        prev[next.id] = next;
        return prev;
    }, {});

    var React = require( "react" );

    var Fields = React.createClass({
        render: function()
        {
            var data = this.props.children.map( function( datum, index ) {
                var field = fields[datum.field];
                return React.createElement(
                    "li"
                  , { key: field.id + "-" + index }
                  , { label: field.name + ": ", value: datum.value }
                );
            });

            return React.createElement( "ul", null, data );
        }
    });

    var Item = React.createClass({
        render: function()
        {
            var datum = React.createElement( Fields, null, this.props.data.datum );

            return React.createElement( "li", null, datum );
        }
    });

    var Items = React.createClass({
        render: function()
        {
            var children = this.props.children.map( function( item ) {
                return React.createElement( Item, React.__spread({},  item, { key: item.id }), null );
            });
            return React.createElement( "ol", null, children );
        }
    });
    React.render(
        React.createElement( Item, items[0], null )
      , document.getElementById( "item" )
    );
});
