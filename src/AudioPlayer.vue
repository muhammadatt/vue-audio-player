<template>
    <div id="audio-player-root" >

        <!-- Hide the default audio player -->
        <div >
            <audio
                style="display:none"
                ref="player"
                :id="playerid"
            >
                <source :src="url" type="audio/mpeg" />
            </audio>
        </div>
            
            <div
                class="w-3/4 max-w-5xl bg-gray-200 border border-gray-300 px-2 pt-2 mt-4 shadow-md"
                style="margin: auto;"
            >
                <div id="player-row" class="inline-flex flex-wrap w-full">
                    <div id="button-div" class="flex-initial pr-3">
                        <svg
                            @click="toggleAudio()"
                            v-show="!isPlaying"
                            class="play-button text-gray-400"
                            :class="{ 'text-orange-600': audioLoaded, 'hover:text-orange-400': audioLoaded, 'cursor-pointer': audioLoaded }"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <svg
                            @click="toggleAudio()"
                            v-show="isPlaying"
                            class="play-button text-orange-400 hover:text-orange-400 cursor-pointer"                            
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>

                    <div
                        id="progress-bar"
                        class="flex-grow bg-white border border-blue-200"
                    >
                        <div class="overlay-container relative w-full h-full">
                            <input
                                v-model="playbackTime"
                                type="range"
                                min="0"
                                :max="audioDuration"
                                class="slider w-full h-full"
                                id="position"
                                name="position"
                            />

                            <!-- Show loading indicator until audio has been loaded -->

                            <div v-show="!audioLoaded"
                            class="w-full absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none"
                            style="color: #94bcec">
                            Loading please wait...
                            </div>
                            
                            <div
                                v-show="audioLoaded"
                                class="flex w-full justify-between absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none"
                            >
                            
                                <span class="text-sm" style="color: #94bcec" v-html="elapsedTime()"> 00:00 </span>

                                <span class="text-sm" style="color: #94bcec" v-html="totalTime()"> 00:00 </span>
                                
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            
            <!-- outer gray border -->
        </div>
        <!-- white bg -->
    </div>
    <!-- root -->
</template>

