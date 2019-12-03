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
            default : 'aside_tree'
        },
        datas : {
            type : Array,
            default : () => []
        }
    },
    mounted() {
        tree = new Tree(this.$refs[this.id], {
            keyNavigation: true,
            editing: true,
            css: "style_one"
        });
        tree.data.parse(this.datas);
        let self = this
        //点击树的某一项
        tree.events.on("itemClick", function (id, e) {
            if (id == 1) {
                self.viewType = 'gantt';
            }
            if (id == 2) {
                self.viewType = 'go';
            }
            if (id == 3) {
                self.viewType = 'to';
            }
        })
        this.treeEventsInit();
    },
    methods : {
        treeEventsInit () {
            tree.events.on("ItemDblClick", function(id, e){
                tree.data.update(id, {opened: !tree.data.getItem(id).opened})
            });

            tree.events.on("itemContextMenu", function(id, e){
                console.log(e)
                let myContextMenu = new ContextMenu({
                    items: [
                        {id: "itemText"},
                        {type: "separator"},
                        {id: "cut", text: "Cut"},
                        {id: "copy", text: "Copy"},
                        {id: "paste", text: "Paste"}
                    ]
                })
                for (let prop in myContextMenu) {
                    console.log(prop + " : " + myContextMenu[prop]);
                }
                console.log("====================================")
                for (let prop in tree) {
                    // console.log(prop)
                }
            });
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
