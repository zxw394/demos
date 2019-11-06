let {tempStr, fetchGetStr, dataStr} = require('../template_str/vueTemp');
let fs = require("fs");

function generateJs (pJson) {
    //这个数组后面会有很多个！
    const _tagTypes_ = ['Gridfield', 'Tyfields'];
    let pKeys = Object.keys(pJson);
    //取pKeys与tagTypes都有的key（一般只有一个）
    let commonKeys = [...pKeys].filter((item) => _tagTypes_.some((el) => el == item));
    //如果没有field属性，抛出错误
    if (!commonKeys.length) throw 'no view tag';

    if (commonKeys[0] == 'Gridfield') {
        //table
        const _urlKey_ = 'Type';
        const _paramsKey_ = 'InterfaceName';

        let dataContent = '';
        let createdContent = '';
        let methodsContent = '';
        if (pJson[_urlKey_]) {
            dataContent += dataStr("items", []);
            createdContent += fetchGetStr(pJson[_urlKey_], "items");
        }
        return {
            dataContent,
            createdContent,
            methodsContent
        };
    } else if (commonKeys[0] == 'Tyfields') {
        //form
        const _name_ = 'Name';
        const _viewName_ = 'ViewName';

        let tag = commonKeys[0];
        let dataContent = '';
        let createdContent = '';
        let methodsContent = '';
        pJson[tag].forEach((item) => {
            let bindNameResult = {}
            let bindName = item[_name_].substr(item[_name_].indexOf('.') + 1)
            bindName.split('.').reduce((acc, current, index, array) => {
                if (index === 0) bindNameResult = acc;
                if (array[array.length - 1] === current) acc[current] = ''
                else acc[current] = {}
                return acc[current];
            }, {})
            //处理Name中的属性，将类似'Org.Sport.Cyc'转化成'{Org : { Sport : { Cyc : {}}}}'
            let bindNameValue = JSON.stringify(bindNameResult).substring(1, JSON.stringify(bindNameResult).length - 1);
            dataContent += dataStr(bindNameValue);

            if (item[_viewName_]) {//如果有viewName属性 则是selectfield类型
                //selectfield需要额外定义个dialog显示属性
                dataContent += dataStr(transformDialogVisible(bindName), false)

                let data = fs.readFileSync(item[_viewName_], { 'encoding' : 'utf8' });
                let contentObj = generateJs(JSON.parse(data))
                dataContent += contentObj.dataContent;
                createdContent += contentObj.createdContent;
            }
        })
        return {
            dataContent,
            createdContent,
            methodsContent
        }
    } else {
        return "";
    }
}

function generateHtml (pJson) {
    //这个数组后面会有很多个！
    const _tagTypes_ = ['Gridfield', 'Tyfields'];
    let pKeys = Object.keys(pJson);
    //取pKeys与tagTypes都有的key（一般只有一个）
    let commonKeys = [...pKeys].filter((item) => _tagTypes_.some((el) => el == item));
    //如果没有field属性，抛出错误
    if (!commonKeys.length) throw 'no view tag';
    //html
    if (commonKeys[0] == 'Gridfield') {//表格
        //table
        const _labelName_ = 'Name';
        const _entityFieldKey_ = "ColumnKey"
        const _cloumnEntityList_ = 'EntityFieldList';

        let tag = commonKeys[0];
        let cloumns = pJson[tag].map((item) => {
            return {
                headerLabelName : item[_labelName_],
                bindName : item[_cloumnEntityList_][0][_entityFieldKey_],
                listField : "items"
            }
        });
        return tableGenerator(cloumns);
    } else if (commonKeys[0] == 'Tyfields') {//表单
        //form
        const _type_ = 'ColumnType';
        const _name_ = 'Name';
        const _viewName_ = 'ViewName';
        const _display_ = 'Display';
        const _label_ = 'Remark';
        const _item_ = 'Item';

        let tag = commonKeys[0];
        let cloumns = pJson[tag].map((item) => {
            return {
                labelName : item[_label_],
                bindName : item[_name_].substr(item[_name_].indexOf('.') + 1),//exp：Org.Name需要Name
                type : item[_type_],
                viewName : item[_viewName_],
                display : item[_display_],
                item : item[_item_]
            }
        })
        return formGenerator(cloumns);
    } else {
        return null;
    }
}

//table模板， 后续可能会有很多模板
function tableGenerator (props) {
    let tBody = [];
    props.forEach((prop) => {
        tBody.push({'<>': 'el-table-column', html: [''], 'prop' : prop.bindName, 'label' : prop.headerLabelName} )
    })
    return {
        '<>' : 'el-table',
        'html' : tBody,
        ':data' : "items"
    }
}

//form模板
function formGenerator (props) {
    const textType = 'textarea';
    const radioType = 'radioContainer';
    const selectType = 'combo';
    const complexType = 'selectfield';
    const inputType = 'textfield';

    let formElements = [];
    props.forEach((prop) => {
        let ele = {};
        if (prop.type === textType)
            ele = [ textareaGenerator(prop) ];
        else if (prop.type === radioType)
            ele = [ radioGenerator(prop) ];
        else if (prop.type === inputType)
            ele = [ inputGenerator(prop) ];
        else if (prop.type === selectType)
            ele = [ selectGenerator(prop) ];
        else if (prop.type === complexType)
            ele = complexGenerator(prop);
        formElements.push({'<>' : 'el-form-item', 'html' : ele, 'label' : prop.labelName});
    })
    return {
        '<>' : 'el-form',
        'html' : formElements,
    }
}

//input模板
function inputGenerator (prop) {
    return {
        '<>' : 'el-input',
        'html' : [''],
        'v-model' : prop.bindName
    }
}

//复合视图
function complexGenerator (prop) {
    if (!prop.viewName) throw 'complex component has no viewName property'
    //读取路径的配置文件
    let data = fs.readFileSync(prop.viewName, { 'encoding' : 'utf8' });
    return [
        {
            '<>' : 'el-input',
            'html' : [
                {
                    '<>' : 'template',
                    'html' : [{
                        '<>' : 'i',
                        'html' : [''],
                        'class' : 'el-icon-edit',
                        '@click' : transformDialogVisible(prop.bindName) + ' = true'
                    }],
                    'slot' : 'append'
                },
            ],
            'v-model' : prop.bindName
        },
        {
            '<>' : 'el-dialog',
            'html' : [generateHtml(JSON.parse(data))],
            ':visible.sync' : transformDialogVisible(prop.bindName)
        }
    ]
}

//dialog的属性
function transformDialogVisible (name) {
    return name.split('.').join('') + 'visible';
}

//选择框生成器
function selectGenerator (prop) {
    let options = prop.display.split(',').map((ele, index) => {
        return {
            '<>' : 'el-option',
            'html' : [''],
            'label' : ele,
            'value' : prop.item.split(',')[index]
        }
    })
    return {
        '<>' : 'el-select',
        'html' : options,
        'v-model' : prop.bindName
    }
}

//文本域生成器
function textareaGenerator (prop) {
    return {
        '<>' : 'el-input',
        'html' : [''],
        'v-model' : prop.bindName,
        'type' : 'textarea'
    }
}

//单选框生成器
function radioGenerator (prop) {
    let radios = prop.display.split(',').map((ele, index) => {
        return {
            '<>' : 'el-radio',
            'html' : [ele],
            'label' : prop.item.split(',')[index]
        }
    })
    return {
        '<>' : 'el-radio-group',
        'html' : radios,
        'v-model' : prop.bindName
    }
}

module.exports = {
    generateHtml,
    generateJs,
}


