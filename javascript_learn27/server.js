var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function (req, res) {
    var body = '';
    if (req.url === '/') {
        sendFile("index.html", res);
    } else if (req.url.indexOf('subscribe')>0) {
        chat.subscribe(req, res);
    } else if (req.url === '/publish') {
        req.on('readable', function () {
            var chunk;
            while (null !== (chunk = req.read())) {
                body += chunk;
            }
        })
            .on('end', function () {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    res.statusCode = 400;
                    res.end("Bad Request");
                    return;
                }
                chat.publish(body.message);
                res.end("ok");
            });
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
}).listen(3000);

function sendFile(fileName, res) {
    var fileStream = fs.createReadStream(fileName);
    fileStream.on('error', function () {
        res.statusCode = 500;
        res.end("Server error");
    })
        .pipe(res)
        .on('close', function() {
            fileStream.destroy();
        });
}