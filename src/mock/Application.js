import React from "react";

import Main         from "collector/component/Viewport";
import NavBar       from "collector/component/navigation/NavBar";

import "bootstrap/css/bootstrap.css!";

export default class Application
{
    init()
    {
        React.render( this.createMain(), document.getElementById( "viewport" ) );
    }

    createMain()
    {
        return React.createElement(
            Main,
            null,
            this.createNavBar()
        );
    }

    createNavBar()
    {
        return React.createElement(
            NavBar,
            {
                items: [
                    {
                        path: "recent",
                        text: "Recent"
                    }
                ]
            }
        );
    }
}
