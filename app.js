var express = require('express');
// var path = require('path');
var app = express();

// app.use(express.static(path.join(__dirname,'/static')));
app.use('/static',express.static('static'));

app.get('/',function(req,res){
    // res.send('Hello World!');
    res.sendfile("static/index.html");
});

app.get('/currentuser/',function(){
    res.send('test');
})

var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log(host,port);
});