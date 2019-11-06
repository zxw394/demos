const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path")
const { mainjsTemp } = require('../template_str/vueTemp');
const { defaultProjectName } = require('../../constant');

function exeCommand (file, data) {

    //在用户目录下生成vue项目
    const result = exec("vue create -d " + defaultProjectName, { cwd : os.homedir() })

    // 捕获标准输出并将其打印到控制台
    result.stdout.on('data', function (data) {
        console.log('standard output:\n' + data);
    });
    // 捕获标准错误输出并将其打印到控制台
    result.stderr.on('data', function (data) {
        console.log('standard error output:\n' + data);
    });
    // 注册子进程关闭事件
    result.on('exit', function (code, signal) {
        console.log('child process eixt ,exit:' + code);
        //1,重写vue项目中main.js
        let mainjsPath = os.homedir() + path.sep + defaultProjectName + path.sep + "src" + path.sep + "main.js"
        fs.writeFile(mainjsPath, mainjsTemp(), (error) => {
            if (error) throw error;
            console.log("main.js has been update")
        })
        //2,创建[file].vue
        fs.writeFile(file, data, (error) => {
            if (error) throw error;
            console.log(file + ".vue has been created")
        })
    })
}

module.exports = {
    exeCommand
};
