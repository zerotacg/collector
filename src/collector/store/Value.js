import Events from "events";

export const EVENT_CHANGE = "change";

export default class Value extends Events
{
    constructor( value )
    {
        super();
        this.value = value;
    }

    get()
    {
        return this.value;
    }

    set( value )
    {
        this.value = value;
        this.emit( EVENT_CHANGE, value );
    }
}
