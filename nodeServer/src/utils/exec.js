const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path")

const { mainjsTemp } = require('../template_str/vueTemp');
const { defaultProjectName } = require('../../constant');
const presetFileName = 'preset.json'
//基于此项目的preset的路径
const presetFilePath = '../config/' + presetFileName


function exeCommand (file, data) {
    //生成preset文件，其它情况不用考虑； vue create --preset必要的
    presetFileCreated(presetFilePath);

    //在用户目录下生成vue项目
    const result = exec("vue create --preset " + presetFileName + " " + defaultProjectName, { cwd : os.homedir() })

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
        // let mainjsPath = os.homedir() + path.sep + defaultProjectName + path.sep + "src" + path.sep + "main.js"
        // fs.writeFile(mainjsPath, mainjsTemp(), (error) => {
        //     if (error) throw error;
        //     console.log("main.js has been update")
        // })
        //2,创建[file].vue
        fs.writeFile(file, data, (error) => {
            if (error) throw error;
            console.log(file + ".vue has been created")
        })
        //3,删除preset
        presetFileDeleted()
    })
}
//vue cli preset 文件生成
function presetFileCreated (filePath) {
    if (!fs.existsSync(os.homedir() + path.sep + presetFileName))
        fs.writeFileSync(os.homedir() + path.sep + presetFileName, fs.readFileSync(filePath, 'utf-8'))
    else
        return false
}

//vue cli preset 文件删除
function presetFileDeleted () {
    fs.unlink(os.homedir() + path.sep + presetFileName, (err) => {
        if (err) console.error(err)
    })
}

module.exports = {
    exeCommand
};
