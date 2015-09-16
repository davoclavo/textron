var cp = require('child_process');
var attach = require('neovim-client');

var nvim_proc = cp.spawn('nvim', ['-u', 'NONE', '-N', '--embed'], {});
attach(nvim_proc.stdin, nvim_proc.stdout, function(err, nvim) {

  nvim.on('request', function(method, args, resp) {
    // handle msgpack-rpc request
    console.log(method, args, resp);
  });

  nvim.on('notification', function(method, args) {
    // handle msgpack-rpc notification
    console.log(method, args);
  });

  nvim.command('vsp', function(err, res) {
    nvim.getWindows(function(err, windows) {
      console.log(windows.length);  // 2
      console.log(windows[0] instanceof nvim.Window); // true
      console.log(windows[1] instanceof nvim.Window); // true
      nvim.setCurrentWindow(windows[1], function(err, res) {
        nvim.getCurrentWindow(function(err, win) {
          console.log(win.equals(windows[1]))  // true
          nvim.quit();
          nvim.on('disconnect', function() {
            console.log("Nvim exited!");
          });
        });
      });
    });
  });
});
