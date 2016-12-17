var _ = require('underscore');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var shell = require('shelljs');
var open = require("open");
var path = require('path');
var glob = require('glob');
var fs = require('fs');


module.exports = function(req, res) {
    var words = req.body.script.split(" "), keywords, where;
    
    var sentence = words.map(function(w) {
        return w.toLowerCase();
    }).join(" ");

    console.log('inside remind.js', sentence);

    var index = sentence.lastIndexOf("in 5 minutes");

    if(index !== -1) {
        keywords = sentence.substring(0, index -1);
        keywords = keywords.replace('remind me to','');

        fs.writeFileSync('server\\note.txt', keywords);

        setTimeout(function() {
            console.log('executing play command');
            exec('start "" "server\\rooster.mp3"');
            exec('start "" "server\\note.txt"');
        }, 10000)
    }

    return res.json({'msg':'Alarm is set'});

    
}