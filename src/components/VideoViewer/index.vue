<template>
  <md-popup
      v-model="visible"
      position="bottom"
      prevent-scroll
      transition="slide-up"
    >
    <div class="video-wrp">
      <div :id="id" class="video-detail">

      </div>

      <div class="video-close" @click="handleClose">
        <icon name="regular/times-circle"></icon>
      </div>
    </div>
  </md-popup>

</template>
<script>
import 'dplayer/dist/Dplayer.min.css'
import Dplayer from 'dplayer/dist/Dplayer.min.js'

export default {
  props: ['value', 'src', 'pic'],
  data () {
    return {
      id: 'dplayer' + Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
      visible: this.value,
      dp: null
    }
  },
  mounted () {
    console.log('video', Dplayer)
  },
  methods: {
    handleClose () {
      this.visible = false
      this.dp.destroy()
    },
    start () {
      this.dp = new Dplayer({
        container: document.getElementById(this.id),
        video: {
          // url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          url: this.src,
          pic: this.pic
        }
      })
      this.$nextTick(() => {
        this.dp.play()
        this.dp.fullScreen.request('browser')
      })
    }
  },
  watch: {
    value (val) {
      this.visible = val

      if (val) {
        this.start()
      }
    },
    visible (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.video-wrp{
  position: relative;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,1);
  display: flex;
  align-items: center;

  .video-detail{
    width: 100%;
    max-height: 100%;
  }

  .dplayer-setting{
    display: none !important;
  }
  .dplayer-full-in-icon{
    display: none !important;
  }

  .video-close{
    position: absolute;
    width: 50px;
    height: 50px;
    font-size: 30px;
    line-height: 45px;
    text-align: center;
    background: rgba(0,0,0,.3);
    border-radius: 5px;
    color: #fff;
    top: 10px;
    right: 10px;
  }
}
</style>
