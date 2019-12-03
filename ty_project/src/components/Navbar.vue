<template>
    <div class="navbar">
        <div class="left-side" @click="collapseHandler">
            <i :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
        </div>
        <div class="right-side">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  李小璐<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>pgone</el-dropdown-item>
                    <el-dropdown-item>登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Navbar",
        props : {
            isCollapse : {
                type : Boolean,
                default : false,
            },
        },
        methods: {
            collapseHandler () {
                this.$emit('update:isCollapse', !this.isCollapse);
            }
        }
    }
</script>

<style scoped lang="less">
//自定义
.navbar{
    height: 50px;
    text-align: left;
    background-color: #161E3A;
    .left-side,.right-side{
        color:#fff;
        line-height: 46px;
        padding:0 15px;
    }
    .left-side{
        float:left;
        font-size: 18px;
    }
    .right-side{
        float : right;
        .el-dropdown-link {
            cursor: pointer;
            color: #fff;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
}
</style>
