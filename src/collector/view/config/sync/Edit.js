define( function( require )
{   "use strict";

    var React       = require( "react" )
      , Input       = require( "react-bootstrap/lib/Input" )
      , PageHeader  = require( "react-bootstrap/lib/PageHeader" )
      , Table       = require( "react-bootstrap/lib/Table" )
      , Target      = require( "./Target" )
      ;

    return React.createClass({
        propTypes: {
            value: Target
          , onChange: React.PropTypes.func.isRequired
          , onSubmit: React.PropTypes.func.isRequired
        }

      , getDefaultProps: function()
        {
            return {
                value: {
                    url: undefined
                  , live: true
                  , retry: true
                }
              , onChange: function(){}
              , onSubmit: function(){}
            };
        }

      , render: function()
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

      , renderUrl: function()
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

      , renderLive: function()
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

      , renderRetry: function()
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

      , renderSubmit: function()
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

      , getValue: function()
        {
            return {
                url: this.refs.url.getValue()
              , live: this.refs.live.getChecked()
              , retry: this.refs.retry.getChecked()
            };
        }

      , handleChange: function()
        {
            this.props.onChange( this.getValue() );
        }

      , handleSubmit: function( e )
        {
            e.preventDefault();
            this.props.onSubmit( this.getValue() );
        }
    });
});
