var _ = require('underscore');
var open = require("open");
var path = require('path');

var validOperations = {
    "into":4,
    "divided":3,
    "+":2,
    "minus":1
}

module.exports = function(req, res) {
    var words = req.body.script.split(" "), keywords, where;
    
    var firstInput = parseInt(words[words.length -3]);
    var giveOperation = words[words.length -2];
    var secondInput = parseInt(words[words.length -1]);


    console.log("Calculating  "+ firstInput +' and '+ secondInput + 'operation '+ giveOperation);
    
    var results = calculation(validOperations[giveOperation],firstInput,secondInput);
    if(!_.isNull(results)){
        return res.json({'msg': results});
    }else{
        return res.json({'msg': 'I did not understand your command'});
    }
}

function calculation(operation, inputOne,inputTwo){
    if(operation == 1){
        return inputOne - inputTwo;
    }
    if(operation == 2){
        return inputOne + inputTwo;   
    }
    if(operation == 3){
        return inputOne / inputTwo;
    }
    if(operation == 4){
        return inputOne * inputTwo;
    }

}