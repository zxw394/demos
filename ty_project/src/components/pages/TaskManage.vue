<template>
    <el-container style="padding: 10px;">
        <el-aside style="flex-basis:260px">
            <Card>
                <template slot="title">树型结构</template>
                <template slot="content">
                    <Tree :datas="treeDatas" id="taskmanage_tree" :afterClickedCb="treeAfterClickedCb"></Tree>
                </template>
            </Card>
        </el-aside>
        <el-main style="padding-left: 10px;padding-top: 0px;padding-right: 0px;">
            <Card ref="gantt-box">
                <template slot="title">
                    甘特图
                </template>
                <template slot="content">
                    <Gantt v-if='ganttDataLoaded' :datas="ganttDatas" ref="gantt" @task-selected="collapseGanttBox"></Gantt>
                </template>
                <template slot="operators">
                    <el-button plain class="card-header-btn" @click="criticalPathDisplayHandler">
                        <span v-if="!criticalPathDisplay">显示</span><span v-else>隐藏</span>关键路径
                    </el-button>
                    <el-button plain class="card-header-btn" @click="$refs.gantt.undo()">
                        撤销
                    </el-button>
                    <el-button plain class="card-header-btn" @click="$refs.gantt.save()">
                        保存数据 <i class="el-icon-edit-outline"></i>
                    </el-button>
                </template>
            </Card>
            <div style="margin-top: 5px;">
                <img v-if="collapseGanttBoxProp" src="@/assets/imgs/arrow-down.png" @click="expandGanttBox"/>
                <img v-else                      src="@/assets/imgs/arrow-up.png"   @click="collapseGanttBox"/>
            </div>
            <el-tabs type="border-card"  class="prop-tabs">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-document"></i> 基本属性</span>
                    <template>
                        <div style="width: 50%;float:left">
                            <h3 class="tab-title">常规属性</h3>
                            <el-table
                                    fit
                                    :show-header="false"
                                    :data="tableDatas"
                                    style="width: 100%">
                                <el-table-column
                                        prop="name">
                                </el-table-column>
                                <el-table-column
                                        prop="value">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="width:49%;float:left;margin-left: 10px">
                            <h3 class="tab-title">任务描述</h3>
                            <el-input type="textarea"
                                      :autosize="{ minRows: 6}"></el-input>
                            <h3 class="tab-title">验收标准</h3>
                            <el-input type="textarea"
                                      :autosize="{ minRows: 6}"></el-input>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-right"></i> 输入文档</span>
                    输入文档
                </el-tab-pane>
                <el-tab-pane label="输出文档">
                    <span slot="label"><i class="el-icon-back"></i> 输出文档</span>
                    输出文档
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-document"></i> 日志</span>
                    日志
                </el-tab-pane>
                <el-tab-pane label="参考实例">参考实例</el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
import Gantt from "@/components/Gantt"
import Tree from "@/components/Tree"
import Card from "@/components/Card";
import {ganttDatas, dataset} from "@/components/testData"
export default {
    name: "TaskManage",
    data () {
        return {
            ganttDataLoaded: false,
            treeDatas : [],
            tableDatas : [{
                value: '2016-05-02',
                name: '结束日期',
            }, {
                value: 'ing',
                name: '项目状态',
            }, {
                value: 'nick',
                name: '委托人',
            }, {
                value: 'lucy',
                name: '负责人',
            }],
            ganttDatas: [],
            collapseGanttBoxProp:false,
            criticalPathDisplay: false,
        }
    },
    created() {
        this.treeDatas = dataset;
        fetch("https://www.fastmock.site/mock/7f143c4ab35b8dbc46edbcc32c83547a/ty/gantt")
        .then(resp => resp.json())
        .then(resp => {
            // this.ganttDatas = resp.ITEMS[0];
            this.ganttDatas = ganttDatas;
            //数据获取后，初始化gantt图
            this.ganttDataLoaded = true;
        })
    },
    components : {
        Gantt,
        Tree,
        Card,
    },
    methods: {
        //点击tree的某项时触发
        treeAfterClickedCb (tree,id,e) {
            fetch("https://www.fastmock.site/mock/7f143c4ab35b8dbc46edbcc32c83547a/ty/gantt2")
            .then(resp => resp.json())
            .then(resp => {
                this.$refs.gantt.update(resp.ITEMS[0])
            })
        },
        collapseGanttBox(){
            this.collapseGanttBoxProp = !this.collapseGanttBoxProp
            this.$refs['gantt-box'].$el.classList.add("_collapse")
        },
        expandGanttBox(){
            this.collapseGanttBoxProp = !this.collapseGanttBoxProp
            this.$refs['gantt-box'].$el.classList.remove("_collapse")
        },
        criticalPathDisplayHandler(){
            if (this.criticalPathDisplay)
                this.$refs.gantt.hideCriticalPath();
            else this.$refs.gantt.showCriticalPath();
            this.criticalPathDisplay = !this.criticalPathDisplay;
        }
    }
}


</script>

<style scoped lang="less">
.card-header-btn{
    background:rgba(234,234,238,0.5);
    border-radius:2px;
    border:1px solid rgba(0,0,0,0.1);
    padding:3px 3px;
    min-width:30px;
}
.card-header-btn:active{
    position: relative;
    top:1px;
}
.prop-tabs{
    margin-top: 5px;
    height: 380px;
    overflow: auto;
    .tab-title{
        text-align: left;
        margin-top: 0px;
        font-size: 14px;
        margin-bottom: 5px;
        color:#040e29;
        font-weight: normal;
    }
    /deep/.el-tabs__content{
        padding-top: 5px;
        overflow: auto;
        height: 380px;
    }
    /*修改element ui tabs的label样式 begin*/
    /deep/.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #161e3a;
    }
    /deep/.el-tabs__header .el-tabs__item.is-active{
        color: #161E3A;
        font-weight: bold;
    }
    /*修改element ui tabs的label样式 end*/
}
/*展开和收缩 甘特图*/
._collapse{
    height: 450px;
    /deep/.el-card__body{
        height: 403px;
    }
}
</style>
