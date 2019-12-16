<template>
    <div ref="tree_ele"></div>
</template>
<script>
import {Tree} from 'dhx-tree';
let tree;
export default {
    name: "Tree.vue",
    props : {
        datas : {
            type : Array,
            default : () => []
        },
    },
    mounted() {
        if (tree) tree = undefined;
        tree = new Tree(this.$refs['tree_ele'], {
            keyNavigation: true,
            // editing: true,
        });
        this._treeEventsInit();
        tree.data.parse(this.datas,"json");
    },
    methods : {
        _treeEventsInit () {
            let vueInst = this;
            //双击树的某一项
            tree.events.on("itemDblClick", function(id, e){
                tree.data.update(id, {opened: !tree.data.getItem(id).opened})
            });
            //点击树的某一项
            tree.events.on("itemClick", function (id, e) {
                console.log("click");
                vueInst.$emit("onAfterClickedCb", tree, id, e);
                // return true;
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
        update (data) {
            tree.data.parse(data, "json");
        }
    },
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
