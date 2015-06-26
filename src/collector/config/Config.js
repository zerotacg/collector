export default class Config
{
    constructor( cfg )
    {
        this.defaults = cfg.defaults;
        this.storage = cfg.storage;
    }

    get( key )
    {
        return (
            this.storage
                .getItem( key )
                .then( this.map.bind( this, key ) )
        );
    }

    map( key, value )
    {
        if ( value === undefined )
        {
            return this.getDefault( key );
        }

        return value;
    }

    getDefault( key )
    {
        return this.defaults[ key ];
    }
}
