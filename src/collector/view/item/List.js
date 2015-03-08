define( function( require )
{   "use strict";

    var React = require( "react" );

    var Doc = React.PropTypes.shape({
        Image: React.PropTypes.string
      , Title: React.PropTypes.string
    });

    var Row = React.PropTypes.shape({
        doc: Doc.isRequired
    });


    return React.createClass({
        propTypes: {
            children: React.PropTypes.arrayOf( Row ).isRequired
        }

      , getDefaultProps: function()
        {
            return {
                children: []
            };
        }

      , render: function()
        {
            var children = this.props.children.map( this.renderItem );

            return React.createElement(
                "ul"
              , { className: "media-list" }
              , children
            );
        }

      , renderItem: function( row, index )
        {
            var doc = row.doc;
            return React.createElement(
                "li"
              , { key: index, className: "media" }
              , doc.image && React.createElement(
                    "div"
                  , { className: "media-left" }
                  , this.renderAnchor( doc, this.renderImage( doc.image ) )
                )
              , React.createElement(
                    "div"
                  , { className: "media-body" }
                  , this.renderAnchor( doc, this.renderHeading( doc.name ) )
                )
            );
        }

      , renderAnchor: function( doc, child )
        {
            return React.createElement(
                "a"
              , { href: this.props.uri.view( doc ) }
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
    });
});
