import React from "react";

import DatabaseMixin from "../list/DatabaseMixin";

export default React.createClass({
    mixins: [ DatabaseMixin ]

  , propTypes: {
        uri: React.PropTypes.shape({
            view: React.PropTypes.func.isRequired
        }).isRequired
      , view: React.PropTypes.string.isRequired
      , viewKey: React.PropTypes.string
      , limit: React.PropTypes.number
    }

  , queryOptions: function( props )
    {
        return {
            include_docs: true
          , reduce: false
          , descending: true
          , limit: props.limit
          , key: props.viewKey
        };
    }

  , getDefaultProps: function()
    {
        return {
            view: "recent"
          , limit: 25
        };
    }

  , getInitialState: function()
    {
        return {
        };
    }

  , render: function()
    {
        var data = this.state.data;

        return React.createElement(
            "ul"
          , { className: "media-list" }
          , data && data.rows.map( this.getDoc ).map( this.renderItem )
        );
    }

    /**
     *
     * @param {Object} doc
     * @param {string} doc.image
     * @param {string} doc.name
     * @param {number} index
     * @returns {ReactElement}
     */
  , renderItem: function( doc, index )
    {
        return React.createElement(
            "li"
          , { key: index, className: "media" }
          , React.createElement(
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
