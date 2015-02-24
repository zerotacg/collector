define( function( require )
{   "use strict";

    var React       = require( "react" )
      , PageHeader  = require( "react-bootstrap/lib/PageHeader" )
      , Table       = require( "react-bootstrap/lib/Table" )
      , Edit        = require( "./Edit" )
      , Remove      = require( "./Remove" )
      , Target      = require( "./Target" )
      ;

    return React.createClass({
        getInitialState: function()
        {
            return {
                target: undefined
              , targets: []
            };
        }

      , componentDidMount: function()
        {
            this.onChanges();
            this.changes = this.props.config.db.changes({ live: true, since: "now" }).on( "change", this.onChanges );
        }

      , componentWillUnmount: function()
        {
            this.changes && this.changes.cancel();
            this.changes = undefined;
        }

      , render: function()
        {
            return React.createElement(
                "div"
              , null
              , React.createElement(
                    PageHeader
                  , null
                  , React.createElement( "small", null, "Sync" )
                )
              , this.edit()
              , React.createElement(
                    Table
                  , { striped: true }
                  , this.thead()
                  , this.tbody()
                )
            );
        }

      , edit: function()
        {
            return React.createElement(
                Edit
              , Object.assign({ onChange: this.onEdit, onSubmit: this.onAdd }, this.state.target )
              , null
            );
        }

      , thead: function()
        {
            return React.createElement(
                "thead"
              , null
              , React.createElement(
                    "tr"
                  , null
                  , React.createElement( "th", null, null )
                  , React.createElement( "th", null, "Url" )
                )
            );
        }

      , tbody: function()
        {
            var targets = this.state.targets.map( function( target, index ) {
                return React.createElement(
                    "tr"
                  , { key: index }
                  , React.createElement(
                        "td"
                      , null
                      , React.createElement(
                            Remove
                          , { onClick: this.onRemove, value: index }
                          , null
                        )
                    )
                  , React.createElement( "td", null, target.url )
                );
            }.bind( this ));
            return React.createElement(
                "tbody"
              , null
              , targets
            );
        }

      , onEdit: function( target )
        {
            this.setState({ target: target });
        }

      , onAdd: function( target )
        {
            this.setState({ targets: this.state.targets.concat([target]) });
            this.props.config.addTarget( target );
        }

      , onRemove: function( index )
        {
            var targets = this.state.targets;
            this.props.config.removeTarget( targets[index] );

            targets = targets.filter( function( value, key ) {
                return key !== index;
            });
            this.setState({ targets: targets });
        }

      , onChanges: function()
        {
            this.props.config.targets().then( function( targets ) {
                this.setState({ targets: targets });
            }.bind( this ));
        }
    });
});
