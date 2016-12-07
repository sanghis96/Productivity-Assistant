var express = require('express');
var fs = require('fs');
var app = express();


app.get('/', function(req, response) {
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err; 
        }
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    })
})


app.use(express.static('web'));

app.listen(8000, function() {
    console.log('Server ready and listening on port : 8000');
})









/*       
    http.createServer(function(request, response) {  

    }).listen(8000);
});*/