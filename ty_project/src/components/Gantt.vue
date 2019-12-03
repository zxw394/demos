<template>
    <div>
        <div ref="ganttBox" class="ganttbox-container"></div>
    </div>
</template>
<script>
    import { gantt } from 'dhtmlx-gantt'
    let updateRows = [];
    gantt.eachSuccessor = function(callback, root){
        if(!this.isTaskExists(root))
            return;
        // remember tasks we've already iterated in order to avoid infinite loops
        var traversedTasks = arguments[2] || {};

        if(traversedTasks[root])
            return;
        traversedTasks[root] = true;
        var rootTask = this.getTask(root);
        var links = rootTask.$source;
        // console.log(links, 'links');
        if(links){
            for(var i=0; i < links.length; i++){
                var link = this.getLink(links[i]);
                console.log(link);
                if(this.isTaskExists(link.target) && !traversedTasks[link.target]){
                    callback.call(this, this.getTask(link.target));
                    // iterate the whole branch, not only first-level dependencies
                    this.eachSuccessor(callback, link.target, traversedTasks);
                }
            }
        }
    };
    //当source end_date 大于 target source_date时target的source_date自动往后移动，支持循环迭代
    gantt.eachUpdate = function (root) {
        let moveTask = gantt.getTask(root);
        let moveTaskTarget = [];

        this.getLinks().forEach((item) => {
            if (item.source == root) {
                moveTaskTarget.push(item.target);
            }
        })
        console.log(moveTaskTarget);
        if (moveTaskTarget.length) {
            moveTaskTarget.map((targetId) => {
                let target = this.getTask(targetId);
                if (moveTask.end_date.valueOf() > target.start_date.valueOf()) {
                    target.start_date = moveTask.end_date;
                    target.end_date = gantt.calculateEndDate(target.start_date, target.duration)
                    this.updateTask(target.id);
                    this.eachUpdate(target.id);
                }
            })
        }
    };

    (function(){
        let diff = 0;
        gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
            var modes = gantt.config.drag_mode;
            if(mode == modes.move){
                let modifiedTask = gantt.getTask(id);
                diff = modifiedTask.start_date - originalTask.start_date;
            }
            if(mode == modes.resize){
            }
            return true;
        });
        //rounds positions of the child items to scale
        gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
            var modes = gantt.config.drag_mode;
            if(mode == modes.move){
                gantt.eachSuccessor(function(child){
                    child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
                    child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
                    gantt.updateTask(child.id);
                }, id);
                // console.log(gantt.$data.tasksStore.getItems());//获取全部tasks数据
            }
            if(mode == modes.resize){
                gantt.eachUpdate(id)
            }
        });
    })();

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

                var textEditor = {type: "text", map_to: "text"};
                var start_dateEditor = {type: "date", map_to: "start_date", min: new Date(2018, 0, 1),
                    max: new Date(2019, 11, 1)};
                var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};
                var end_dateEditor = {type: "date", map_to: "end_date", min: new Date(2018, 0, 1),
                    max: new Date(2019, 11, 1)}

                //初始化事件
                // this.$_initGanttEvents();
                //使父级任务能拖动
                // gantt.config.drag_project = true;
                gantt.config.auto_scheduling = true;
                gantt.config.auto_scheduling_strict = true;

                gantt.config.date_format = "%Y-%m-%d %H:%i";
                gantt.config.start_date = '2019-07-30 00:00'
                gantt.config.end_date = '2019-08-20 00:00'
                //grid总宽
                gantt.config.grid_width = 400
                //grid列宽
                gantt.config.min_grid_column_width = 50;
                //甘特图列宽
                gantt.config.min_column_width = 50;
                //grid和甘特图行高
                gantt.config.row_height = 25;
                //grid tree的icon设置
                gantt.templates.grid_folder = function(item) {
                    return null;
                };
                gantt.templates.grid_file = function(item) {
                    return null;
                };
                //定义modal框内的属性 begin
                var opts = [
                    { key: 1, label: 'High' },
                    { key: 2, label: 'Normal' },
                    { key: 3, label: 'Low' }
                ];

                gantt.config.lightbox.sections = [
                    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
                    {name:"priority",    height:22, map_to:"priority", type:"select", options:opts},
                    {name:"time",        height:72, map_to:"auto", type:"duration"}
                ];
                //定义modal框内的属性 end

                gantt.config.columns = [
                    {label: "任务名", name: "text", tree: true, width: 150, align: "left",resize: true, editor: textEditor},
                    {label: "开始日期", name: "start_date", align: "center", resize: true, width: 80, editor: start_dateEditor},
                    {label: "计划工期", name: "duration", align: "center", width: 50, editor: durationEditor},
                    {label: "结束日期", name: "end_date", align: "center", resize: true, width: 80, editor: end_dateEditor},
                    {label: "", name: "add", width: 80}
                ];
                /**
                gantt.config.columns = cloumns
                gantt.config.columns =  [
                    {name:"text", label:"Task name", width:"*", min_width: 150,  tree:true},
                    {name:"start_date", label:"Start time", width:150 },
                    {name:"end_date", label:"end time", width:150 },
                    {name:"duration",   label:"Duration",   width:120 }
                ];
                var box = gantt.message({
                    type:"confirm-warning",
                    text:"Are you sure you want to do it?"
                });
                 **/

                //禁用progress
                gantt.config.drag_progress = false;
                //指定task class--主要是颜色
                gantt.templates.task_class = function () {
                    return "ty_task_color"
                }
                //左边表格表头的颜色
                gantt.templates.grid_header_class = function(columnName, column){
                    return "grid_header_customer";
                };
                gantt.templates.scale_cell_class = function(date){
                    return "timelin_header_customer"
                };

                gantt.ext.inlineEditors.attachEvent('onBeforeEditStart', function (state) {
                    return true;
                })
                gantt.ext.inlineEditors.attachEvent("onSave", function(state){
                    var col = state.columnName;
                    updateRows.push(gantt.getTask(state.id));
                    if(gantt.autoSchedule && (col == "start_date" || col == "end_date" || col == "duration")){
                        console.log('access');
                        gantt.autoSchedule();
                    }
                    // console.log(gantt.$data.tasksStore.getItems());//获取全部tasks数据
                });
                //双击task弹出框
                gantt.attachEvent('onTaskDblClick', function (id, e) {
                    console.log('双击');
                    return true;
                })

                gantt.init(this.$refs.ganttBox);
                gantt.parse(datas);
                /** gantt.parse({
                    data: [
                        {id: 1, text: "Project #1", start_date: null, duration: null, parent:0, progress: 0, open: true, type:'milestone'},
                        {id: 2, text: "Task #1", start_date: "2019-08-01 00:00", duration:5, parent:1, progress: 1},
                        {id: 3, text: "Task #2", start_date: "2019-08-06 00:00", duration:2, parent:1, progress: 0.5},
                        {id: 4, text: "Task #3", start_date: null, duration: null, parent:1, progress: 0.8, open: true},
                        {id: 5, text: "Task #3.1", start_date: "2019-08-09 00:00", duration:2, parent:4, progress: 0.2},
                        {id: 6, text: "Task #3.2", start_date: "2019-08-11 00:00", duration:1, parent:4, progress: 0}
                    ],
                    links:[
                        {id:1, source:2, target:3, type:"0"},
                        {id:2, source:3, target:4, type:"0"},
                        {id:3, source:5, target:6, type:"0"}
                    ]
                });**/
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

                gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
                    console.log("move task : " + id);
                    var task = gantt.getTask(id);
                    // if(task.parent != parent)
                    //     return false;
                    return true;
                });
                gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
                    console.log("onBeforeTaskDrag :" + id);
                    console.log("onBeforeTaskDrag :" + mode);
                    console.log("onBeforeTaskDrag :" + e);
                    //any custom logic here
                    return true;
                });
                gantt.attachEvent("onTaskDrag", function(id, mode, e){
                    console.log("onTaskDrag :" + id);
                    console.log("onTaskDrag :" + mode);
                    console.log("onTaskDrag :" + e);
                    console.log(e);
                    //any custom logic here
                    return true;
                });
                gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
                    console.log("onAfterTaskDrag :" + id);
                    console.log("onAfterTaskDrag :" + mode);
                    console.log("onAfterTaskDrag :" + e);
                    console.log(e);
                    //any custom logic here
                    return true;
                });

                gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
                    this.$emit('task-updated', id, 'updated', task)
                    console.log('task-updated_updated :' + id);
                    console.log('task-updated_updated :' + task)
                    console.log(task)
                    console.log(task.start_date + task.end_date, "onAfterTaskUpdate")
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
            },
            save () {
                console.log(JSON.stringify(updateRows));
                //清空数组
                setTimeout(() => {
                    updateRows.clearArray()
                });
            }
        }
    }
</script>
<style>
    /*@import "~dhtmlx-gantt/codebase/sources/skins/dhtmlxgantt_broadway.css";*/
    @import "../../node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css";
    .ganttbox-container{
        min-height: 400px;
    }

    html, body {
        height: 100%;
        padding: 0px;
        margin: 0px;
        overflow: hidden;
    }

    .gantt_row_project{
        font-weight: bold;
    }
    .gantt-info ul{
        line-height: 150%;
    }
    .ty_task_color{
        /*background-color:#409EFF;*/
        /*border: 1px solid #2a7dd3;*/
        background-color: #3b4156;
        border: 1px solid #161e3a;
    }
    .ty_task_color:hover{
        /*background-color: #51a7ff;*/
        /*border-color: #86c3ff;*/
        background-color: #474c5e;
        border-color: #6f7377;
    }
    .gantt_add, .gantt_grid_head_add{
        background-image:url('../assets/imgs/add-icon_01.png') !important;
    }
    .grid_header_customer{
        color:#252836 !important;
        font-weight: bold;
    }
    .timelin_header_customer{
        color:#252836 !important;
    }
</style>
