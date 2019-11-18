<template>
  <div class="hello">
    <div v-for="(msg, index) in messages" @click="clickRow(msg)" :key="index">
      <label>名字：</label>{{msg.name}};
      <label>年龄：</label>{{msg.age}};
      <template v-if="msg.company"><label>公司：</label>{{msg.company}}</template>
    </div>
    <slot name="addon">
      随便写点把
    </slot>
    <slot name="addon1">
      dddd
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    messages : {
      type : Array,
    },
  },
  methods : {
    clickRow (msg) {
      this.$emit("transport", msg);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
