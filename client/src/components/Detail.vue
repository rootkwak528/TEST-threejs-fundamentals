<template>
  <div id="detail">
    <h1>detail</h1>
    <h2>{{ cardId }}</h2>
    <button @click="close">x</button>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    cardId: {
      type: [Number,],
      default: null,
    }
  },
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