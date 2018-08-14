<template>
  <win @open-frame="onOpenFrame">
    <x-header id="header" slot="header" :left-options="{showBack: false}" >vue-mobile
      <a slot="right" @click="handleScan">
        <x-icon type="qr-scanner" size="20"></x-icon>
      </a>
    </x-header>
  </win>
</template>

<script>
import Win from '../../components/Win.vue'
import { XHeader } from 'vux'

export default {
  name: 'App',
  components: {
    Win,
    XHeader
  },
  data () {
    return {
      FNScanner: null
    }
  },
  methods: {
    onOpenFrame (header, main) {
      this.FNScanner = api.require('FNScanner')
      api.openFrame({
        name: 'home',
        url: 'home.html',
        bounces: true,
        rect: {
            x: 0,
            y: header.h,
            w: 'auto',
            h: main.h
        }
      })
    },

    handleScan () {
      console.log('scan')
      
      this.FNScanner.open({
        autorotation: true
      }, function(ret, err) {
        if (ret) {
          // alert(JSON.stringify(ret));
          if (ret.eventType === 'success') {
            api.openWin({
              name: 'browser',
              url: 'browser_win.html',
              pageParam: {
                url: ret.content
              }
            })
          }
        } else {
          alert(JSON.stringify(err));
        }
      })
    }
  }
}
</script>

<style lang="scss">
.vux-x-icon {
  fill: #fff;
}
.vux-header-right{
  bottom: 7px !important;
}
</style>
