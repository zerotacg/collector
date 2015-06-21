import React        from "react";
import Input        from "react-bootstrap/lib/Input";
import PageHeader   from "react-bootstrap/lib/PageHeader";

import Url from "./Url";

export default class Database extends React.Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return React.createElement(
            "div"
          , null
          , React.createElement(
                PageHeader
              , null
              , React.createElement( "small", null, "Database" )
            )
          , React.createElement(
                Url
              , {
                    config: this.props.config
                }
            )
        );
    }
}
