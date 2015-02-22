define(function (require)
{   "use strict";

    var Database = require( "./Database" );

    function Application()
    {
        this.db = Database;
    }

    Application.prototype.init = function()
    {
    };

    return Application;
});
