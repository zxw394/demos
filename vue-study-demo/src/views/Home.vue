<template>
  <div class="home">
    <h1>下面是一个自定义组件</h1>
    <MyComponent :messages="datas" @transport="recevice"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MyComponent from '@/components/MyComponent.vue'
const datas = [
  {
    name : "xiaoming",
    age : 11,
    company : "qq",
  },
  {
    name : "xiaowang",
    age : 12,
    company : "google",
  },
  {
    name : "xiaoli",
    age : 13,
    company : "apple",
  },
]
export default {
  name: 'home',
  components: {
    MyComponent
  },
  data(){
    return {
      datas
    }
  },
  created () {
    console.log("home create");
  },
  methods : {
    recevice (msg) {
      alert("父组件已接受到信息: " + JSON.stringify(msg));
    }
  }
}
</script>
