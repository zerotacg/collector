import React from "react";
import Alert from "react-bootstrap/lib/Alert";
import Col from "react-bootstrap/lib/Col";
import Input from "react-bootstrap/lib/Input";
import PouchDB from "pouchdb";
import director from "director";

import TypeModel from "../../model/Type";
import FieldModel from "../../model/Field";

var TYPE = "type"
  , FIELD = "field"
  , KEY = "key"
  ;
var IdField = { key: "_id", type: "text", label: "_id", placeholder: "Enter text" }
  , RevField = { key: "_rev", type: "static", label: "_rev" }
  , TypeField = { key: "type", type: "static", label: "Type" }
  ;

export default class Type extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            loading: false
          , doc: null
          , alert: null
          , fields: null
        };
    }

    componentWillMount()
    {
        this.load( this.props.doc );
    }

    componentWillReceiveProps( nextProps )
    {
        this.load( nextProps.doc );
    }

    loading()
    {
        this.setState({ loading: true });
    }

    loaded()
    {
        this.setState({ loading: false });
    }

    loadedState( state )
    {
        this.setState( state );
    }

    load( doc )
    {
        var state = { doc: doc }
          , load = Promise.resolve( state )
          ;

        this.clearAlert();

        if ( doc._id )
        {
            load = this.loadDoc( state );
        }

        load.then( this.loadFields.bind( this ) )
            .then( this.loadedState.bind( this ) )
            .catch( this.setError.bind( this ) )
            .then( this.loaded.bind( this ) )
        ;
    }

    addValue( state, key, value )
    {
        state[key] = value;
        return state;
    }

    loadDoc( state )
    {
        var props = this.props;

        this.loading();

        return props.db.get( state.doc._id )
            .then( this.addValue.bind( this, state, "doc" ) )
        ;
    }

    loadFields( state )
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
                    load = Promise.resolve( TypeModel );
                    break;
                case FIELD:
                    load = Promise.resolve( FieldModel );
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

    queryFields( type )
    {
        var load = this.props.db.query( "fields", {
            key: type
          , include_docs: true
        });

        return load
            .then( this.getRows.bind( this ) )
            .then( this.findMissingFields.bind( this ) )
            .then( this.getDocs.bind( this ) )
        ;
    }

    save()
    {
        var props = this.props
          , doc = this.state.doc
          ;

        this.clearAlert();
        this.loading();

        props.db.put( doc )
            .then( this.updateDoc.bind( this ) )
            .then( this.setState.bind( this, { alert: { bsStyle: "success", message: "Saved" } } ) )
            .catch( this.setError.bind( this ) )
            .then( this.loaded.bind( this ) )
        ;
    }

    updateDoc( result )
    {
        var props = this.props;

        var id = result.id
          , rev = result.rev
          ;

        this.setValue( IdField, null, id );
        this.setValue( RevField, null, rev );

        if ( result.id !== props.doc._id )
        {
            location.assign( props.uri.edit({ _id: result.id }) );
        }
    }

    getType( doc )
    {
        return doc && doc.type;
    }

    /**
     * @param {Object} result
     * @param {Array} result.rows
     * @returns {Array} rows
     */
    getRows( result )
    {
        return result.rows;
    }

    findMissingFields( rows )
    {
        var missing = rows.filter( this.isDocMissing.bind( this ) );

        if ( missing.length )
        {
            return Promise.reject( new ReferenceError(
                "Can't load missing fields: " + missing.map( this.getReferenceId.bind( this ) ).join( ", " )
            ));
        }

        return rows;
    }

    isDocMissing( row )
    {
        return !this.getDoc( row );
    }

    getReferenceId( row )
    {
        return row.value._id;
    }

    getDocs( rows )
    {
        return rows.map( this.getDoc.bind( this ) );
    }

    /**
     * @param {Object} row
     * @param {any} row.doc
     * @returns {any} doc
     */
    getDoc( row )
    {
        return row.doc;
    }

    setError( error )
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

    clearAlert()
    {
        this.setState({ alert: null });
    }

    getValue( field )
    {
        return this.state.doc && this.state.doc[field.key];
    }

    getArrayValue( field )
    {
        var value = this.getValue( field ) || [];
        return Array.isArray( value ) ? value : [value];
    }

    setValue( field, index, value )
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

    render()
    {
        console.log( "type.render", this.state );
        return React.createElement(
            "div"
          , null
          , this.renderAlert( this.state.alert )
          , React.createElement(
                "form"
              , { className: "form-horizontal", onSubmit: this.onSubmit.bind( this ) }
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

    renderAlert( alert )
    {
        return alert && React.createElement(
            Alert
          , React.__spread({
                dismissAfter: this.props.dismissAfter
              , onDismiss: this.clearAlert.bind( this )
            }, alert )
          , alert.name && React.createElement( "h4", null, alert.name )
          , alert.message && React.createElement( "p", null, alert.message )
        );
    }

    renderFields( fields )
    {
        return fields && fields.map( this.renderField.bind( this ) );
    }

    renderField( field )
    {
        if ( field.multiple )
        {
            return this.renderMultiple( field );
        }

        return this.renderSingle( field );
    }

    validate( field, value )
    {
        if ( field.type === "text" && field.pattern )
        {
            var valid = !!((value || "").match( field.pattern ));
            return valid ? "success" : "error";
        }
    }

    renderSingle( field )
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

    renderMultiple( field )
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

    renderInput( field, value, index )
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

    onChange( field, index, event )
    {
        var value = field.type === "checkbox" ? event.target.checked : event.target.value;
        this.setValue( field, index, value );
    }

    onSubmit( event )
    {
        event.preventDefault();
        this.save();
    }
}

Type.propTypes = {
    db: React.PropTypes.instanceOf( PouchDB ).isRequired
  , router: React.PropTypes.instanceOf( director.Router ).isRequired
  , doc: React.PropTypes.shape({
        _id: React.PropTypes.string
      , type: React.PropTypes.string
    })
  , dismissAfter: React.PropTypes.number
};

Type.defaultProps = {
    dismissAfter: 2000
  , Type: TypeModel
};
