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

    isUrl( url )
    {
        try {
            return !!(new URL( url ));
        }
        catch(e) {
            return false;
        }
    }

    getInfo( url )
    {
        if ( !this.isUrl( url ) )
        {
            return true;
        }

        var db = new PouchDB( url, { skipSetup: true} );

        return (db
            .info()
            .then( this.setInfo.bind( this ) )
            .catch( this.setError.bind( this ) )
        );
    }

    setInfo()
    {
        this.setState({
            db: { info: true, error: undefined }
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

        if ( db )
        {
            var { info, error } = db;

            if ( info === true )
            {
                bsStyle = "success";
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
