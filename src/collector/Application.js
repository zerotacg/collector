define(function (require)
{   "use strict";

    var React       = require( "react" )
      , Router      = require( "director" )
      , Database    = require( "./Database" )
      , MainView    = require( "./view/Main" )
      ;

    function Application()
    {
        this.db = Database;
        this.router = Router({
            "home": this.onHome.bind( this )
          , "config": this.onConfig.bind( this )
        });
    }

    Application.prototype.init = function()
    {
        this._main_view = React.render(
            React.createElement( MainView, null, null )
          , document.body
        );
        this.router.init();
    };

    Application.prototype.getMainView = function()
    {
        return this._main_view;
    };

    Application.prototype.setPath = function( path )
    {
        this.getMainView().setState({ path: path });
    };

    Application.prototype.onHome = function()
    {
        this.setPath( "home" );
    };

    Application.prototype.onConfig = function()
    {
        this.setPath( "config" );
    };

    return Application;
});
