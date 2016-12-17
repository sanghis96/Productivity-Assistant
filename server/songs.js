var _ = require('underscore');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var shell = require('shelljs');
var open = require("open");
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var google = require('google');


module.exports = function(req, res) {
    var words = req.body.script.split(" "), keywords, where;
    
    var keywords = words.map(function(w) {
        return w.toLowerCase();
    }).join(" ");

    console.log('inside songs.js', keywords);
    if(_.contains(words,'play')){
        keywords = keywords.replace('play','');
    }
    google.resultsPerPage = 5
    var nextCounter = 0 
    google(keywords +' on youtube', function (err, resp, next){
      if (err){
        return res.json({'msg': 'Sorry could not find this song'});
      } 
      //console.log(' pretty',resp.links);
      var link = resp.links[0];
      console.log("Print links ", link.href);
      open(link.href);
      return res.json({'msg': 'Song will play shortly'});
    });
}