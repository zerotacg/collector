import React from "react";
import { PageHeader } from "react-bootstrap";

import Sync from "./sync/Sync";

export default class extends React.Component
{
    render()
    {
        return React.createElement(
            "div"
          , null
          , React.createElement( PageHeader, null, "Config" )
          , React.createElement( Sync, { config: this.props.config }, null )
        );
    }
}
