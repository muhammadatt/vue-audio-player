<template>
  <div id="app" class="text-center">
    <img src="https://vue-audioplayer-demo.s3.amazonaws.com/768px-Vue.js_Logo_2.svg.png" class="w-24" style="margin: 0 auto">
    
    <h1 class="mt-5">Vue HTML5 Audio Player Demo</h1>
      <div class="text-md mt-5"> Learn how I made this on <a href="https://medium.com/@MuhammadAtt/building-an-mp3-audio-player-in-vue-js-c5884207251c">Medium </a></div>
    <div class="text-md mt-5">Download full demo code from <a href="https://github.com/muhammadatt/vue-audio-player">Github</a></div>

    <audio-player class="mt-5" url="https://vue-audioplayer-demo.s3.amazonaws.com/Kalimba.mp3" playerid="audio-player"> </audio-player>
    

    <div class="text-xs mt-10">Copyright notice: Kalimba.mp3 courtesy of <a href="https://www.learningcontainer.com/sample-audio-file/">Learning Container</a></div>

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
