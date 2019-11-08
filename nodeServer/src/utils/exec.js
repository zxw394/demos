const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path")

const { defaultProjectName } = require('../../constant');
const presetFileName = 'preset.json'
//基于此项目的preset的路径
const presetFilePath = '../config/' + presetFileName


function exeCommand (file, data) {
    //生成preset文件，其它情况不用考虑； vue create --preset必要的
    presetFileCreate(presetFilePath);

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
        //1,创建[file].vue
        fs.writeFile(file, data, (error) => {
            if (error) throw error;
            console.log(file + ".vue has been created")
        })
        //2,删除preset
        presetFileDelete()
    })
}
//vue cli preset 文件生成在用户目录
function presetFileCreate (filePath) {
    if (!fs.existsSync(os.homedir() + path.sep + presetFileName))
        fs.writeFileSync(os.homedir() + path.sep + presetFileName, fs.readFileSync(filePath, 'utf-8'))
    else
        return false
}

//vue cli preset 将用户目录的preset文件删除
function presetFileDelete () {
    fs.unlink(os.homedir() + path.sep + presetFileName, (err) => {
        if (err) console.error(err)
    })
}

module.exports = {
    exeCommand
};
