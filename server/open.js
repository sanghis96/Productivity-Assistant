var _ = require('underscore');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var shell = require('shelljs');
var open = require("open");
var path = require('path')
module.exports = function(req, res) {
    var words = req.body.script.split(" ");
    words = words.map(function(w) {
        return w.toLowerCase();
    })
    console.log('inside open.js', words);
    if(_.contains(words, "browser")) {
        open('http://www.google.com');
        return res.json({'msg': 'A browser is opened!'});
    } else if (_.contains(words, "youtube")) {
        open('http://www.youtube.com');
        return res.json({'msg': 'youtube website opened!'});
    } else if (_.contains(words, "folder") || _.contains(words, "explorer")) {
        exec('start "" "d:\\"');
        return res.json({'msg': 'explorer is open now!'});
    } else if (_.contains(words, "work") && _.contains(words, "environment")) {
        console.log('bat file path is ', path.join(__dirname, '../env.bat'));
        //exec(path.join(__dirname, '../env.bat'), function() {
         spawn('cmd.exe', ['/c', path.join(__dirname, '../env.bat') ]);   
        //});
        return res.json({'msg': 'Your work environment is ready now!'});
    } else {
        return res.json({'msg': 'I did not understand your command'});
    }

    
}