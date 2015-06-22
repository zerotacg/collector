import React from "react";

export default class Brand extends React.Component
{
    render()
    {
        return React.createElement(
            "a"
          , this.props
        );
    }
}

Brand.propTypes = {
};

Brand.defaultProps = {
    href: ""
  , children: "Collector"
};
