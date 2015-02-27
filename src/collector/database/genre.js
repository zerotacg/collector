define( function()
{
    return {
        "_id": "_design/genre"
      , "_rev": undefined
      , "views":{
            "genre": {
                "map":
(function( doc ) {
    if( doc.genre && doc.genre.length ) {
        for( var idx in doc.genre ) {
            emit( doc.genre[idx], null );
        }
    }
}).toString()
            }
        }
      , "language":"javascript"
    };
});
