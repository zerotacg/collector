define( function() { "use strict"; return (
function( doc ) {
    if( doc.genre && doc.genre.length ) {
        for( var idx in doc.genre ) {
            emit( doc.genre[idx], null );
        }
    }
});
});
