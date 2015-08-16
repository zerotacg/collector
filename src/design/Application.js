import React from "react";

import Viewport from "collector/component/Viewport";
import NavBar from "collector/component/navigation/NavBar";
import List from "collector/component/list/List";

import "bootstrap/css/bootstrap.css!";
import "resources/css/collector.css!";

export default class Application
{
    init()
    {
        React.render( this.createMain(), document.getElementById( "viewport" ) );
    }

    createMain()
    {
        return React.createElement(
            Viewport,
            null,
            this.createNavBar(),
            this.createContent()
        );
    }

    createNavBar()
    {
        return React.createElement(
            NavBar,
            {
                activeKey: ""
            },
            [
                {
                    href: "",
                    children: "Home"
                },
                {
                    href: "#recent",
                    children: "Recent"
                }
            ]
        );
    }

    createContent()
    {
        return React.createElement(
            List,
            null,
            [
                {
                    _id: "1",
                    image: "http://ecx.images-amazon.com/images/I/51H2c+aT72L._AA160_.jpg",
                    name: "Jack und das Kuckucksuhrherz",
                    released: "2013"
                },

                {
                    _id: "2",
                    image: "http://ecx.images-amazon.com/images/I/51tyufSkADL._AA160_.jpg",
                    name: "Bernie",
                    released: "2011"
                },

                {
                    _id: "3",
                    image: "http://ecx.images-amazon.com/images/I/91ITRc1jjBL._AA160_.jpg",
                    name: "Guardians of the Galaxy",
                    released: "2014"
                },

                {
                    _id: "4",
                    image: "http://ecx.images-amazon.com/images/I/91mKE0I2oPL._AA160_.jpg",
                    name: "Big Bang Theory",
                    season: "Staffel 7"
                }
            ]
        );
    }
}
