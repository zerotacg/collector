export default [
    { key: "_id", label: "_id", type: "text", defaultValue: "type/", pattern: "^type/.+$" }
  , { key: "key", label: "Key", type: "text", placeholder: "Enter text", uri: { type: "type" } }
  , { key: "name", label: "Name", type: "text", placeholder: "Enter text" }
  , { key: "fields", label: "Fields", multiple: true, type: "text", placeholder: "Enter text" }
];
