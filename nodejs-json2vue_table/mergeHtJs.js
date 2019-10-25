let {makeTextFile, outerHTML, converter} = require("./lib/json2html");
let {tempStr} = require('./vueTemp');

function generateJs (pJson) {
    const urlKey = 'Type';
    const paramsKey = 'InterfaceName';
    if (pJson[urlKey]) {
        return tempStr(pJson[urlKey], pJson[paramsKey]);
    } else {
        throw 'no dataSource url';
    }
}

function generateHtml (pJson) {
    const cloumnNameKey = 'Name';
    const bindDataEntityFieldNameKey = 'ColumnName';
    const bindDataEntityFieldKey = "ColumnKey"
    const bindDataClassKey = 'ClassName';
    const bindDataEntityKey = 'EntityFieldList';

    //这个数组后面会有很多个！
    const tagTypes = ['Gridfield'];
    let pKeys = Object.keys(pJson);
    console.log(pJson, "pJson")
    //取pKeys与tagTypes都有的key（一般只有一个）
    let commonKeys = [...pKeys].filter((item) => tagTypes.some((el) => el == item));
    console.log(commonKeys, "commonKeys")
    //如果没有field属性，抛出错误
    if (!commonKeys.length) throw 'no view tag';
    //html
    if (commonKeys[0] == 'Gridfield') {//表格
        let tag = commonKeys[0];
        let cloumns = pJson[tag].map((item) => {
            return {
                cloumnName : item[cloumnNameKey],
                bindName : item[bindDataEntityKey][0][bindDataEntityFieldKey],
                listField : "items"
            }
        });
        return tableGenerator(cloumns);
    } else {
        return null;
    }
}

//table模板， 后续可能会有很多模板
function tableGenerator (cloumns) {
    let tBody = [];
    cloumns.forEach((cloumn) => {
        tBody.push({'<>': 'el-table-column', html: [''], 'prop' : cloumn.bindName, 'label' : cloumn.cloumnName})
    })
    return {
        '<>' : 'el-table',
        'html':tBody,
        'class' : "ty-table",
        ':data' : "items"
    }
}

module.exports = {
    generateHtml,
    generateJs,
}


