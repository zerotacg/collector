import PouchDB from "pouchdb";
import React from "react";
import Input from "react-bootstrap/lib/Input";

import Config from "../../../controller/Config";

export default class Url extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            url: undefined
          , db: undefined
        };
    }

    componentWillMount()
    {
    }

    componentWillUnmount()
    {
    }

    handleChange()
    {
        var url = this.refs.url.getValue();
        this.setState({
            url: url
          , db: { info: this.getInfo( url ) }
        });
    }

    getInfo( url )
    {
        var db = new PouchDB( url, { skipSetup: true} );
        return (db
            .info()
            .then( this.setInfo.bind( this ) )
            .catch( this.setError.bind( this ) )
        );
    }

    setInfo( info )
    {
        this.setState({
            db: { info, error: undefined }
        });
    }

    setError( error )
    {
        this.setState({
            db: { info: undefined, error }
        });
    }

    validate( db )
    {
        var bsStyle = "error", help;
        console.log( "db", db );
        if ( db )
        {
            var { info, error } = db || {};
            if ( info instanceof Promise )
            {
                bsStyle = "warning";
                help = "checking...";
            }
            else if ( info )
            {
                bsStyle = "success";
                help = this.renderInfo( info );
            }
            else if ( error )
            {
                bsStyle = "error";
                help = this.renderError( error );
            }
        }

        return { bsStyle, help };
    }

    /**
     * @param {Object} info
     * @param {string} info.db_name
     * @param {number} info.doc_count
     * @returns {string}
     */
    renderInfo( info )
    {
        return `name: ${ info.db_name } document count: ${ info.doc_count }`;
    }

    /**
     * @param {Object} error
     * @param {number} error.status
     * @returns {string}
     */
    renderError( error )
    {
        return `status: ${ error.status } message: ${ error.message }`;
    }

    render()
    {
        var validation = this.validate( this.state.db );

        return React.createElement(
            Input
          , {
                type: "text"
              , value: this.state.url
              , placeholder: "e.g. local-db-name or http://host:5984/remote-db-name"
              , label: "Url"
              , ref: "url"
              , bsStyle: validation.bsStyle
              , help: validation.help
              , hasFeedback: true
              , onChange: this.handleChange.bind( this )
            }
        );
    }
}
Url.propTypes = {
    config: React.PropTypes.instanceOf( Config ).isRequired
  , configPath: React.PropTypes.string.isRequired
};

Url.defaultProps = {
    configPath: "db.url"
};
