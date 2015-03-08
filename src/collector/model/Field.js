define( function( require )
{   "use strict";

    return [
        { key: "_id", label: "_id", props: { type: "text", defaultValue: "field/" }, pattern: "^field/.+$" }
      , { key: "key", label: "Key", props: { type: "text", placeholder: "Enter text" }, uri: { type: "field" } }
      , { key: "label", label: "Label", props: { type: "text", placeholder: "Enter text" } }
      , { key: "placeholder", label: "Placeholder", props: { type: "text", placeholder: "Enter text" } }
      , { key: "pattern", label: "Pattern", props: { type: "text", placeholder: "Enter text" } }
      , { key: "multiple", label: "Multiple", props: { type: "checkbox" } }
    ];
});
