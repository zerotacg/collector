import React from "react";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

export default class Remove extends React.Component
{
    render()
    {
        return React.createElement(
            Button
          , { onClick: this.handleClick }
          , this.renderIcon()
        );
    }

    renderIcon()
    {
        return React.createElement(
            Glyphicon
          , { glyph: "remove" }
          , null
        );
    }

    handleClick()
    {
        this.props.onClick( this.props.value );
    }
}
