import React from "react";
import NavItem from "react-bootstrap/lib/NavItem";

export default class Recent extends NavItem
{
}

Recent.propTypes = React.__spread({}, NavItem.propTypes);

Recent.defaultProps = React.__spread({}, NavItem.defaultProps, {
    href: "#recent",
    eventKey: "recent",
    children: "Recent"
});
