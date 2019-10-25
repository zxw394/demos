const { defaultProjectName } = require('./constant');
const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path")

function exeCommand (fileName, data, callback) {
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

        fs.writeFile(os.homedir() + path.sep + defaultProjectName + path.sep + `${fileName}.vue`, data, (error) => {
            if (error) throw error;
            console.log('The file has been generated!');
        })
        if (callback) callback();
    })
}

module.exports = {
    exeCommand
};
