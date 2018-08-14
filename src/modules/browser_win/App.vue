<template>
  <win @open-frame="onOpenFrame">
    <x-header id="header" slot="header" :left-options="{preventGoBack: true}" @on-click-back="handleClose">{{title}}</x-header>
  </win>
</template>

<script>
import Win from '../../components/Win'
import { XHeader } from 'vux'

export default {
  components: {
    Win,
    XHeader
  },
  data () {
    return {
      title: '',
      browser: null
    }
  },
  methods: {
    handleClose () {
      // api.closeWin()
      if (this.browser) {
        this.browser.historyBack(
          function(ret, err) {
            if (!ret.status) {
              api.closeWin();
            }
          }
        )
      } else {
        api.closeWin()
      }
    },

    onOpenFrame (header, main) {
      this.browser = api.require('webBrowser')
      const _this = this

      // browser.open({
      //   url: 'http://www.baidu.com'
      // })

      this.browser.openView({
        url: api.pageParam.url,
        rect: {
          x: 0,
          y: header.h,
          w: 'auto',
          h: main.h
        }
      }, function(ret, err) {
        switch (ret.state) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            _this.title = ret.title
            break;
          case 4:
            break;
          default:
            break;
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
