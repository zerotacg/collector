define( function( require )
{   "use strict";

    return [
        { key: "_id", label: "_id", type: "text", defaultValue: "field/", pattern: "^field/.+$" }
      , { key: "key", label: "Key", type: "text", placeholder: "Enter text", uri: { type: "field" } }
      , { key: "type", label: "Type", type: "text", placeholder: "Enter text" }
      , { key: "label", label: "Label", type: "text", placeholder: "Enter text" }
      , { key: "placeholder", label: "Placeholder", type: "text", placeholder: "Enter text" }
      , { key: "pattern", label: "Pattern", type: "text", placeholder: "Enter text" }
      , { key: "multiple", label: "Multiple", type: "checkbox" }
    ];
});
