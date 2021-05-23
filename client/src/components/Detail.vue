<template>
  <div id="detail">
    detail
    <input type="text" @keyup.enter="close">
    <button @click="close">x</button>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  methods: {
    close () {
      this.$emit('close-detail')
    }
  }
}
</script>

<style>
#detail {
  position: absolute;
  top: 40vh;
  left: 40vw;
  height: 30vh;
  width: 30vw;
  background-color: aquamarine;
}
</style>