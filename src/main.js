import Application from "./collector/Application";

var app = window.app = new Application();

app.init();
app.db.sync("http://192.168.0.19:5984/collector", { live: true, retry: true });
app.config.db.sync("http://192.168.0.19:5984/collector-config", { live: true, retry: true });
