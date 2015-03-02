define( function( require )
{   "use strict";

    var React   = require( "react" )
      , Col     = require( "react-bootstrap/lib/Col" )
      , Input   = require( "react-bootstrap/lib/Input" )
      ;

    return React.createClass({
        propTypes: {
            field: React.PropTypes.shape({
                key: React.PropTypes.string.isRequired
              , type: React.PropTypes.string.isRequired
              , label: React.PropTypes.string
              , placeholder: React.PropTypes.string
              , create: React.PropTypes.bool
              , multiple: React.PropTypes.bool
            })
        }

      , getDefaultProps: function()
        {
            return {
            };
        }

      , getInitialState: function()
        {
            return {
            };
        }

      , render: function()
        {
            var field = this.props.field;
            if ( field.multiple )
            {
                return this.renderMultiple( field );
            }

            return this.renderSingle( field );
        }

      , renderSingle: function( field )
        {
            return React.createElement(
                Input
              , React.__spread( {}, field, this.props )
              , null
            );
        }

      , renderMultiple: function( field )
        {
            var children = ( this.props.value || [] ).map( this.renderInput.bind( this, field ) );
            children.push( this.renderInput( field, null, children.length ) );

            return React.createElement(
                Input
              , {
                    key: field.key
                  , label: field.label
                  , labelClassName: this.props.labelClassName
                }
              , children
            );
        }

      , renderInput: function( field, value, index )
        {
            var offset = index ? 2 : undefined;
            return React.createElement(
                Col
              , { key: index, sm: 10, smOffset: offset }
              , React.createElement(
                    "input"
                  , React.__spread( {}, field, this.props )
                )
            );
        }
    });
});
