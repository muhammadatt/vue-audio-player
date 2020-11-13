import Vue from 'vue'
import App from './App.vue'
import AudioPlayer from './AudioPlayer.vue'

Vue.component('audio-player', AudioPlayer);

new Vue({
  el: '#app',
  render: h => h(App)
})

require('./freqtimeupdate.js')

