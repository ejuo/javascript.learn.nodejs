var fs = require('fs');

var stream = new fs.ReadStream(__filename);

stream.on('readable', function() {
    var data = stream.read();
    if (data != null){
        console.log(data.toString());
    };
});

stream.on('end', function () {
    console.log("The End");
});

stream.on('error', function (err) {
    if (err.code === 'ENOENT') {
        console.log("File not found!");
    } else {
        console.error(err);
    }
});