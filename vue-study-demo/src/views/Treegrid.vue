<template>
    <div refs="treegrid" id="treegrid_container"></div>
</template>

<script>
    import "dhx-treegrid";
    export default {
        name: "Treegrid",
        created(){
            let treegrid = new dhx.TreeGrid("treegrid_container", {
                columns: [
                    { width: 100, id: "a", header: [{ text: "#" }] },
                    { width: 100, id: "b", header: [{ text: "Title" }] },
                    { width: 200, id: "c", header: [{ text: "Name" }] },
                    { width: 200, id: "d", header: [{ text: "Address" }] }
                ],
                headerRowHeight: 50,
                data: []
            });
        },
        mounted() {

        }
    }
</script>

<style scoped>
@import '~dhx-treegrid/codebase/treegrid.min.css';
</style>
