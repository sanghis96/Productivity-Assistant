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

    console.log('inside search.js', sentence);

    var index = sentence.lastIndexOf("on");

    if(index !== -1) {
        keywords = sentence.substring(0, index -1);
        keywords = keywords.replace('search for','');

        where = sentence.substring(index+2).trim();
    }

    console.log('indexes', where, index);
    
    if(where === 'google') {
        open('http://www.google.com/#q=' + keywords.split(" ").join("+"));
        return res.json({'msg': 'google search with keywords "' + keywords + '" is open now'});
    } else  if(where === 'youtube') {
        open('http://www.youtube.com/results?search_query=' + keywords.split(" ").join("+"));
        return res.json({'msg': 'youtube search with keywords "' + keywords + '" is open now'});
    }  /*else  if(where === 'my machine') {
        where = where.replace('file','');
        var files = glob.sync(where, {'cwd': 'D:\\'})
        console.log('files are', files);
        exec('start "" "'+files[0]+'"');
        return res.json({'msg': 'youtube search with keywords "' + keywords + '" is open now'});
    }*/ else {
        return res.json({'msg': 'I did not understand your command'});
    }

    
}