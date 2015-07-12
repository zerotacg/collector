import React from "react";
import NavItem from "react-bootstrap/lib/NavItem";

export default class Recent extends NavItem
{
}

Recent.propTypes = Object.assign({}, NavItem.propTypes);

Recent.defaultProps = Object.assign({}, NavItem.defaultProps, {
    href: "#recent",
    eventKey: "recent",
    children: "Recent"
});
