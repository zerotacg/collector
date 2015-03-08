define( function( require )
{   "use strict";

    var React           = require( "react" )
      , Alert           = require( "react-bootstrap/lib/Alert" )
      , Col             = require( "react-bootstrap/lib/Col" )
      , Input           = require( "react-bootstrap/lib/Input" )
      , PouchDB         = require( "pouchdb" )
      , Router          = require( "director" )

      , Type            = require( "../../model/Type" )
      , Field           = require( "../../model/Field" )
      ;

    var TYPE = "type"
      , FIELD = "field"
      , KEY = "key"
      ;
    var IdField = { key: "_id", type: "text", label: "_id", placeholder: "Enter text" }
      , RevField = { key: "_rev", type: "static", label: "_rev" }
      , TypeField = { key: "type", type: "static", label: "Type" }
      ;

    return React.createClass({
        propTypes: {
            db: React.PropTypes.instanceOf( PouchDB ).isRequired
          , router: React.PropTypes.instanceOf( Router ).isRequired
          , doc: React.PropTypes.shape({
                type: React.PropTypes.string
              , _id: React.PropTypes.string
            })
          , dismissAfter: React.PropTypes.number
        }

      , getDefaultProps: function()
        {
            return {
                dismissAfter: 2000
              , Type: Type
            };
        }

      , getInitialState: function()
        {
            return {
                loading: false
              , doc: null
              , alert: null
              , fields: null
            };
        }

      , componentWillMount: function()
        {
            this.load( this.props.doc );
        }

      , componentWillReceiveProps: function( nextProps )
        {
            this.load( nextProps.doc );
        }

      , loading: function()
        {
            this.setState({ loading: true });
        }

      , loaded: function()
        {
            this.setState({ loading: false });
        }

      , loadedState: function( state )
        {
            if ( !this.isMounted() )
            {
                return;
            }

            this.setState( state );
        }

      , load: function( doc )
        {
            var state = { doc: doc }
              , load = Promise.resolve( state )
              ;

            this.clearAlert();

            if ( doc._id )
            {
                load = this.loadDoc( state );
            }

            load.then( this.loadFields )
                .then( this.loadedState )
                .catch( this.setError )
                .then( this.loaded )
            ;
        }

      , addValue: function( state, key, value )
        {
            state[key] = value;
            return state;
        }

      , loadDoc: function( state )
        {
            var props = this.props;

            this.loading();

            return props.db.get( state.doc._id )
                .then( this.addValue.bind( this, state, "doc" ) )
            ;
        }

      , loadFields: function( state )
        {
            var type = this.getType( state.doc );

            if ( this.getType( this.state.doc ) !== type )
            {
                var id = state.doc._id || "";
                if ( id.substr(0, TYPE.length) === TYPE )
                {
                    type = TYPE;
                }
                if ( id.substr(0, FIELD.length) === FIELD )
                {
                    type = FIELD;
                }

                var load;
                switch ( type ) {
                    case TYPE:
                        load = Promise.resolve( Type );
                        break;
                    case FIELD:
                        load = Promise.resolve( Field );
                        break;
                    default:
                        this.loading();
                        load = this.queryFields( type );
                }
                load.then( console.log.bind( console, "fields") );
                return load.then( this.addValue.bind( this, state, "fields" ) );
            }

            return state;
        }

      , queryFields: function( type )
        {
            var load = this.props.db.query( "fields", {
                key: type
              , include_docs: true
            });

            return load
                .then( this.getRows )
                .then( this.findMissingFields )
                .then( this.getDocs )
            ;
        }

      , save: function()
        {
            var props = this.props
              , doc = this.state.doc
              ;

            this.clearAlert();
            this.loading();

            props.db.put( doc )
                .then( this.updateDoc )
                .then( this.setRoute )
                .then( this.setState.bind( this, { alert: { bsStyle: "success", message: "Saved" } } ) )
                .catch( this.setError )
                .then( this.loaded )
            ;
        }

      , updateDoc: function( result )
        {
            var props = this.props;

            var id = result.id
              , rev = result.rev
              ;

            this.setValue( IdField, null, id );
            this.setValue( RevField, null, rev );

            if ( result.id !== props.doc._id )
            {
                window.location.assign( props.uri.edit({ _id: result.id }) );
            }
        }

      , getType: function( doc )
        {
            return doc && doc.type;
        }

        /**
         * @param {Object} result
         * @param {Array} result.rows
         * @returns {Array} rows
         */
      , getRows: function( result )
        {
            return result.rows;
        }

      , findMissingFields: function( rows )
        {
            var missing = rows.filter( this.isDocMissing );

            if ( missing.length )
            {
                return Promise.reject( new ReferenceError(
                    "Can't load missing fields: " + missing.map( this.getReferenceId ).join( ", " )
                ));
            }

            return rows;
        }

      , isDocMissing: function( row )
        {
            return !this.getDoc( row );
        }

      , getReferenceId: function( row )
        {
            return row.value._id;
        }

      , getDocs: function( rows )
        {
            return rows.map( this.getDoc );
        }

        /**
         * @param {Object} row
         * @param {Mixed} result.doc
         * @returns {Mixed} doc
         */
      , getDoc: function( row )
        {
            return row.doc;
        }

      , setError: function( error )
        {
            console.warn( error );
            this.setState({
                alert: {
                    bsStyle: "warning"
                  , dismissAfter: null
                  , name: error.name
                  , message: error.message
                }
            });
        }

      , clearAlert: function()
        {
            this.setState({ alert: null });
        }

      , getValue: function( field )
        {
            return this.state.doc && this.state.doc[field.key];
        }

      , getArrayValue: function( field )
        {
            var value = this.getValue( field ) || [];
            return Array.isArray( value ) ? value : [value];
        }

      , setValue: function( field, index, value )
        {
            var doc = React.__spread( {}, this.state.doc );

            if ( value === "" )
            {
                value = undefined;
            }

            if ( field.multiple )
            {
                var values = this.getArrayValue( field ).slice();

                if ( index === null || values.length < index || index < 0)
                {
                    console.warn( "type.setValue Index out of bounds", index );
                }

                values[ index ] = value;

                if ( value === undefined )
                {
                    values.splice( index, 1 );
                }

                value = values.length ? values : undefined;
                if ( values.length === 1 )
                {
                    value = values[0];
                }
            }
            doc[field.key] = value;

            if ( field.key === KEY )
            {
                doc._id = this.props.uri.id( React.__spread({}, doc, field.uri ) );
            }

            this.setState({ doc: doc });
        }

      , render: function()
        {
            console.log( "type.render", this.state );
            return React.createElement(
                "div"
              , null
              , this.renderAlert( this.state.alert )
              , React.createElement(
                    "form"
                  , { className: "form-horizontal", onSubmit: this.onSubmit }
                  , this.renderSingle( IdField )
                  , this.renderSingle( RevField )
                  , this.renderSingle( TypeField )
                  , this.renderFields( this.state.fields )
                  , React.createElement(
                        Input
                      , { type: "submit", value: "Save", wrapperClassName: "col-md-offset-2 col-sm-2" }
                      , null
                    )
                )
            );
        }

      , renderAlert: function( alert )
        {
            return alert && React.createElement(
                Alert
              , React.__spread({
                    dismissAfter: this.props.dismissAfter
                  , onDismiss: this.clearAlert
                }, alert )
              , alert.name && React.createElement( "h4", null, alert.name )
              , alert.message && React.createElement( "p", null, alert.message )
            );
        }

      , renderFields: function( fields )
        {
            return fields && fields.map( this.renderField );
        }

      , renderField: function( field )
        {
            if ( field.multiple )
            {
                return this.renderMultiple( field );
            }

            return this.renderSingle( field );
        }

      , validate: function( field, value )
        {
            if ( field.type === "text" && field.pattern )
            {
                var valid = !!((value || "").match( field.pattern ));
                return valid ? "success" : "error";
            }
        }

      , renderSingle: function( field )
        {
            var value = this.getValue( field )
              , bsStyle = this.validate( field, value )
              ;

            return React.createElement(
                Input
              , React.__spread( { label: field.key }, field, field.props, {
                    labelClassName: "col-sm-2"
                  , wrapperClassName: "col-sm-10"
                  , onChange: this.onChange.bind( this, field, null )
                  , value: value
                  , name: field.key
                  , checked: value
                  , bsStyle: bsStyle
                  , hasFeedback: !!bsStyle
                })
              , null
            );
        }

      , renderMultiple: function( field )
        {
            var children = this.getArrayValue( field ).map( this.renderInput.bind( this, field ) );
            children.push( this.renderInput( field, null, children.length ) );

            return React.createElement(
                Input
              , {
                    key: field.key
                  , label: field.label || field.key
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
                  , React.__spread({}, field, field.props, {
                        className: "form-control"
                      , value: value
                      , onChange: this.onChange.bind( this, field, index )
                    })
                )
            );
        }

      , onChange: function( field, index, event )
        {
            var value = field.type === "checkbox" ? event.target.checked : event.target.value;
            this.setValue( field, index, value );
        }

      , onSubmit: function( event )
        {
            event.preventDefault();
            this.save();
        }
    });
});
