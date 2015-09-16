var fs = require('fs');
var unix = require('unix-stream');
if (fs.existsSync('/tmp/local_path')) {
    fs.unlinkSync('/tmp/local_path');
}

var socket = unix.createSocket('/tmp/local_path');
socket.on('error', function(err) {
    console.log(err);
});

// Connect to /tmp/remote_path
socket.connect({ path : '/tmp/nvim' }, function() {
    console.log("[Client] Client bound to: " + this.localPath +
                " connected to: " + this.remotePath);
    console.dir(this);
});

socket.on('data', function(data) {
    console.log('Data received by client: ' + data);
    socket.end('pong');
});
