<template>
    <div class="sidebar-box">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                background-color="#0B1331"
                text-color="#fff">
            <el-menu-item-group class="title-box">
                <div class="title-span"><span v-if="!isCollapse">IntePLM</span></div>
            </el-menu-item-group>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-setting nav-icon"></i>
                    <span>项目管理</span>
                </template>
                <el-menu-item index="1-1">项目计划管理</el-menu-item>
                <el-menu-item index="1-2">我的项目任务</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-tickets nav-icon"></i>
                    <span>我的工作</span>
                </template>
                <el-menu-item index="2-1">个人工作区</el-menu-item>
                <el-menu-item index="2-2">项目工作区</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    props : {
        isCollapse : {
            type : Boolean,
            default : false
        },
    },
    methods : {

    }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
}
</style>
