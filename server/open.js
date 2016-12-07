var _ = require('underscore');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var shell = require('shelljs');
var open = require("open");

module.exports = function(req, res) {
    var words = req.body.script.split(" ");
    
    words = words.map(function(w) {
        return w.toLowerCase();
    })

    console.log('inside open.js', words);
    if(_.contains(words, "browser")) {
        open('http://www.google.com');
    } else if (_.contains(words, "youtube")) {
        open('http://www.youtube.com');
    } else if (_.contains(words, "folder") || _.contains(words, "explorer")) {
        exec('start "" "d:\\My Work"');
    } else {
        return res.json({'msg': 'I did not understand your command'});
    }

    return res.json({'msg': 'your command is executed, sir!'});
}