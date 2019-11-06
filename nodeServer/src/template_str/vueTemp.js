const { isArray, isObject, isBoolean } = require('../utils/json2html');

const tempStr = function (options) {
    return `export default {
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

const fetchGetStr = function (url, dName) {
    return `
    fetch ("${url}")
    .then((resp) => resp.json())
    .then((resp) => {
        this.${dName} = resp.${dName};
    })`
}
const dataStr = function (dName, dataType) {
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

const methodStr = function (mName) {
    return `${mName} : function () {
            
        },
        `
}


const mainjsTemp = function () {
    return `import Vue from 'vue';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import App from './App.vue';
    Vue.use(ElementUI);
    new Vue({
        el: '#app',
        render: h => h(App)
    });`
}
module.exports = {
    tempStr,
    mainjsTemp,
    fetchGetStr,
    dataStr,
    methodStr,
}
