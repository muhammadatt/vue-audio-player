<template>
  <div id="app" class="text-center">
    <img src="https://vue-audioplayer-demo.s3.amazonaws.com/768px-Vue.js_Logo_2.svg.png" class="w-24" style="margin: 0 auto">
    <h1>Vue HTML5 Audio Player Demo</h1>
    <br /><br />
    <audio-player url="https://vue-audioplayer-demo.s3.amazonaws.com/Kalimba.mp3" playerid="audio-player"> </audio-player>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
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
