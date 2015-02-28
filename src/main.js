requirejs.config({
    baseUrl: "bower_components"
  , paths: {
        "director": "director/build/director"
      , "react": "react/react-with-addons"
      , "pouchdb": "pouchdb/dist/pouchdb"
      , "jquery": "jquery/dist/jquery.min"
      , "text": "requirejs-text/text"
      , "json": "requirejs-json/json"
      , "docuri": "../build/docuri"

      , "collector": "../src/collector"
    }
  , shim: {
        "director": {
            exports: "Router"
        }
    }
});

define( function( require ) {
    "use strict";

    var Application = require( "collector/Application" )
      , app = window.app = new Application()
      ;

    app.init();
    app.db.sync("http://192.168.0.19:5984/collector");
    app.config.db.sync("http://192.168.0.19:5984/collector-config");
});
