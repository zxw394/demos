<template>
  <div id="app">
    <div class="app-wrapper">
      <Sidebar :isCollapse="isCollapse"></Sidebar>
      <div class="main" :style="{'margin-left': !isCollapse ? '210px' : '64px'}">
        <Navbar :isCollapse.sync="isCollapse"></Navbar>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
export default {
  name: "app",
  data() {
    return {
      isCollapse : false,
    };
  },
  created(){
  },
  components : {
    Navbar,
    Sidebar,
  },
}
</script>
<style lang="less" scoped>
.main{
  min-height: 100%;
  transition: margin-left .3s;
  background-color:rgba(243,244,246,1);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
