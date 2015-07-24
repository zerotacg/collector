import Rx from "rx";

export default class Config
{
    constructor( cfg )
    {
        this.defaults = cfg.defaults;
        this.storage = cfg.storage;
        this.scheduler = cfg.scheduler;
        this.subject = new Rx.Subject();
    }

    get( key )
    {
        return (
            this.storage
                .getItem( key )
                .then( value => this.map( key, value ) )
        );
    }

    map( key, value )
    {
        if ( this.isNotDefined(value) )
        {
            return this.getDefault( key );
        }

        return value;
    }

    isNotDefined( value ) {
        return value === undefined || value === null;
    }

    getDefault( key )
    {
        return this.defaults[ key ];
    }

    stream( key )
    {
        return (Rx.Observable
            .fromPromise( this.get( key ) )
            .merge( this.subject.map( object => object.value ) )
        );
    }

    set( key, value )
    {
        this.scheduler.schedule(() => this.subject.onNext({ key, value }) );
    }
}