<script>
//import { mapState } from 'vuex'
export default {
    props: ["url", "playerid"],
    /**
     * playbackTime = local var that syncs to audio.currentTime
     * audioDuration = duration of audio file in seconds
     * isPlaying = boolean (true if audio is playing)
     *
     **/

    data() {
        return {
            playbackTime: 0,
            audioDuration: 100,
            audioLoaded: false,
            isPlaying: false

        };
    },
    methods: {
        //Set the range slider max value equal to audio duration
        initSlider() {
            var audio = this.$refs.player;
            if (audio) {
                this.audioDuration = Math.round(audio.duration);
            }
        },

        //Convert audio current time from seconds to min:sec display
        convertTime(seconds){
                            const format = val => `0${Math.floor(val)}`.slice(-2);
                var hours = seconds / 3600;
                var minutes = (seconds % 3600) / 60;

                return [minutes, seconds % 60].map(format).join(":");

        },

        //Show the total duration of audio file
        totalTime() {
            var audio = this.$refs.player;
            if (audio) {
                var seconds = audio.duration;
                return this.convertTime(seconds);

            } else {
                return '00:00';
            }
        },

        //Display the audio time elapsed so far
        elapsedTime() {
            var audio = this.$refs.player;
            if (audio) {
                var seconds = audio.currentTime;
                return this.convertTime(seconds);

            } else {
                return '00:00';
            }
        },

        //Playback listener function runs every 100ms while audio is playing
        playbackListener(e) {

            var audio = this.$refs.player;

            //Sync local 'playbackTime' var to audio.currentTime and update global state
            this.playbackTime = audio.currentTime;
            
            //console.log("update: " + audio.currentTime);

            //Add listeners for audio pause and audio end events
            audio.addEventListener("ended", this.endListener);
            audio.addEventListener("pause", this.pauseListener);
        },

        //Function to run when audio is paused by user
        pauseListener() {
            this.isPlaying = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        //Function to run when audio play reaches the end of file
        endListener() {
            this.isPlaying = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        //Remove listeners after audio play stops
        cleanupListeners() {
            var audio = this.$refs.player;
            audio.removeEventListener("freqtimeupdate", this.playbackListener);
            audio.removeEventListener("ended", this.endListener);
            audio.removeEventListener("pause", this.pauseListener);

            //console.log("All cleaned up!");
        },
        toggleAudio() {
            var audio = this.$refs.player;
            //var audio = document.getElementById("audio-player");
            if (audio.paused) {
                audio.play();
                this.isPlaying = true;
            } else {
                audio.pause();
                this.isPlaying = false;
            }
        },
    },
    mounted: function() {
      // nextTick code will run only after the entire view has been rendered
      this.$nextTick(function() {
        
        var audio=this.$refs.player;
        //Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider 
        // "loademetadata" Event https://www.w3schools.com/tags/av_event_loadedmetadata.asp
        audio.addEventListener(
          "loadedmetadata",
          function(e) {
            this.initSlider();
          }.bind(this)
        );

        // "canplay" HTML Event lets us know audio is ready for play https://www.w3schools.com/tags/av_event_canplay.asp
        audio.addEventListener(
          "canplay",
          function(e) {
            this.audioLoaded=true;
          }.bind(this)
        );

        //Wait for audio to begin play, then start playback listener function
        this.$watch("isPlaying",function() {

          if(this.isPlaying) {
            var audio=this.$refs.player;
            this.initSlider();
            //console.log("Audio playback started.");

            //prevent starting multiple listeners at the same time
            if(!this.listenerActive) {
              this.listenerActive=true;

              audio.addEventListener("freqtimeupdate",this.playbackListener);
            }
          }

        });

        //Update current audio position when user drags progress slider
        this.$watch("playbackTime",function() {
            var audio=this.$refs.player;

        var diff=Math.abs(this.playbackTime-this.$refs.player.currentTime);
        
          //Throttle synchronization to prevent infinite loop between playback listener and this watcher
          if(diff>0.01) {
            this.$refs.player.currentTime=this.playbackTime;

          }

        });

      });
    }

};
</script>

<style>

/* Play/Pause Button */
.play-button{
    height: 45px
}

input[type="range"] {
    margin: auto;
    -webkit-appearance: none;
    position: relative;
    overflow: hidden;
    width: 100%;
    cursor: pointer;
    outline: none;
    border-radius: 0; /* iOS */
    background: transparent;
}

input[type="range"]:focus {
    outline: none;
}

::-webkit-slider-runnable-track {
    background: #fff;
}

/*
 * 1. Set to 0 width and remove border for a slider without a thumb
 */
::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0; /* 1 */
    height: 40px;
    background: #fff;
    box-shadow: -100vw 0 0 100vw dodgerblue; 
    border: none; /* 2px solid #999; */
}

::-moz-range-track {
    height: 40px;
    background: #ddd;
}

::-moz-range-thumb {
    background: #fff;
    height: 40px;
    width: 0; /* 20px; */
    border: none; /* 3px solid #999; */
    border-radius: 0 !important;
    box-shadow: -100vw 0 0 100vw dodgerblue; 
    box-sizing: border-box;
}

::-ms-fill-lower {
    background: dodgerblue;
}

::-ms-thumb {
    background: #fff;
    border: 2px solid #999;
    height: 40px;
    width: 20px;
    box-sizing: border-box;
}

::-ms-ticks-after {
    display: none;
}

::-ms-ticks-before {
    display: none;
}

::-ms-track {
    background: #ddd;
    color: transparent;
    height: 40px;
    border: none;
}

::-ms-tooltip {
    display: none;
}
</style>
