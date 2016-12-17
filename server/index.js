/*
Parse the transcript
Find out the relevant words to identify a command
Execute the command
Return response
*/

var _ = require('underscore');
var request = require('request');



module.exports = function(req, res) {

    console.log('inside open.js', req.body.script);

    var words = req.body.script.split(" ");
    words = words.map(function(w) {
        return w.toLowerCase();
    })

    // Anything related to open command will be handled here. E.g. 'open youtube, open folder etc.'
    console.log("Robot started listening");
    if(_.contains(words, "open")) {
        console.log('Identified open keyword');
        require('./open.js')(req, res);
    } else if(_.contains(words, "search")) {
        console.log('Identified search keyword');
        require('./search.js')(req, res);
    }  else if(_.contains(words, "hi") || _.contains(words, "hello")) {
        console.log('Identified hi keyword');
        return res.json({'msg': 'Hi! what can I do for you ?'});
    }else if (_.contains(words,"introduce") || _.contains(words,"introduced") ) {
        console.log('Identified who are you?');
        return res.json({'msg': 'Hello, I am productivity assistant. You can call me John. I can automate your day to day common tasks'});
    }else if(_.contains(words,"joke")){
        console.log('Telling joke');
        //http://api.icndb.com/jokes/random
        request('http://api.icndb.com/jokes/random', function (error, response, body) {
            var data = JSON.parse(body);
            console.log("response", data.value.joke);
            return res.json({'msg': ' '+ data.value.joke});
        });
        
    }else if(_.contains(words,"calculate")){
        // calculate.js
        require('./calculate.js')(req, res);
    }else if(_.contains(words,"distance")){
        require('./distance.js')(req, res);
    }else  if(_.contains(words,"play")){
        require('./songs.js')(req, res);
    }else{
        console.log("Json words,"+JSON.stringify(words));
        words = null;
        return res.json({'msg': 'Sorry'});
    }  
}