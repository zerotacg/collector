define( function() { "use strict"; return (
function(doc) {
    Object.keys( doc )
        .filter( function( key ) {
            return ["_id", "_rev"].indexOf( key ) === -1;
        })
        .forEach( function( key ) {
            var value = doc[key];
            value = !Array.isArray( value ) ? [value] : value;
            value.forEach( function( value ) {
                emit( [key, value] );
            });
        })
    ;
});
});
