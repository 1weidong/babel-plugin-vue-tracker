<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    this.init("PC_00229", { city_id: 1 }, false);
  },
  methods: {
    /**
   * autotracker
   * @param {number} trackerId - 埋点id
   * @param {number} city_id - 城市id
   * @param {boolean} isTracker - 是否调用埋点
   */
    async init(trackerId, city_id, isTracker) {
      await console.log(trackerId, city_id, isTracker)
    },
    b() {
      console.log(22222)
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
