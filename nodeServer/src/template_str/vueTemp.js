const { isArray, isObject, isBoolean } = require('../utils/json2html');

const vueInstTemp = function (options) {
    return `
    export default {
        data () {
            return {
            ${options.dataContent ? options.dataContent : ''}
            }
        },
        created () {
            ${options.createdContent ? options.createdContent : ''}
        },
        methods : {
            ${options.methodsContent ? options.methodsContent : ''}
        }
    }`
}

const vueInstFetchStr = function (url, dName) {
    return `
    fetch ("${url}")
    .then((resp) => resp.json())
    .then((resp) => {
        this.${dName} = resp.${dName};
    })`
}

const vueInstDataTemp = function (dName, dataType) {
    if (dataType === undefined) {
        return `${dName},`;
    }
    let data = ''
    if (isArray(dataType)) {
        data = '[]'
    } else if (isObject(dataType)) {
        data = '{}'
    } else if (isBoolean(dataType)) {
        data = dataType
    }
    return `${dName} : ${data},`
}

const vueInstMethodTemp = function (mName) {
    return `${mName} : function () {
            
        },
        `
}
module.exports = {
    vueInstTemp,
    vueInstFetchStr,
    vueInstDataTemp,
    vueInstMethodTemp,
}
