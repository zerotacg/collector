import React from "react";

import NavBar from "./navigation/NavBar";

export default class Viewport extends React.Component {
    constructor( props ) {
        super(props);
    }

    render() {
        return React.createElement(
            "div",
            { role: "application" },
            this.props.children
        );
    }
}
