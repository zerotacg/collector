import React from "react";

export default React.PropTypes.shape({
    key: React.PropTypes.oneOfType([
        React.PropTypes.string
      , React.PropTypes.number
    ]).isRequired
});
