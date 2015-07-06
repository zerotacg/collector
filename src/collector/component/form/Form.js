import React from "react";
import Input from "react-bootstrap/lib/Input";

import Field from "collector/shape/form/Field";

export default class Form extends React.Component
{
    render()
    {
        var fields = this.props.fields.map( this.renderField, this );

        return React.createElement(
            "form"
          , { className: "form-horizontal" }
          , fields
          , this.renderSaveButton()
        );
    }

    renderField( field )
    {
        return React.createElement(
            Input
          , React.__spread( field, {
                labelClassName: "col-sm-2"
              , wrapperClassName: "col-sm-10"
              , name: field.key
            })
        );
    }

    renderSaveButton()
    {
        return React.createElement(
            Input
          , { ref: "saveButton", type: "submit", value: "Save", wrapperClassName: "col-md-offset-2 col-sm-2" }
        );
    }
}

Form.propTypes = {
    fields: React.PropTypes.arrayOf( Field ).isRequired
};

Form.defaultProps = {
    fields: []
};
