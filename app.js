var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


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

app.post('/parse', function(req, res) {
    console.log(req.body);
    require('./server')(req, res);
})


app.use(express.static('web'));

app.listen(8000, function() {
    console.log('Server ready and listening on port : 8000');
})









/*       
    http.createServer(function(request, response) {  

    }).listen(8000);
});*/