import React from "react";
import PageHeader from "react-bootstrap/lib/PageHeader";

import Database     from "./database/Database";

export default class Config extends React.Component
{
    render()
    {
        return React.createElement(
            "div"
          , null
          , React.createElement( PageHeader, null, "Config" )
          , React.createElement( Database, { config: this.props.config }, null )
        );
    }
}
