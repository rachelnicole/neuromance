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

var testStr = "hello yes cool /"00ff00/" "

// var stream = T.stream('statuses/filter', { track: '#rachelhandtest', language: 'en' })

// stream.on('tweet', function (tweet) {
//   console.log("tweet has been mentioned");
//   console.log(tweet.text);
//   var regEx = new RegExp("(.*?)");
//   var colorPull = regEx.exec(tweet.text);
//   console.log(colorPull);

//   mentionedState();
// });

console.log(testStr);