<template>
  <div id="app">
    <div id="nav">
      <router-link to="/jstree">Jstree</router-link> |
      <router-link to="/form">表单</router-link> |
      <router-link to="/table">表格</router-link> |
      <router-link to="/">自定义组件</router-link> |
      <router-link to="/store">vuex</router-link> |
      <router-link to="/gantt">gantt</router-link> |
      <router-link to="/treegrid">treegrid</router-link> |
      <router-link to="/tree">tree</router-link> |
      <a @click="$router.push('/layout')">layout</a>
    </div>
    <router-view :key="key"/>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        routerAlive : true
      }
    },
    computed : {
      key () {
        return this.$route.path + new Date().getTime()
      }
    }
  }
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
