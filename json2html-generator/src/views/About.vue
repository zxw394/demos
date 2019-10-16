<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  created () {
    function add (a, b) {
      return a + b
    }
    let newFunc = _.curry(add)
    console.log(newFunc(1)(2))
  }
}
</script>
