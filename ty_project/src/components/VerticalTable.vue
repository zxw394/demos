<template>
    <table class="ver-table" :style="styleObject">
        <tr v-for="(item, index) in tableDatas" :key="index">
            <td class="column" v-text="item.prop"></td>
            <td v-text="item.value"></td>
        </tr>
    </table>
</template>

<script>
export default {
    name: "VerticalTable",
    data () {
        return {
        }
    },
    props : {
      tableDatas : {
          type : Array,
          default : () => [
              {
                  prop : 'name',
                  value : 'xinwei'
              },
              {
                  prop : 'age',
                  value : 18
            },
              {
                  prop : 'age',
                  value : 18
              },
              {
                  prop : 'age',
                  value : 18
              },
              {
                  prop : 'age',
                  value : 18
              },
          ]
      },
      styleObject : {
          type : Object,
          default : () => {}
      }
    },
}
</script>

<style scoped lang="less">
.ver-table{
    @borderColor : #ebeef5;
    text-align: left;
    border-collapse:collapse;
    border-top: 1px solid @borderColor;
    color:#606266;
    .column{
        border-left: 1px solid @borderColor;
        /*color:#000;*/
    }
    tr td {
        padding: 12px 10px;
        border-right: 1px solid @borderColor;
        border-bottom: 1px solid @borderColor;
    }
}


</style>
