<template>
  <div class="about">
    <p v-text="storeValue">111</p>
    <button @click="getValue">获取store中的数据</button>
    <button @click="$router.push('/')">跳转回首页</button>
    <button @click="getParams">获取参数值</button>
    <MyComponent :messages="datas">
      <div slot="addon">
        不想随便写写！！！
      </div>
  </MyComponent>
  </div>
</template>
<script>
  const datas = [
    {
      name : "dog",
      age : 5,
    },
    {
      name : "cat",
      age : 2,
    },
    {
      name : "pig",
      age : 3,
    },
  ]
  import MyComponent from '@/components/MyComponent.vue'
  import {mapState} from "vuex"
  export default {
    data () {
      return {
        storeValue : "",
        datas
      }
    },
    components : {
      MyComponent
    },
    computed : {
      ...mapState(['messages'])
    },
    methods : {
      getValue () {
        console.log(this.messages);
        this.storeValue=this.messages
      },
      getParams(){
        let paramStr = ""
        for (let key in this.$route.query) {
          paramStr += (key + ":" + this.$route.query[key] + "; ")
        }
        alert("参数 ： " + paramStr);
      },
    }
  }
</script>
