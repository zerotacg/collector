import React from "react";
import { Button, Glyphicon } from "react-bootstrap";

export default class extends React.Component
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
