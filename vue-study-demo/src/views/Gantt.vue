<template>
    <div>
        <div ref="ganttBox" class="ganttbox-container"></div>
    </div>
</template>
<script>
    import { gantt } from 'dhtmlx-gantt'
    export default {
        data () {
            return {
                cloumns : [],
                datas : {},
            }
        },
        mounted () {
            fetch("https://www.fastmock.site/mock/7f143c4ab35b8dbc46edbcc32c83547a/ty/gantt")
            .then(resp => resp.json())
            .then(resp => {
                this.cloumns = resp.COLUMNS;
                this.datas = resp.ITEMS[0]
                return Promise.resolve({cloumns : this.cloumns, datas : this.datas})
            }).then((resp) => {
                let {cloumns, datas} = resp;
                //初始化事件
                this.$_initGanttEvents();

                gantt.config.date_format = "%Y-%m-%d %H:%i";
                gantt.config.start_date = '2019-07-22 00:00'
                gantt.config.end_date = '2019-08-22 00:00'

                gantt.config.columns = cloumns
                // gantt.config.columns =  [
                //     {name:"text", label:"Task name", width:"*", min_width: 150,  tree:true},
                //     {name:"start_date", label:"Start time", width:150 },
                //     {name:"end_date", label:"end time", width:150 },
                //     {name:"duration",   label:"Duration",   width:120 }
                // ];
                gantt.init(this.$refs.ganttBox);
                gantt.parse(datas);
                // gantt.parse({
                //     data: [
                //         {id: 1, text: "Project #1", start_date: null, duration: null, parent:0, progress: 0, open: true, type:'milestone'},
                //         {id: 2, text: "Task #1", start_date: "2019-08-01 00:00", duration:5, parent:1, progress: 1},
                //         {id: 3, text: "Task #2", start_date: "2019-08-06 00:00", duration:2, parent:1, progress: 0.5},
                //         {id: 4, text: "Task #3", start_date: null, duration: null, parent:1, progress: 0.8, open: true},
                //         {id: 5, text: "Task #3.1", start_date: "2019-08-09 00:00", duration:2, parent:4, progress: 0.2},
                //         {id: 6, text: "Task #3.2", start_date: "2019-08-11 00:00", duration:1, parent:4, progress: 0}
                //     ],
                //     links:[
                //         {id:1, source:2, target:3, type:"0"},
                //         {id:2, source:3, target:4, type:"0"},
                //         {id:3, source:5, target:6, type:"0"}
                //     ]
                // });
            })

        },
        methods : {
            $_initGanttEvents: function () {
                if(gantt.$_eventsInitialized)
                    return;
                gantt.attachEvent('onTaskSelected', (id) => {
                    let task = gantt.getTask(id)
                    this.$emit('task-selected', task)
                    console.log('task-selected');
                })

                gantt.attachEvent('onAfterTaskAdd', (id, task) => {
                    this.$emit('task-updated', id, 'inserted', task)
                    console.log('task-updated_inserted');
                    task.progress = task.progress || 0
                    if(gantt.getSelectedId() == id) {
                        // console.log('task-selected');
                        this.$emit('task-selected', task)
                    }
                })

                gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
                    this.$emit('task-updated', id, 'updated', task)
                    console.log('task-updated_updated');
                })

                gantt.attachEvent('onAfterTaskDelete', (id) => {
                    this.$emit('task-updated', id, 'deleted')
                    console.log('task-updated_deleted');
                    if(!gantt.getSelectedId()) {
                        this.$emit('task-selected', null)
                    }
                })

                gantt.attachEvent('onAfterLinkAdd', (id, link) => {
                    this.$emit('link-updated', id, 'inserted', link)
                    console.log('link-updated_inserted');
                })

                gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
                    this.$emit('link-updated', id, 'updated', link)
                    console.log('link-updated_updated');
                })

                gantt.attachEvent('onAfterLinkDelete', (id, link) => {
                    this.$emit('link-updated', id, 'deleted')
                    console.log('link-updated_deleted');
                })

                gantt.attachEvent('onTaskDblClick', (id, task) => {
                    console.log(id, task);
                    gantt.showLightbox(id);
                })
                gantt.$_eventsInitialized = true;
            }
        }
    }
    /**
     * 老数据
     * **/
    // gantt.config.xml_date = "%Y-%m-%d %H:%i";
    // gantt.init("gantt_here");
    // gantt.parse({
    //     data: [
    //         {id: 2, text: "Task #1", start_date: "2019-08-01 00:00", duration:5, progress: 1},
    //         {id: 3, text: "Task #2", start_date: "2019-08-06 00:00", duration:2, progress: 1},
    //         {id: 5, text: "Task #3.1", start_date: "2019-08-09 00:00", duration:2, progress: 1},
    //         {id: 6, text: "Task #3.2", start_date: "2019-08-11 00:00", duration:1, progress: 1},
    //     ],
    // });
</script>
<style>

    /*@import "~dhtmlx-gantt/codebase/sources/skins/dhtmlxgantt_broadway.css";*/
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
    .ganttbox-container{
        min-height: 500px;

    }
</style>
