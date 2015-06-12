import React from "react";

export var Doc = React.PropTypes.shape({
    Image: React.PropTypes.string
  , Title: React.PropTypes.string
});

export var Row = React.PropTypes.shape({
    doc: Doc.isRequired
});

export default class List extends React.Component
{
    render()
    {
        var children = this.props.children.map( this.renderItem );

        return React.createElement(
            "ul"
          , { className: "media-list" }
          , children
        );
    }

    renderItem( row, index )
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

    renderAnchor( doc, child )
    {
        return React.createElement(
            "a"
          , { href: this.props.uri.view( doc ) }
          , child
        );
    }

    renderImage( image )
    {
        return  React.createElement(
            "img"
          , { src: image, height: 64 }
          , null
        );
    }

    renderHeading( title )
    {
        return React.createElement(
            "h4"
          , { className: "media-heading" }
          , title
        );
    }
}

List.propTypes = {
    children: React.PropTypes.arrayOf( Row ).isRequired
};

List.defaultProps = {
    children: []
};
