/*
Parse the transcript
Find out the relevant words to identify a command
Execute the command
Return response
*/

var _ = require('underscore');
var exec = require('child_process').exec;
var request = require('request');

module.exports = function(req, res) {

    console.log('inside open.js', req.body.script);

    var words = req.body.script.split(" ");
    console.log('before',words);
    words = words.map(function(w) {
            return w.toLowerCase();
    })
    words = _.without(words, 'lara');
    console.log('after',words);
    

    // Anything related to open command will be handled here. E.g. 'open youtube, open folder etc.'
    if(_.contains(words, "open")) {
        console.log("Robot started listening");
        console.log('Identified open keyword');
        require('./open.js')(req, res);
    } else if(_.contains(words, "search")) {
        console.log('Identified search keyword');
        require('./search.js')(req, res);
    }  else if(_.contains(words, "hi") || _.contains(words, "hello")) {
        console.log('Identified hi keyword');
        return res.json({'msg': 'Hi! what can I do for you ?'});
    } else if (_.contains(words,"introduce")) {
        console.log('Identified who are you?');
        return res.json({'msg': 'Hello, I am a productivity assistant. You can call me Lara. I am here to automate you simple daily tasks'});
    } else if(_.contains(words,"remind")){
        console.log('idnentified reminder keyword');
       require('./remind.js')(req,res);        
    } else if(_.contains(words,"joke")){
        console.log('Telling joke');
        //http://api.icndb.com/jokes/random
        require('./jokes.js')(req,res);
    }else if(_.contains(words,"calculate")){
        // calculate.js
        require('./calculate.js')(req, res);
    }else if(_.contains(words,"distance")){
        require('./distance.js')(req, res);
    }else  if(_.contains(words,"play")){
        require('./songs.js')(req, res);
    }else {
        console.log("Json words,"+JSON.stringify(words));
        words = null;
        return res.json({'msg': ''});
    }
}