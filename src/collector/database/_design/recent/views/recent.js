export function map( doc )
{
    emit( doc.added );
}

export default {
    map: map.toString()
};
