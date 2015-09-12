import React from "react";

import CollectorApplication from "collector/Application";
import NavBar from "collector/component/navigation/NavBar";
import List from "collector/component/list/List";

export default class Application extends CollectorApplication
{
    constructor(cfg)
    {
        super(cfg);
    }

    init()
    {
        React.render( this.createViewport(), document.getElementById( "viewport" ) );
    }

    createDatabase()
    {
        return null;
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
            { uri: this.uri },
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
