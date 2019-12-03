<template>
<div id="okko" ref="okko">112</div>
</template>

<script>
    import {Tree} from 'dhx-tree';
    import * as lib from './libs'
    import {TreeGrid} from "dhx-treegrid";
    var dataset = [
        {
            "value": "Books",
            "id": "books",
            "opened": true,
            "items": [
                {
                    "value": "History",
                    "id": "history",
                    "items": [{
                        "value": "John Mack Faragher",
                        "id": "jmf"
                    },
                        {
                            "value": "Jim Dwyer",
                            "id": "jd"
                        },
                        {
                            "value": "Larry Schweikart",
                            "id": "ls"
                        }
                    ]
                },
                {
                    "value": "Fiction & Fantasy",
                    "id": "fantasy",
                    "items": [{
                        "value": "Audrey Niffenegger",
                        "id": "af"
                    },
                        {
                            "value": "Philip Roth",
                            "id": "pr"
                        }
                    ]
                },
                {
                    "value": "Teens",
                    "id": "teens",
                    "items": [{
                        "value": "Joss Whedon",
                        "id": "jw"
                    },
                        {
                            "value": "Meg Cabot",
                            "id": "mc"
                        },
                        {
                            "value": "Garth Nix",
                            "id": "gn"
                        }
                    ]
                }
            ]
        }
    ];
    export default {
        name: "tree",
        created(){
        },
        mounted() {
            var tree = new Tree(this.$refs.okko, {
                keyNavigation: true,
                checkbox: true,
                editing: true,
                icon: {
                    folder: "fas fa-book",
                    openFolder: "fas fa-book-open",
                    file: "fas fa-file"
                }
            });
            tree.data.parse(dataset);
            tree.events.on("itemContextMenu", function(id, e){
                console.log("The item with the id "+ id +" was right-clicked.");
            });
        }
    }
</script>

<style scoped>
@import '~dhx-tree/codebase/tree.min.css';
</style>
