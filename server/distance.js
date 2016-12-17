var _ = require('underscore');
var open = require("open");
var path = require('path');
var google = require('google');
var distance = require('google-distance');

module.exports = function(req, res) {
    var words = req.body.script.split(" "), keywords, where;
    
    var from = words[words.length -3];
    var to = words[words.length -1];

    console.log("Calculating distance between "+ from +' and '+ 'to');
    
    if(!_.isEmpty(from) && !_.isEmpty(to) ){
        distance.get({
                        origin: from,
                        destination: to
                      },function(err, data) {
                        if (err){
                            return res.json({'msg': 'I did not understand your command'});
                        } 
                        var generateOutput = 'Distance between '+ from + ' and ' +to +' is '+ data.distance + '.';
                        generateOutput += 'Driving time will be ' + data.duration;
                        return res.json({'msg': generateOutput});
                    });
    }else {
        
        return res.json({'msg': 'I did not understand your command'});
    }

    
}