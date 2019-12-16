<template>
<!--    <div style="height: 100%;overflow: auto">-->
<!--    <button @click="criticalPath($event)">Show</button>-->
    <div ref="ganttBox" class="ganttbox-container"></div>
<!--    </div>-->
</template>
<script>
    import "@/assets/lib/gantt"
    import "@/assets/lib/critical_path"
    import "@/assets/lib/auto_scheduling"
    import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_undo";

    let updateRows = [];
    /*
    * 自定义编排
    * */
    function customizeAutoSchedule() {
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
    }

    function canDbClickShowInlineEditorConfig () {
        let mapping = {
            init: function(inlineEditors){
                gantt.attachEvent("onTaskDblClick", function (id, e) {
                    var cell = inlineEditors.locateCell(e.target);
                    if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
                        inlineEditors.startEdit(cell.id, cell.columnName);
                        return false;
                    }
                    return true;
                });
                gantt.attachEvent("onEmptyClick", function () {
                    inlineEditors.hide();
                    return true;
                });
            },
            onShow: function(inlineEditors, node){
                node.onkeydown = function (e) {
                    e = e || window.event;
                    if(e.defaultPrevented){
                        return;
                    }
                    var keyboard = gantt.constants.KEY_CODES;
                    var shouldPrevent = true;
                    switch (e.keyCode) {
                        case gantt.keys.edit_save:
                            inlineEditors.save();
                            break;
                        case gantt.keys.edit_cancel:
                            inlineEditors.hide();
                            break;
                        case keyboard.TAB:
                            if(e.shiftKey){
                                inlineEditors.editPrevCell(true);
                            }else{
                                inlineEditors.editNextCell(true);
                            }
                            break;
                        default:
                            shouldPrevent = false;
                            break;
                    }
                    if(shouldPrevent){
                        e.preventDefault();
                    }
                };
            },
            onHide: function(inlineEditors, node){}
        };
        gantt.ext.inlineEditors.setMapping(mapping);
    }

    export default {
        props: ['datas'],
        mounted () {
                var textEditor = {type: "text", map_to: "text"};
                var start_dateEditor = {type: "date", map_to: "start_date", min: new Date(2018, 0, 1),
                    max: new Date(2019, 11, 1)};
                var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};
                var end_dateEditor = {type: "date", map_to: "end_date", min: new Date(2018, 0, 1),
                    max: new Date(2019, 11, 1)}
                /*
                * 当task移动时，子任务自动编排
                * */
                gantt.config.auto_scheduling = true;
                gantt.config.auto_scheduling_strict = true;
                gantt.config.auto_scheduling_compatibility = true;
                /*
                * 设置gantt图上下限时间
                * */
                gantt.config.start_date = new Date(2018, 3, 1);
                gantt.config.end_date = new Date(2018, 5, 1);
                /*
                * 出现周末时间
                * */
                gantt.config.work_time = true;
                // gantt.config.correct_work_time = true;
                //如果时周末时间，设置列的样式
                gantt.templates.timeline_cell_class = function (task, date) {
                    if (!gantt.isWorkTime(date)) return "week_end"
                    return "";
                }

                //甘特图列宽
                gantt.config.min_column_width = 40;
                //grid和甘特图行高
                gantt.config.row_height = 25;

                /*
                grid tree的icon设置
                gantt.templates.grid_folder = function(item) {
                    return null;
                };
                gantt.templates.grid_file = function(item) {
                    return null;
                };
                * */

                /*
                 * 定义modal框内的属性
                 * */
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
                /*
                 * 定义列的配置
                 * */
                gantt.config.columns = [
                    {label: "任务名", name: "text", tree: true,width: "80", align: "left",resize: true, editor: textEditor},
                    {label: "开始日期", name: "start_date", align: "center", editor: start_dateEditor,resize: true},
                    {label: "计划工期", name: "duration", align: "center", editor: durationEditor,resize: true,},
                    {label: "结束日期", name: "end_date", align: "center", editor: end_dateEditor,resize: true,},
                    {label: "", name: "add"}
                ];

                //禁用progress
                gantt.config.drag_progress = false;
                //左边表格表头的颜色
                gantt.templates.grid_header_class = function(columnName, column){
                    return "grid_header_customer";
                };
                gantt.templates.scale_cell_class = function(date){
                    return "timeline_header_customer"
                };

                gantt.ext.inlineEditors.attachEvent("onSave", function(state){
                    let col = state.columnName;
                    updateRows.push(gantt.getTask(state.id));
                    console.log(updateRows);
                    if(gantt.autoSchedule && (col == "start_date" || col == "end_date" || col == "duration")){
                        console.log('access');
                        gantt.autoSchedule();
                    }
                });
                //双击grid单元格开始编辑（默认单击开始线上编辑）
                canDbClickShowInlineEditorConfig();

                gantt.init(this.$refs.ganttBox);
                gantt.parse(gantt_data);
        },
        methods : {
            save () {
                console.log(JSON.stringify(updateRows));
                //清空数组
                setTimeout(() => {
                    updateRows.clearArray()
                });
            },
            update(data){
                gantt.clearAll();
                gantt.parse(data)
            },
            showCriticalPath (event) {
                gantt.config.highlight_critical_path = true;
                gantt.render();
            },
            hideCriticalPath(){
                gantt.config.highlight_critical_path = false;
                gantt.render();
            },
            undo () {
                gantt.undo();
            }
        }
    }

    var gantt_data = {
        "data": [
        {"id": 11, "text": "Project #1", "type": "project", "open": true},
        {"id": 12, "text": "Task #1", "start_date": "02-04-2018", "duration": "5", "parent": "11", "open": true},
        {"id": 13, "text": "Task #2", "start_date": "03-04-2018", "type": "project", "parent": "11", "open": true},
        {"id": 14, "text": "Task #3", "start_date": "02-04-2018", "duration": "6", "parent": "11", "open": true},
        {"id": 15, "text": "Task #4", "type": "project", "parent": "11", "open": true},
        {"id": 16, "text": "Final milestone", "start_date": "15-04-2018", "type": "milestone", "parent": "11", "open": true},
        {"id": 17, "text": "Task #2.1", "start_date": "03-04-2018", "duration": "2", "parent": "13", "open": true},
        {"id": 18, "text": "Task #2.2", "start_date": "06-04-2018", "duration": "3", "parent": "13", "open": true},
        {"id": 19, "text": "Task #2.3", "start_date": "10-04-2018", "duration": "4", "parent": "13", "open": true},
        {"id": 20, "text": "Task #2.4", "start_date": "10-04-2018", "duration": "4", "parent": "13", "open": true},
        {"id": 21, "text": "Task #4.1", "start_date": "02-04-2018", "duration": "4", "parent": "15", "open": true},
        {"id": 22, "text": "Task #4.2", "start_date": "02-04-2018", "duration": "4", "parent": "15", "open": true},
        {"id": 23, "text": "Mediate milestone", "start_date": "14-04-2018", "type": "milestone", "parent": "15", "open": true}
    ],
        "links": [
        {"id": "10", "source": "11", "target": "12", "type": "1"},
        {"id": "11", "source": "11", "target": "13", "type": "1"},
        {"id": "12", "source": "11", "target": "14", "type": "1"},
        {"id": "13", "source": "11", "target": "15", "type": "1"},
        {"id": "14", "source": "23", "target": "16", "type": "0"},
        {"id": "15", "source": "13", "target": "17", "type": "1"},
        {"id": "16", "source": "17", "target": "18", "type": "0"},
        {"id": "17", "source": "18", "target": "19", "type": "0"},
        {"id": "18", "source": "19", "target": "20", "type": "0"},
        {"id": "21", "source": "15", "target": "23", "type": "0"}
    ]
    }
</script>

<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
    /*@import "~dhtmlx-gantt/codebase/skins/dhtmlxgantt_meadow.css";*/
    .ganttbox-container{
        height: 100%;
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
    .gantt_add, .gantt_grid_head_add{
        background-image:url('../assets/imgs/add-icon_01.png') !important;
    }
    .grid_header_customer{
        color:#252836 !important;
        font-weight: bold;
    }
    .timeline_header_customer{
        color:#252836 !important;
    }
    .week_end{
        background-color: #EFF5FD;
    }
</style>
