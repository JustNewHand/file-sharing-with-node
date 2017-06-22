var express = require('express');
var fs = require('fs');

// 共享文件夹根目录
var root = require('./myroot').root;
if(!fs.existsSync(root)){
    // console.log('here');
    fs.mkdirSync(root);
}

// 配置上传路径
var upload = multer({
    dest: root
})

var INDEX_PAGE = 'static/index.html';
var LOGIN_PAGE = 'static/login.html';
var ERROR_PAGE = 'static/error.html';

var app = express();

app.use('/static',express.static('static'));

app.get('/currentuser/',function(req,res){
    // TODO 当前用户
    res.send('test');
});

app.get('/list/*',function(req,res){
    var oURL = decodeURI(req.originalUrl);
    var path = root + oURL.slice(6,oURL.length);
    console.log(path);
    var dir_file_list = [];

    fs.readdir(path,function(err,files){
        if (err) {
            return console.error(err);
        }
        files.forEach( function (file){
            var lstat = fs.lstatSync(path + file);
            if (lstat.isDirectory()){
                dir_file_list.push([file,'dir']);
            }
            if (lstat.isFile()){
                dir_file_list.push([file,'file']);
            }
        });
        res.send(dir_file_list);
    });
});

app.get('/*',function(req,res){
    // res.send('Hello World!');
    
    var oURL = decodeURI(req.originalUrl);
    if (oURL.slice(-1) == '/'){
        res.sendfile(INDEX_PAGE);
    }else{
        res.sendfile(root + oURL);
    }
});

app.post('/*',upload.single('fileToUpLoad'),function(req,res){
    console.log(req.originalUrl);
    var oURL = decodeURI(req.originalUrl);
    var path = root + oURL.slice(1,oURL.length);

    // TODO 上传
    
});

var server = app.listen(3000);