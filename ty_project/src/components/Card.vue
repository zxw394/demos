<template>
    <el-card class="box-card" :style="cardStyle">
        <div slot="header" class="clearfix">
            <span class="header-desc">
                <slot name="title"></slot>
            </span>
            <div style="float: right;">
                <slot name="operators"></slot>
                <el-button plain style="padding: 3px 0" class="header-refresh">
                    <i class="el-icon-refresh-right"></i>
                </el-button>
            </div>
        </div>
        <slot name="content" style="height: 100%"></slot>
    </el-card>
</template>

<script>
    export default {
        name: "Card",
        props : {
            cardStyle : {
                type : Object,
                default : () => {}
            }
        },
    }
</script>

<style scoped lang="less">
.box-card{
    height : 850px;
    border : 1px solid #DCDFE6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04) !important;
    /deep/.el-card__header{
        padding: 12px 20px;
        background-color: #f5f7fa;
        height:47px;
        .header-desc{
            color:#313540;
            font-size: 15px;
            font-weight: bold;
        }
        .header-refresh{
            width:25px;
            background:rgba(234,234,238,0.5);
            border-radius:2px;
            border:1px solid rgba(0,0,0,0.1);
        }
    }
    /deep/.el-card__body{
        padding: 5px 0 0 0;
        height: 803px;
        overflow: auto;
        box-sizing: border-box;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .clearfix{
        text-align: left;
    }
}

</style>
