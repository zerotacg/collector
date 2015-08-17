import React from "react";

export default class Viewport extends React.Component {
    constructor( props ) {
        super(props);
    }

    render() {
        return React.createElement(
            "div",
            null,
            this.props.children
        );
    }
}
