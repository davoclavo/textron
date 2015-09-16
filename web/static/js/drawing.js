import socket from "./socket"

export var Drawing = {
  p5instance: function p5instance(p){
    let channel = socket.channel("file:lobby", {})

    channel.join()
      .receive("ok", resp => { console.log("Joined channel", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
    channel.onError(e => console.log("something went wrong", e))
    channel.onClose(e => console.log("channel closed", e))

    var draw_cursor = function(x,y) {
      p.rect(x,y,grid,grid);
    }

    channel.on("file:cursor", location => {
      console.log(location)
      draw_cursor(location.x, location.y)
    })


    const width = 500;
    const height = 500;
    var x = p.random(width);
    var y = p.random(height);
    var grid = 5;

    p.setup = function(){
      p.createCanvas(width,height);
      //p.noStroke();
      p.noCursor();
      p.background(0);
      draw_cursor(x,y);
    };

    p.draw = function(){
    };

    p.keyTyped = function(){
      switch(p.key){
        case 'h':
          x = x - grid;
          break;
        case 'j':
          y += grid;
          break;
        case 'k':
          y -= grid;
          break;
        case 'l':
          x += grid;
          break;
      }
      channel.push("file:cursor", {x: x, y: y})
    };
  },

  run: function run(){
    var myp5 = new p5(this.p5instance);
  }
}

