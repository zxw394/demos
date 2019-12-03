<template>
  <div id="app">
    <div class="app-wrapper">
      <Sidebar :isCollapse="isCollapse"></Sidebar>
      <div class="main" :style="{'margin-left': !isCollapse ? '210px' : '64px'}">
        <Navbar :isCollapse.sync="isCollapse"></Navbar>
        <el-container style="padding: 20px">
          <el-aside width="300px">
            <Card>
              <template slot="title">树型结构</template>
              <template slot="content">
                <Tree :datas="treeDatas"></Tree>
              </template>
            </Card>
          </el-aside>
          <el-main style="padding-top: 0px;padding-left: 10px">
            <Card :cardHeight="null">
              <template slot="title">甘特图</template>
              <template slot="content">
                <Gantt></Gantt>
              </template>
              <template slot="operators">
                <el-button plain class="card-header-btn">
                  保存数据 <i class="el-icon-edit-outline"></i>
                </el-button>
              </template>
            </Card>
            <el-tabs type="border-card" v-if="viewType == 'gantt'" class="prop-tabs">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-document"></i> 基本属性</span>
                <template>
                  <div style="width: 50%;float:left">
                    <h3 class="tab-title">常规属性</h3>
                    <VerticalTable style="width: 100%;"></VerticalTable>
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
      </div>
    </div>

<!--          <el-menu-item index="3" disabled>-->
<!--            <i class="el-icon-document"></i>-->
<!--            <span slot="title">产品配置</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="4">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">数据管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="5">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">BOM管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="6">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">基线管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="7">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">工艺管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="8">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">系统设置</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="9">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">协同平台</span>-->
<!--          </el-menu-item>-->
  </div>
</template>
<script>
import Gantt from "./components/Gantt"
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Tree from "./components/Tree"
import Card from "./components/Card";
import VerticalTable from "./components/VerticalTable";
export default {
  name: "app",
  data() {
    return {
      isCollapse : false,
      activeName: "first",
      viewType : 'gantt',
      treeDatas : dataset,

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]

      };
  },
  created(){
  },
  components : {
    VerticalTable,
    Gantt,
    Tree,
    Card,
    Navbar,
    Sidebar,
  },
  methods : {
    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);

    },
  }
}
var dataset = [
  {
    value: "Books",
    id: "books",
    opened: true,
    items: [
      {
        value: "History",
        id: "history",
        items: [
          {
            value: "John Mack Faragher",
            id: "1"
          },
          {
            value: "Jim Dwyer",
            id: "2"
          },
          {
            value: "Larry Schweikart",
            id: "3"
          }
        ]
      },
      {
        value: "Fiction & Fantasy",
        id: "fantasy",
        items: [
          {
            value: "Audrey Niffenegger",
            id: "af"
          },
          {
            value: "Philip Roth",
            id: "pr"
          }
        ]
      },
      {
        value: "Teens",
        id: "teens",
        items: [
          {
            value: "Joss Whedon",
            id: "jw"
          },
          {
            value: "Meg Cabot",
            id: "mc"
          },
          {
            value: "Garth Nix",
            id: "gn"
          }
        ]
      }
    ]
  }
];
</script>
<style lang="less" scoped>
.main{
  min-height: 100%;
  transition: margin-left .3s;
  background-color:rgba(243,244,246,1);
}
.card-header-btn{
  background:rgba(234,234,238,0.5);
  border-radius:2px;
  border:1px solid rgba(0,0,0,0.1);
  padding:3px 0px;
  width:100px;
}
.prop-tabs{
  margin-top: 15px;
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
</style>
