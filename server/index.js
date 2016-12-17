/*
Parse the transcript
Find out the relevant words to identify a command
Execute the command
Return response
*/

var _ = require('underscore');



module.exports = function(req, res) {

    console.log('inside open.js', req.body.script);

    var words = req.body.script.split(" ");
    words = words.map(function(w) {
        return w.toLowerCase();
    })

    // Anything related to open command will be handled here. E.g. 'open youtube, open folder etc.'
    if(_.contains(words,"")){
        return res.json({'msg': ''});
    }else if(_.contains(words, "open")) {
        console.log('Identified open keyword');
        require('./open.js')(req, res);
    } else if(_.contains(words, "search")) {
        console.log('Identified search keyword');
        require('./search.js')(req, res);
    }  else if(_.contains(words, "hi") || _.contains(words, "hello")) {
        console.log('Identified hi keyword');
        return res.json({'msg': 'Hi! what can I do for you ?'});
    }else if (_.contains(words,"introduce")) {
        console.log('Identified who are you?');
        return res.json({'msg': 'Hello, I am productivity assistant. I can automate your day to day common tasks'});
    }else if(_.contains(words,"joke")){
        console.log('Telling joke');
        return res.json({'msg': '"How many programmers does it take to change a light bulb? None. It is a hardware problem.'});
    }else{
        return res.json({'msg': 'Sorry, I did not understand your command, can you please repeat'});
    }
}