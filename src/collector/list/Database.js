define( function( require )
{   "use strict";

    var React           = require( "react" )
      , Badge           = require( "react-bootstrap/lib/Badge" )
      , ListGroup       = require( "react-bootstrap/lib/ListGroup" )
      , ListGroupItem   = require( "react-bootstrap/lib/ListGroupItem" )
      ;

    return React.createClass({
        propTypes: {
            view: React.PropTypes.string.isRequired
          , docList: React.PropTypes.element
        }

      , getDefaultProps: function()
        {
            return {
            };
        }

      , getInitialState: function()
        {
            return {
                result: {
                    rows: []
                }
            };
        }

      , componentWillMount: function( props )
        {
            this.onChanges();
            props = props || this.props;
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
            this.componentWillUnmount();
            this.componentWillMount( nextProps );
        }

      , render: function()
        {
            return React.createElement(
                ListGroup
              , null
              , this.state.result.rows.map( this.renderRow )
            );
        }

      , renderRow: function( row )
        {
            var props = this.props;
            var key = row.key[this.level()];
            row.href = props.uri( row );

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

      , level: function()
        {
            return (this.props.viewKey || []).length;
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

      , onChanges: function()
        {
            var key = this.props.viewKey;
            var options = {
                group: true
              , group_level: this.level() + 1
              , startkey: key
              , endkey: this.endkey( key )
            };
            console.log( "database.query", options );
            this.props.db.query( this.props.view, options ).then( this.onData );
        }

      , onData: function( result )
        {
            if( !this.isMounted() )
            {
                return;
            }
            console.log( "database.data", result );
            this.setState({ result: result });
        }
    });
});
