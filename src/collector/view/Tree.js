import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import DatabaseMixin from "../list/DatabaseMixin";

export default React.createClass({
    mixins: [ DatabaseMixin ]

  , propTypes: {
        view: React.PropTypes.string.isRequired
      , paths: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
    }

  , getDefaultProps: function()
    {
        return {
            view: "tree"
        };
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

        return React.createElement(
            ListGroup
          , null
          , rows.map( this.renderRow )
        );
    }

  , renderRow: function( row, index )
    {
        var props = this.props
          , paths = props.paths
          , title = row.key[paths.length + 2]
          , href
          ;

        if( row.value )
        {
            href = props.uri.browse({ paths: paths.concat( row.value.split( "/" ) ) });
        }
        else
        {
            href = props.uri.view({ _id: row.id });
        }

        return React.createElement(
            ListGroupItem
          , { key: index, href: href }
          , title
        );
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
        var paths = props.paths
          , key = [ paths.length ].concat( paths )
          ;
        return {
            startkey: key
          , endkey: this.endkey( key )
        };
    }
});
