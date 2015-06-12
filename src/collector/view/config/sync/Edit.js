import React from "react";
import { Input, PageHeader, Table } from "react-bootstrap";

import Target from "./Target";

export default class Edit extends React.Component
{
    render()
    {
        return React.createElement(
            "form"
          , { onSubmit: this.handleSubmit }
          , this.renderUrl()
          , this.renderLive()
          , this.renderRetry()
          , this.renderSubmit()
        );
    }

    renderUrl()
    {
        return React.createElement(
            Input
          , {
                type: "text"
              , value: this.props.value.url
              , placeholder: "e.g. http://my.couch.db:5984/dbname"
              , label: "Url"
              , ref: "url"
              , onChange: this.handleChange
            }
          , null
        );
    }

    renderLive()
    {
        return React.createElement(
            Input
          , {
                type: "checkbox"
              , checked: this.props.value.live
              , label: "Live"
              , ref: "live"
              , onChange: this.handleChange
            }
            , null
        );
    }

    renderRetry()
    {
        return React.createElement(
            Input
          , {
                type: "checkbox"
              , checked: this.props.value.retry
              , readOnly: !this.props.value.live
              , label: "Retry"
              , ref: "retry"
              , onChange: this.handleChange
            }
          , null
        );
    }

    renderSubmit()
    {
        return React.createElement(
            Input
          , {
                type: "submit"
              , value: "Add"
            }
          , null
        );
    }

    getValue()
    {
        return {
            url: this.refs.url.getValue()
          , live: this.refs.live.getChecked()
          , retry: this.refs.retry.getChecked()
        };
    }

    handleChange()
    {
        this.props.onChange( this.getValue() );
    }

    handleSubmit( e )
    {
        e.preventDefault();
        this.props.onSubmit( this.getValue() );
    }
}

Edit.propTypes = {
    value: Target
  , onChange: React.PropTypes.func.isRequired
  , onSubmit: React.PropTypes.func.isRequired
};

Edit.defaultProps = {
    value: {
        url: undefined
      , live: true
      , retry: true
    }
  , onChange: function(){}
  , onSubmit: function(){}
};
