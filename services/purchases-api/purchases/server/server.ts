import http = require('http');
import { App } from './app';

var port: number = 3000;

var expressApp = new App(port).expressApp;
var httpServer = http.createServer( expressApp );

//Start server
httpServer.listen(port, ()=>{
    console.log('Server listening on port:' + port);
});