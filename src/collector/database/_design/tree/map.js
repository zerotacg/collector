export default function(doc)
{   "use strict";
    var path = doc.path
        , paths = []
        ;
    if ( path !== undefined )
    {
        if ( Array.isArray( path ) )
        {
            paths.push.apply( paths, path );
        }
        else
        {
            paths.push( path );
        }
    }

    var slug = doc.slug;
    var name = doc.name || slug || doc._id;
    var type = doc.type;
    var series = doc.series || [];

    if ( !Array.isArray( series ) )
    {
        series = [series];
    }

    paths.forEach( function( path ) {
        var key = path === null ? [] : path.split( "/" );
        key.unshift( key.length );
        key.push( type, name );
        emit( key, slug );
    });

    series.forEach( function( item ) {
        var key = [ type, item ];
        key.unshift( key.length );
        key.push( type, name );
        emit( key, slug );
    });

    var key = type.split( "/" );
    key.unshift( key.length );
    key.push( type, name );
    emit( key );
}
