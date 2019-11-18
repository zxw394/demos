const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const os = require("os");
const qs = require('querystring');

const { generateHtml, generateJs } = require('../utils/HtJsGenerator')
const { converter } = require('../utils/json2html')
const { exeCommand } = require('../utils/exec')

const { defaultProjectName } = require('../utils/constant');
const { vueInstTemp } = require('../template_str/vueTemp')

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    res.writeHead(200, {'Content-Type' : 'text/html'})
    //分发请求，如果是html请求直接返回
    if (pathname.indexOf('.html') > -1) {
        fs.readFile('..' + path.sep + '..' + path.sep + pathname, 'utf-8', (err, data) => {
            if (err) throw err;
            res.end(data);
        })

    } else if (pathname.indexOf('generate') > -1)  {
        let body = '';
        //获取数据
        req.on('data', function (data) {
            body += data;
        });
        //处理数据
        req.on('end', function () {
            // var post = qs.parse(JSON.parse(body));
            // console.log(JSON.parse(body));
            let post = JSON.parse(body);
            let pathStr = post.path;//要么不填，填了就按填的来
            let config = JSON.parse(post.config);
            let htmlContent = converter(generateHtml(config)).nodejsRender();
            let jsContent = vueInstTemp(generateJs(config));
            let vueHtmlContent = `<template>
                    ${htmlContent}
                </template>`;
            let vueJsContent = `<script>
                    ${jsContent}
                </script>`
            let proJectPath = os.homedir() + path.sep + defaultProjectName;
            //如果项目已存在--则生成文件可以是指定路径
            if (fs.existsSync(proJectPath)) {
                if (pathStr && pathStr.indexOf(".") > -1 || !pathStr) {
                    fs.writeFile(proJectPath + path.sep + (pathStr ? pathStr : ("src" + path.sep + "App.vue")), vueHtmlContent + vueJsContent, (error) => {
                        if (error) throw error;
                        console.log('The file has been generated!');
                    })
                }
                if (pathStr && pathStr.indexOf(".") === -1) {
                    res.writeHead(401, {'Content-Type' : 'text/plain;charset=utf-8'}).end("路径格式不对")
                    return false;
                }
            }
            //如果项目不存在--生成文件是App.vue
            if (!fs.existsSync(proJectPath)) {
                exeCommand(proJectPath + path.sep + "src" + path.sep + "App.vue", vueHtmlContent + vueJsContent);
            }
            res.end("receive success!")
        });

    } else {
        res.end("no this path");
    }
}).listen(3000)

