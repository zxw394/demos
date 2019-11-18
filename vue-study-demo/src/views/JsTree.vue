<template>
    <div id="container">
        <div id="demo"></div>
    </div>
</template>

<script>
import $ from 'jquery';
import jstree from 'jstree'
import jstreegrid from 'jstreegrid'
export default {
    name: "JsTree",
    mounted () {
        fetch("https://www.fastmock.site/mock/7f143c4ab35b8dbc46edbcc32c83547a/ty/api").then((resp) => {
            return resp.json()
        }).then(res => {
            // this.desc = res.length;
            $('#demo').jstree({
                core : res,
                grid: {
                    columns: [
                        { width: 300, header: "目录", value: function () {return "目录"}},
                        { width: 150, header: "内容1", value: "内容1" },
                        { width: 150, header: "内容2", value: "内容2" }
                    ]
                },
                plugins : ['contextmenu', 'dnd', 'search', 'grid']
            })
        })
        .catch(() => {
            console.log("generator failed");
        })
    },
    // destroyed() {
    //     $('#demo').remove()
    // }
}
</script>

<style scoped>

</style>
