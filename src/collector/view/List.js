define( function( require )
{   "use strict";

    var React = require( "react" );

    return React.createClass({
        getDefaultProps: function()
        {
            return {
                items: []
            };
        }

      , getInitialState: function()
        {
            return {
            };
        }

      , render: function()
        {
            var items = this.props.items.map( function( item, index ) {
                return React.createElement(
                    "li"
                  , { key: index, className: "media" }
                  , React.createElement(
                        "div"
                      , { className: "media-left" }
                      , React.createElement(
                            "img"
                          , { src: item.image, height: 64 }
                          , null
                        )
                    )
                  , React.createElement(
                        "div"
                      , { className: "media-body" }
                      , React.createElement(
                            "h4"
                          , { className: "media-heading" }
                          , item.title
                        )
                    )
                );
            });

            return React.createElement(
                "ul"
              , { className: "media-list" }
              , items
            );
        }
    });
});
