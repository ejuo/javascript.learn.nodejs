var domain = require('domain');
var fs = require('fs');
var http = require('http');

var d = domain.create();
var server;

d.on('error', function (err) {
    console.error("Домен перехватил %s", err);
});

server = new http.Server();
d.run(function () {
    //server = new http.Server();
    d.add(server);
});


server.on('boom', function () {
    setTimeout(function () {
        fs.readFile(__filename, function () {
            ERROR();
        });
    }, 1000);
});

server.emit('boom');