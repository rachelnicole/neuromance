var pixel = require("node-pixel");
var five = require("johnny-five");
var Twit = require("twit");
var config = require("./config.js");

var board = new five.Board();

var T = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_SECRET,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

var fps = 24;
var mentionedLoop,
  regularLoop;

board.on("ready", function () {
  console.log("Board initialised")
  var strip = new pixel.Strip({
    data: 6,
    length: 16,
    board: this,
    controller: "FIRMATA",
  });

  strip.on("ready", function () {
    // do stuff with the strip here.
    console.log("Pixels about to light up")

    regularState();
  });

  var stream = T.stream('statuses/filter', { track: '#neu_romance', language: 'en' })

  stream.on('tweet', function (tweet) {
    console.log("tweet has been mentioned");
    console.log(tweet.text);
    // var regEx = new RegExp("(.*?)");
    // var colorPull = regEx.exec(tweet.text);
    // console.log(colorPull);

    mentionedState();
  });

  function regularState() {
    clearInterval(mentionedLoop);
    console.log('regularState called')
    // Reset Colors

    // Set first and seventh pixels to turquoise.
    strip.pixel(1).color('red');
    strip.pixel(2).color('red');
    strip.pixel(9).color('red');
    strip.pixel(10).color('red');

    // Display initial state.
    strip.show();

    // Loop the following command forever
    // at 16fps until Arduino powers down.
    regularLoop = setInterval(function () {
      // Shift all pixels clockwise
      strip.shift(1, pixel.BACKWARD, true);
      strip.show();
    }, 1000 / 16);
  }

  function mentionedState() {
    clearInterval(regularLoop);
    strip.off();

    strip.show();
    console.log('mentionedState called');
    // Reset Colors

    strip.pixel(1).color('teal');
    strip.pixel(2).color('teal');
    strip.pixel(9).color('teal');
    strip.pixel(10).color('teal');



    mentionedLoop = setInterval(function () {
      // Shift all pixels clockwise
      strip.shift(1, pixel.FORWARD, true);
      strip.show();
    }, 1000 / 16);

    setTimeout(offLights, 2800);
    setTimeout(regularState, 3000);
  }

  function offLights() {
    strip.off();
  }

});