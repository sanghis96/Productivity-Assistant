var _ = require('underscore');
var request = require('request');

var randomeJokeStore = {
  "1":"A system administrator has 2 problems: First - dumb users Second smart users",
  "2":"If you understand English, press 1. If you do not understand English, press 2.",
  "3":"How many programmers does it take to change a light bulb? None. It's a hardware problem.",
  "4":"Why do Java developers wear glasses? Because they can't C sharp",
  "5":"Why do Java developers wear glasses? Because they can't C sharp",
  "6":"Why do Java developers wear glasses? Because they can't C sharp",
  "7":"8 bytes walk into a bar, the bartenders asks 'What will it be?'One of them says, 'Make us a double.'",
  "8":"There's a band called 1023MB. They haven't had any gigs yet.",
  "9":"A SEO couple had twins. For the first time they were happy with duplicate content.",
  "10":"A SEO couple had twins. For the first time they were happy with duplicate content."
}
module.exports = function(req, res) {
    var jokeNumber = Math.floor((Math.random() * 10) + 1) +'';
    console.log(randomeJokeStore[jokeNumber]);
    return res.json({'msg': ' '+ randomeJokeStore[jokeNumber]});
}