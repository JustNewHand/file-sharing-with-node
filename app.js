var express = require('express');
var fs = require('fs');

var app = express();

// 共享文件夹根目录
var root = "";

// app.use(express.static(path.join(__dirname,'/static')));
app.use('/static',express.static('static'));

app.get('/',function(req,res){
    // res.send('Hello World!');
    res.sendfile("static/index.html");
});

app.get('/currentuser/',function(req,res){
    // TODO 当前用户
})

app.get('/list/*',function(req,res){
    var oURL = req.originalUrl;
    var URL = oURL.slice(6,oURL.length);
    var path = root + URL;

    // TODO 从path中读取目录或文件
    

})

var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log(host,port);
});