var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function (req, res) {
    if (req.url === '/') {
        fs.readFile('index.html', function (err, info) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("На сервере произошла ошибка!");
                return;
            }
            res.end(info);
        });
    } else {
        res.statusCode = 404;
        res.end("Not Found!");
    }
});

server.listen(3000);