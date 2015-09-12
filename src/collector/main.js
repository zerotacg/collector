import LocalForage  from "localforage";

import Config from "collector/config/Config";
import Application from "collector/Application";
import Factory from "collector/Factory";

import defaults from "collector/config/defaults";

var config = window.config = new Config({
    defaults,
    storage: LocalForage
});
var factory = new Factory();
var app = window.app = new Application({
    config,
    factory
});

app.init();
