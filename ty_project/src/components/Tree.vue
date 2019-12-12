<template>
    <div :ref="id"></div>
</template>
<script>
import {Tree, ContextMenu, TreeCollection} from "dhx-tree";
let tree;
export default {
    name: "Tree.vue",
    props : {
        id : {
            type : String,
            default : 'default_tree'
        },
        datas : {
            type : Array,
            default : () => []
        },
        afterClickedCb : {
            type : Function,
            default : function () {}
        },
    },
    beforeCreate(){

    },
    created(){
    },
    beforeMount(){
    },
    mounted() {
        tree = new Tree(this.$refs[this.id], {
            keyNavigation: true,
            editing: true,
        });
        tree = new Tree(this.$refs[this.id], {
            keyNavigation: true,
            editing: true,
        });
        this.treeEventsInit();
        tree.data.parse(this.datas);
    },
    methods : {
        treeEventsInit () {
            let vueInst = this;
            //双击树的某一项
            tree.events.on("ItemDblClick", function(id, e){
                tree.data.update(id, {opened: !tree.data.getItem(id).opened})
            });
            //点击树的某一项
            tree.events.on("itemClick", function (id, e) {
                console.log("click");
                vueInst.afterClickedCb(tree, id, e);
            })
            //右键点击树的某一项
            // tree.events.on("itemContextMenu", function(id, e){
            //     console.log(e)
            //     let myContextMenu = new ContextMenu({
            //         items: [
            //             {id: "itemText"},
            //             {type: "separator"},
            //             {id: "cut", text: "Cut"},
            //             {id: "copy", text: "Copy"},
            //             {id: "paste", text: "Paste"}
            //         ]
            //     })
            // });
        },
    }
}
</script>

<style scoped>
@import '~dhx-tree/codebase/tree.min.css';
/deep/.dhx_tree-list-item__icon{
    color : #161e3a
}
/deep/.dhx_tree-list-item__text{
    color : #161e3a
}
</style>
