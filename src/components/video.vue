<template>
  <div class="relative">
    <span
      class="font-bold text-4xl absolute my-4 transition-all duration-1000 ease-out"
      :style="{opacity: volumeDisplay ? 1 : 0}"
    >
      <span class="material-icons mx-2">volume_up</span>
      {{volume}}
    </span>
    <video controls :autoplay="autoplay" @keypress="keyControls" @volumechange="volumeChange">
      <source
        :src="`http://localhost:3000/video?path=${encodeURIComponent(this.src)}`"
        type="video/mp4"
      />
      <!-- <track label="English" kind="subtitles" srclang="en" :src="`${encodeURIComponent(this.src).split('.mp4').join('.srt')}`" default> -->
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    autoplay:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      volume: `100%`,
      volumeDisplay: false
    }
  },
  // created() {
  //   let srt = document.createElement('script');
  //   srt.setAttribute('src', './video.js');
  //   document.head.appendChild(srt);
  // },
  mounted() {
    document.querySelector('video').focus();
  },
  methods: {
    volumeChange({ target: { volume }}) {
      this.volumeDisplay = true;
      this.volume = parseInt(volume*100) + '%';
      setTimeout(() => this.volumeDisplay = false, 1000)
    },
    keyControls(e) {
      e.preventDefault();
      switch (e.key) {
        case "9": // LongRight
          e.target.currentTime += 60
          if (e.target.currentTime > e.target.duration) {
            e.target.pause();
            e.target.currentTime = 0;
          }
          break;
        case "7": // LongLeft
          e.target.currentTime -= 60
          if (e.target.currentTime < 0) {
            e.target.pause();
            e.target.currentTime = 0;
          }
          break;
        case "6": // MidRight
          e.target.currentTime += 30
          if (e.target.currentTime > e.target.duration) {
            e.target.pause();
            e.target.currentTime = 0;
          }
          break;
        case "4": // MidLeft
          e.target.currentTime -= 30
          if (e.target.currentTime < 0) {
            e.target.pause();
            e.target.currentTime = 0;
          }
          break;
        case "3": // ShortRight
          e.target.currentTime += 10
          if (e.target.currentTime >= e.target.duration) {
            e.target.pause();
            e.target.currentTime = 0;
          }
          break;
        case "1": // ShortLeft
          e.target.currentTime -= 10
          if (e.target.currentTime <= 0) {
            e.target.pause();
            e.target.currentTime = 0;
          }
          break;
        case "f": //fullscreen
          if(document.fullscreenElement) {
            e.target.webkitExitFullScreen();
          } else {
            e.target.webkitRequestFullscreen();
          }          
          break;
        case "z": // close
          this.$emit('close');
          break;
        case ".": // fastforward
          e.target.playbackRate < 2 && (e.target.playbackRate += 0.5);
          break;
        case ",": // slowdown
          e.target.playbackRate > 0.5 && (e.target.playbackRate -= 0.5);
          break;
        case "m": // mute
          e.target.muted = !e.target.muted
          break;
        case "p": // picture-in-picture
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          } else {
            e.target.requestPictureInPicture();
          }          
          break;
        default:
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
