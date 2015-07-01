import React from "react";
import TestUtils from "react/addons/TestUtils";

export function createComponent( component, props, ...children ) {
    const renderer = TestUtils.createRenderer();
    children = children.length > 1 ? children : children[ 0 ];

    renderer.render( React.createElement( component, props, children ) );

    return renderer.getRenderOutput();
}
