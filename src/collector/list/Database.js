"use strict";

import React            from "react";
import Badge            from "react-bootstrap/lib/Badge";
import ListGroup        from "react-bootstrap/lib/ListGroup";
import ListGroupItem    from "react-bootstrap/lib/ListGroupItem";

import DatabaseMixin    from "./DatabaseMixin";

export default React.createClass({
    mixins: [ DatabaseMixin ]

  , propTypes: {
        view: React.PropTypes.string.isRequired
    }

  , getDefaultProps: function()
    {
        return {};
    }

  , getInitialState: function()
    {
        return {
            data: {
                rows: []
            }
        };
    }

  , render: function()
    {
        var props = this.props
          , rows = this.state.data && this.state.data.rows || []
          ;
        if ( this.level( props ) >= props.keyLength )
        {
            return React.createElement(
                props.docList
              , { uri: props.uri }
              , rows
            );
        }

        return React.createElement(
            ListGroup
          , null
          , rows.map( this.renderRow )
        );
    }

  , renderRow: function( row )
    {
        var props = this.props
          , key = row.key[this.level( props )]
          ;
        row.href = props.uri.field( row );

        return React.createElement(
            ListGroupItem
          , row
          , React.createElement(
                Badge
              , null
              , row.value
            )
          , key
        );
    }

  , level: function( props )
    {
        return (props.viewKey || []).length;
    }

  , endkey: function( startkey )
    {
        if ( !startkey ) {
            return;
        }

        var endkey = startkey.slice();
        endkey.push({});
        return endkey;
    }

  , queryOptions: function( props )
    {
        var key = props.viewKey
          , level = this.level( props ) + 1
          , include_docs = level > props.keyLength
          ;
        return {
            group: !include_docs
          , group_level: include_docs ? undefined : level
          , include_docs: include_docs
          , reduce: !include_docs
          , startkey: key
          , endkey: this.endkey( key )
        };
    }
});
