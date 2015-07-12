import React from "react";
import TestUtils from "react/addons/TestUtils";

export function render( Type, props ) {
    var element = React.createElement(Type, props);
    return TestUtils.renderIntoDocument(element);
}
