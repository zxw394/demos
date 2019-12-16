<template>
    <div ref="tree_demo"></div>
</template>
<script>
import {Tree} from 'dhx-tree';
let tree;
let id = "ty" + new Date().getTime();
export default {
    name: "Tree.vue",
    props : {
        // id : {
        //     type : String,
        //     default : 'default_tree'
        // },
        datas : {
            type : Array,
            default : () => []
        },
        afterClickedCb : {
            type : Function,
            default : function () {}
        },
    },
    data () {
        return {
            id : id
        }
    },
    beforeCreate(){
        console.log("beforeCreate !!!!!!!")
    },
    created(){
    },
    beforeMount(){
    },
    mounted() {
        if (tree) tree = undefined;
        console.log(tree);
        tree = new Tree(this.$refs['tree_demo'], {
            keyNavigation: true,
            // editing: true,
        });
        // this.treeEventsInit();
        tree.data.parse(this.datas,"json");
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
        destructor () {
            setTimeout(()=>{console.log(tree)}, 2000);
        },
        reload (data) {
            tree.data.parse(data,"json")
        },
        update (data) {
            tree.data.parse([
                {
                    value: "project",
                    id: "project",
                    opened: true,
                    items: [
                        {
                            value: "000",
                            id: "history",
                            items: [
                                {
                                    value: "task1",
                                    id: "1"
                                },
                                {
                                    value: "task2",
                                    id: "2"
                                },
                                {
                                    value: "task3",
                                    id: "3"
                                }
                            ]
                        },
                        {
                            value: "111",
                            id: "fantasy",
                            items: [
                                {
                                    value: "task4",
                                    id: "af"
                                },
                                {
                                    value: "task5",
                                    id: "pr"
                                }
                            ]
                        },
                        {
                            value: "222",
                            id: "teens",
                            items: [
                                {
                                    value: "task6",
                                    id: "jw"
                                },
                                {
                                    value: "task7",
                                    id: "mc"
                                },
                                {
                                    value: "task8",
                                    id: "gn"
                                }
                            ]
                        }
                    ]
                }
            ], "json");
            // tree.paint();
        }
    },
    // destroyed() {
    //     console.log("destroyed ~~~~~ ");
    //     console.log(tree);
    // }
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
