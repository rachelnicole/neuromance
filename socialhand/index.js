pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();

var randomColor = function (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var fps = 24;

board.on("ready", function() {
    console.log("Board initialised")
    var strip = new pixel.Strip({
        data: 6,
        length: 16,
        board: this,
        controller: "FIRMATA",
    });

    strip.on("ready", function() {
        // do stuff with the strip here.
        console.log("Pixels about to light up")
        
        // Set the entire strip to pink.
        strip.color('deeppink');

        // Set first and seventh pixels to turquoise.
        strip.pixel(0).color('teal');
        strip.pixel(1).color('teal');
        strip.pixel(8).color('teal');
        strip.pixel(9).color('teal');

        // Display initial state.
        strip.show();

        // Loop the following command forever
        // at 12fps until Arduino powers down.
        var loop = setInterval(function () {
          // Shift all pixels clockwise
          strip.shift(1, pixel.FORWARD, true);
          strip.show();
        }, 1000 / 16);
    });

});