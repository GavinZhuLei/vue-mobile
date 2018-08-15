<template>
  <win @open-frame="onOpenFrame">
    <x-header id="header" slot="header" :right-options="{showMore: true}" @on-click-more="handleMenu" :left-options="{preventGoBack: true}" @on-click-back="handleClose">{{title}}</x-header>
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
      browser: null,
      actionButton: null,
      rect: {
        x: 0,
        y: 0,
        w: 'auto',
        h: 'auto'
      }
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
      this.actionButton = api.require('MNActionButton')
      this.rect = {
        x: 0,
        y: header.h,
        w: 'auto',
        h: main.h
      }
      this.$nextTick(() => {
        this.handleOpenView(api.pageParam.url)
      })
    },

    handleMenu () {
      const _this = this

      console.log('menu')
      this.actionButton.open({
          layout: {
          row: 1,
          col: 5,
          rowSpacing: 10,
          colSpacing: 10,
          offset: 0
      },
      animation: true,
      autoHide: true,
      styles: {
          maskBg: 'rgba(0,0,0,0.2)',
          bg: '#fff',
          cancelButton: {
              size: 44,
              bg: '#fff',
              // icon: 'widget://res/action-button-cancel.png'
          },
          item: {
              titleColor: '#888',
              titleHighlight: 'dd2727',
              titleSize: 12
          },
          indicator: {
              color: '#c4c4c4',
              highlight: '#9e9e9e'
          }
      },
      items: [{
            icon: 'widget://image/refresh.png',
            highlight: 'widget://image/refresh.png',
            title: '刷新'
        }]
      }, function(ret) {
          if (ret.eventType == 'click') {
            switch (ret.index) {
              case 0:
                _this.handleRefresh()
                break;
            }
          }
      })
    },

    handleOpenView (url) {
      const _this = this

      // browser.open({
      //   url: 'http://www.baidu.com'
      // })

      this.browser.openView({
        url: url,
        rect: _this.rect
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
    },

    handleRefresh () {
      // this.browser.closeView()

      this.browser.loadScript({
        script: 'location.reload();'
      })

      // this.handleOpenView()
    }
  }
}
</script>

<style lang="scss">
</style>
