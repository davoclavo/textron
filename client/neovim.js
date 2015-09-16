var fs = require('fs');
var unix = require('unix-stream');
var attach = require('neovim-client');
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
    //console.dir(this);
});

attach(socket, socket, function(err, nvim) {

  nvim.on('request', function(method, args, resp) {
    // handle msgpack-rpc request
    console.log(method, args, resp);
  });

  nvim.on('notification', function(method, args) {
    // handle msgpack-rpc notification
    console.log(method, args);
  });

  nvim.command('vnew', function(err, res) {
    nvim.getWindows(function(err, windows) {
      nvim.setCurrentWindow(windows[1], function(err, res) {
        nvim.getCurrentBuffer(function(err, buf) {
            buf.setLine(0, "ALL YOUR BASE");
            buf.setLine(1, "ARE BELONG TO US");
            buf.lineCount(function(err, number) {
                console.log("File with " + number + " lines");
            });
        });
      });
    });
  });

  nvim.on('disconnect', function() {
    console.log("Nvim exited!");
  });
});

