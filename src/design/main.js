import LocalForage  from "localforage";

import Config from "collector/config/Config";
import Factory from "collector/Factory";
import Application from "./Application";

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
