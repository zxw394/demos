<template>
    <div id="tree_grid" class="treegridbox-container"></div>
</template>

<script>
    import {TreeGrid, TreeGridCollection, cssManager} from "dhx-treegrid"
    let treeGrid, selectedRow = [];
    export default {
        name: "TreeGrid.vue",
        props: {
            datas : {
                type : Array,
                default : () => []
            }
        },
        created(){
            console.log(treeGrid, "created")
        },
        mounted() {
            // if (!treeGrid) {
                treeGrid = new TreeGrid("tree_grid", {
                    columns: [
                        { width: 280, id: "name", header: [{ text: "名称" }] },
                        { width: 280, id: "native", type: "string", header: [{ text: "类型" }] },
                        { width: 200, id: "capital", type: "string", header: [{ text: "优先级" }] },
                        { width: 200, id: "currency", type: "string", header: [{ text: "负责人" }] }
                    ],
                    dragMode: "both",
                    editing:true,
                    // fitToContainer:true,
                    reverse:true
                    // height:"600",
                    // width:"980"
                })
            // }
            //单击每行触发，添加点击样式
            treeGrid.events.on("cellClick", function (row,column,e) {
                if (selectedRow.length) {
                    selectedRow.forEach((rowId, index) => {
                        treeGrid.removeRowCss(rowId, "rowSelected")
                        selectedRow.splice(index, 1);
                    })
                }
                treeGrid.addRowCss(row.id, "rowSelected")
                selectedRow.push(row.id);
            })
            treeGrid.data.parse(this.datas);
            console.log(treeGrid, "mounted");
            if (treeGrid) {treeGrid.paint()}
        },
        destroyed () {
            console.log("destroyed");
            selectedRow.clearArray();
            treeGrid.destructor();
            console.log(treeGrid, "destroyed");
        },
        methods : {
            change () {
                console.log(document.querySelectorAll(".dhx_tree-list-item__icon"));
                document.querySelectorAll(".dhx_tree-list-item__icon").forEach((item) => {
                    item.classList.add("treegrid_custom_icon");
                });
            }
        }
    }

</script>

<style scoped lang="less">
    @import '~dhx-treegrid/codebase/treegrid.min.css';
    .treegridbox-container{
        height:100%;
        padding:0px 10px 10px 10px;
    }
    /deep/.dxi.dxi-chevron-up:before {
        content:"\f13d";
        /*display: inline-block;*/
        /*background-image: url('../assets/imgs/add-icon_01.png');*/
        /*width:15px;*/
        /*height: 15px;*/
    }
    /deep/.dxi.dxi-chevron-down:before {
        content:"\f141";
        /*display: inline-block;*/
        /*background-image: url('../assets/imgs/add-icon_01.png');*/
        /*width:15px;*/
        /*height: 15px;*/
    }
    /deep/.rowSelected{
        background-color: #eee;
        >div:first-of-type{
            border-left: 2px solid #0288d1;
        }
    }
</style>
