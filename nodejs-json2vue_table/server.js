const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { generateHtml, generateJs } = require('./mergeHtJs')
const { converter } = require('./lib/json2html')
const { exeCommand } = require('./exec')
var qs = require('querystring');
const { defaultProjectName } = require('./constant');
const os = require("os");
let {baseMain} = require('./vueTemp');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    console.log(req.url);
    res.writeHead(200, {'Content-Type' : 'text/html'})
    //分发请求，如果是html请求直接返回
    if (pathname.indexOf('.html') > -1) {
        fs.readFile('.' + path.sep + pathname, 'utf-8', (err, data) => {
            if (err) throw err;
            res.end(data);
        })

    } else if (pathname.indexOf('generate') > -1)  {
        let body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });
        console.log(req.method);
        console.log(new Set([1,2,3,4]));
        req.on('end', function () {
            // var post = qs.parse(JSON.parse(body));
            // console.log(JSON.parse(body));
            let post = JSON.parse(body);
            let htmlContent = converter(generateHtml(JSON.parse(post))).nodejsRender();
            let jsContent = generateJs(JSON.parse(post));

            let vueHtmlContent = `<template>
                    ${htmlContent}
                </template>`;
            let vueJsContent = `<script>
                    ${jsContent}
                </script>`


            exeCommand("src" + path.sep + "App", vueHtmlContent + vueJsContent, function () {
                fs.writeFile(os.homedir() + path.sep + defaultProjectName + path.sep + "src" + path.sep + "main.js", baseMain(), (error) => {
                    if (error) throw error;
                    console.log("main.vue has been update")
                })
            });
        });
        res.end("receive success!")
    } else {

        res.end();
    }
}).listen(3000)

function addUItoMain () {

}
