define( function( require )
{   "use strict";

    var React           = require( "react" )
      , Alert           = require( "react-bootstrap/lib/Alert" )
      , Col             = require( "react-bootstrap/lib/Col" )
      , Input           = require( "react-bootstrap/lib/Input" )
      , PouchDB         = require( "pouchdb" )
      ;

    var fields = [
        { key: "key", label: "Key", create: true, type: "text", placeholder: "Enter text" }
      , { key: "name", label: "Name", type: "text", placeholder: "Enter text" }
      , { key: "fields", label: "Fields", multiple: true, type: "text", placeholder: "Enter text" }
    ];

    return React.createClass({
        mixins: [ React.addons.LinkedStateMixin ]

      , propTypes: {
            db: React.PropTypes.instanceOf( PouchDB ).isRequired
          , id: React.PropTypes.string
        }

      , getInitialState: function()
        {
            return { doc: {} };
        }

      , componentWillMount: function()
        {
            this.setId( this.props.id );
        }

      , componentWillReceiveProps: function( nextProps )
        {
            this.setId( nextProps.id );
        }

      , setId: function( id )
        {
            this.replaceState({ loading: !!id });
            if ( id )
            {
                this.props.db.get( "type/" + id )
                    .then( this.setDoc )
                    .catch( this.setError )
                    .then( this.setState.bind( this, { loading: false } ) )
                ;
            }
        }

      , setDoc: function( doc )
        {
            if ( !this.isMounted() )
            {
                return;
            }

            this.setState({ doc: doc });
        }

      , setError: function( error )
        {
            console.warn( error );
            this.setState({ error: error });
        }

      , clearError: function()
        {
            this.setState({ error: null });
        }

      , getValue: function( field )
        {
            return this.state.doc && this.state.doc[field.key] || field.defaultValue;
        }

      , render: function()
        {
            return React.createElement(
                "div"
              , null
              , this.renderError()
              , React.createElement(
                    "form"
                  , { className: "form-horizontal" }
                  , fields.map( this.renderField )
                )
            );
        }

      , renderError: function()
        {
            var error = this.state.error;

            return error && React.createElement(
                Alert
              , { bsStyle: "warning", onDismiss: this.clearError }
              , React.createElement( "h4", null, error.name )
              , React.createElement( "p", null, error.reason )
            );
        }

      , renderField: function( field )
        {
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
              , React.__spread( {}, field, {
                    labelClassName: "col-sm-2"
                  , wrapperClassName: "col-sm-10"
                  , valueLink: this.linkState( field.key )
                  , type: this.props.id && field.create ? "static" : field.type
                  , value: this.getValue( field )
                })
              , null
            );
        }

      , renderMultiple: function( field )
        {
            var children = ( this.getValue( field ) || [] ).map( this.renderInput.bind( this, field ) );
            children.push( this.renderInput( field, null, children.length ) );

            return React.createElement(
                Input
              , {
                    key: field.key
                  , label: field.label
                  , labelClassName: "col-sm-2"
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
                  , React.__spread({}, field, {
                        className: "form-control"
                      , value: value
                      , onChange: this.onChange.bind( this, field, index )
                    })
                )
            );
        }

      , onChange: function( field, index, event )
        {
            var value = event.target.value
              , values = ( this.getValue( field, index ) || []).slice()
              ;

            values[ index ] = value;

            if ( !value )
            {
                values.splice( index, 1 );
            }

            var state = {};
            state[ field.key ] = values;
            this.setState( state );
        }
    });
});
