var express = require('express');
var fs = require('fs');
// 使用multiparty中间件实现上传
var multiparty = require('multiparty');

// 共享文件夹根目录
var root = require('./myroot').root;
if(!fs.existsSync(root)){
    // console.log('here');
    fs.mkdirSync(root);
}

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
    var oURL = decodeURI(req.originalUrl);
    if (oURL.slice(-1) == '/'){
        res.sendfile(INDEX_PAGE);
    }else{
        res.sendfile(root + oURL);
    }
});

app.post('/*',function(req,res,next){
    var oURL = decodeURI(req.originalUrl);
    var path = root + oURL.slice(1,oURL.length);

    var form = new multiparty.Form({
        uploadDir: path
    });
    form.parse(req, function(err,fields,files){
        var filesTmp = JSON.stringify(files,null,2);
        if(err){
            console.log('parse error:'+err);
        }else{
            console.log('parse files:'+filesTmp);
            console.log('files:', files);
            var inputFile = files['fileToUpLoad'][0];
            var uploadPath = inputFile.path;
            var dstPath = path + inputFile.originalFilename;
            console.log('path',uploadPath,dstPath);
            fs.rename(uploadPath,dstPath,function(err){
                if(err){
                    console.log('rename error:'+err);
                }else{
                    console.log('rename ok');
                }
            });
            // res.redirect(path);
            res.sendfile(INDEX_PAGE);
        }
    })
    
});

var server = app.listen(3000);