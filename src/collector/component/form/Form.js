import React from "react";
import Input from "react-bootstrap/lib/Input";

export default class Form extends React.Component
{
    render()
    {
        return React.createElement(
            "form"
          , { className: "form-horizontal" }
          , React.createElement(
                Input
              , { type: "submit", value: "Save", wrapperClassName: "col-md-offset-2 col-sm-2" }
            )
        );
    }
}
