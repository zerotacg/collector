define( function( require )
{   "use strict";

    return [
        { key: "type", label: "Type", type: "static" }
      , { key: "key", label: "Key", create: true, type: "text", placeholder: "Enter text" }
      , { key: "name", label: "Name", type: "text", placeholder: "Enter text" }
      , { key: "fields", label: "Fields", multiple: true, type: "text", placeholder: "Enter text" }
    ];
});
