<template>
    <el-container style="padding: 10px;flex-flow: row wrap" class="task-page">
        <el-aside>
            <Card>
                <template slot="title">任务</template>
                <template slot="content">
                    <Tree :datas="treeDatas" id="mytask_tree"></Tree>
                </template>
            </Card>
        </el-aside>
        <el-main style="padding-top: 0px;padding-left: 10px;padding-right: 0px;display: flex">
            <Card :style="{'width' : '1000px'}">
                <template slot="title">
                    视图任务
                </template>
                <template slot="content">
                    <el-table
                            :data="tableDatas"
                            style="width: 100%;margin-bottom: 20px;"
                            row-key="id"
                            border
                            default-expand-all
                            header-cell-class-name="custom-header-cell"
                            @cell-dblclick="cellDbClick"
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
<!--                        <el-table-column-->
<!--                                type="selection"-->
<!--                                width="55">-->
<!--                        </el-table-column>-->
                        <el-table-column
                                prop="date"
                                label="名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="所属里程碑"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="类型"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="优先级"
                                width="240">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="状态"
                                width="240">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="计划结束日期"
                                width="240">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="负责人"
                                width="240">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="210">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">打开</el-button>
                                <el-button type="text" size="small">冻结</el-button>
                                <el-button type="text" size="small">状态分析</el-button>
                                <el-button type="text" size="small">问题清单</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
<!--                    <TreeGrid :datas="treeGridDatas"></TreeGrid>-->
                </template>
            </Card>
            <Card :style="{'margin-left' : '10px','width' : '350px'}">
                <template slot="title">
                    属性
                </template>
                <template slot="content">
                    <div style="padding-left: 10px;padding-right: 10px">
                        <el-collapse v-model="activeNames" accordion @change="handleChange">
                            <el-collapse-item  name="1">
                                <template slot="title">
                                    <span style="font-weight: bold;color:#161e3a">基本属性</span>
                                </template>
                                <el-table
                                        fit
                                        @cell-dblclick="cellDbClick"
                                        size="small"
                                        :show-header="false"
                                        :data="tableData"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="name"
                                            width="164">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            width="164">
                                    </el-table-column>
                                </el-table>
                                <div style="font-size: 12px;color:#000;margin-top: 5px">任务描述</div>
                                <el-input type="textarea"
                                          :autosize="{ minRows: 3}"
                                ></el-input>
                                <div style="font-size: 12px;color:#000;margin-top: 5px">验收标准</div>
                                <el-input type="textarea"
                                          :autosize="{ minRows: 3}"
                                ></el-input>
                            </el-collapse-item>
                            <el-collapse-item title="参考实例" name="2">
                                <template slot="title">
                                    <span style="font-weight: bold">参考实例</span>
                                </template>
                                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                            </el-collapse-item>
                            <el-collapse-item title="启动/完成条件" name="3">
                                <template slot="title">
                                    <span style="font-weight: bold">启动/完成条件</span>
                                </template>
                                <div>简化流程：设计简洁直观的操作流程；</div>
                                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                            </el-collapse-item>
                            <el-collapse-item title="日志" name="4">
                                <template slot="title">
                                    <span style="font-weight: bold">日志</span>
                                </template>
                                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </template>
            </Card>
        </el-main>
    </el-container>
</template>

<script>
    import Card from "@/components/Card"
    import Tree from "@/components/Tree"
    import TreeGrid from "@/components/TreeGrid";

    function debounce(fn, wait) {
        var timer = null;
        return function () {
            var context = this
            var args = arguments
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                fn.apply(context, args)
            }, wait)
        }
    }

    let originCell
    let duplicateCell = "";
    let hasEditableInput = false;
    export default {
        name: "MyTask",
        data () {
            return {
                treeDatas : [],
                treeGridDatas : [],
                activeNames : ['1'],
                tableData : [{
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
                tableDatas : [
                    {
                        id: 1,
                        date: 'parent',
                        name: '任务',
                        address: 'this is content',
                        children: [{
                            id: 31,
                            date: 'child_01',
                            name: '子任务',
                            address: 'this is content'
                        }, {
                            id: 32,
                            date: 'child_02',
                            name: '子任务',
                            address: 'this is content'
                        }]
                    }
                ]
            }
        },
        created () {
            this.treeDatas = dataSet;
        },
        methods : {
            handleChange () {

            },
            cellDbClick(row, column, cell, event){
                console.log(row);
                console.log(column);
                console.log(cell);
                // console.log(event);
                if (hasEditableInput) return false
                duplicateCell = cell.cloneNode(true);
                let input = document.createElement("input");
                console.log(cell.height, "cell.height~~~~")
                input.height = 120;
                input.value = row[column.property];
                input.onblur = () => {
                    row[column.property] = input.value;
                    duplicateCell.querySelector(".cell").childNodes.forEach((ele) => {
                        if (ele.nodeType === 3) {
                            ele.textContent  = input.value;
                        }
                    })
                    originCell.replaceWith(duplicateCell);
                    console.log(this.tableDatas)
                    hasEditableInput = false;
                }
                //循环删除子节点
                while(cell.hasChildNodes()) cell.removeChild(cell.firstChild);
                cell.appendChild(input);
                input.focus();
                originCell = cell;
                hasEditableInput = true
            },
        },
        components: {
            Card,
            Tree,
            TreeGrid,
        }
    }
    var dataSet = [
        {
            value: "我负责的项目任务",
            id: "1"
        },
        {
            value: "我下达的项目任务",
            id: "2"
        },
        {
            value: "待审核的任务",
            id: "3"
        },
        {
            value: "待审核的问题",
            id: "4"
        },
        {
            value: "待解决的问题",
            id: "5"
        }
    ]
</script>

<style scoped lang="less">
.task-page{
    /deep/.el-table{
        color:#454545;
    }
    /deep/.el-table td, /deep/.el-table th{
        padding: 5px 0;
    }
    .el-aside{
        flex: 1 260px
    }
    /*自定义表头样式*/
    /deep/.custom-header-cell{
        color:#252836;
        text-align: center;
    }
}


</style>
