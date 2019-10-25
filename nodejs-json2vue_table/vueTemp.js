const tempStr = function (url, interfaceName) {
    return `export default {
        data () {
            return {
                items : []
            }
        },
        created () {
            fetch("${url}", {
                //body : ${interfaceName}
            }).then((resp) => resp.json())
            .then((resp) => {
                this.items = resp.items
            })
        }
    }`
}
const baseMain = function () {
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
    baseMain
}
