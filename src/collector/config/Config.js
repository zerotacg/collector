import Rx from "rx";

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

    stream( key )
    {
        return Rx.Observable.return();
    }

    map( key, value )
    {
        if ( this.isDefined(value) )
        {
            return this.getDefault( key );
        }

        return value;
    }

    isDefined( value ) {
        return value === undefined || value === null;
    }

    getDefault( key )
    {
        return this.defaults[ key ];
    }
}
