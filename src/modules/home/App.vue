<template>
  <div id="app">
    <group>
      <cell title="编辑表单" is-link @click.native="handleForm"></cell>
      <cell title="组件" is-link @click.native="handleComponent"></cell>
      <cell title="浏览器" is-link @click.native="handleBrower"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  name: 'App',
  components: {
    Group,
    Cell
  },
  mounted () {
    window.localStorage.setItem('xxx', JSON.stringify({a: 'aaa'}))
  },
  methods: {
    handleTest () {
      api.openWin({
        name: 'test',
        url: 'test.html',
        pageParam: {
            name: 'test'
        }
      })
    },

    handleForm () {
      api.openWin({
        name: 'form',
        url: 'form_win.html'
      })
    },

    handleComponent () {
      api.openWin({
        name: 'component',
        url: 'component_win.html'
      })
    },

    handleBrower () {
      api.openWin({
        name: 'browser',
        url: 'browser_win.html',
        pageParam: {
          url: 'http://www.baidu.com'
        }
      })

      // const browser = api.require('webBrowser')

      // browser.open({
      //   url: 'http://www.baidu.com'
      // })

      // browser.openView({
      //   url: 'http://www.baidu.com',
      //   rect: {
      //     x: 0,
      //     y: 64,
      //     w: 'auto',
      //     h: 'auto'
      //   }
      // }, function(ret, err) {
      //   switch (ret.state) {
      //     case 0:
      //       break;
      //     case 1:
      //       break;
      //     case 2:
      //       break;
      //     case 3:
      //       break;
      //     case 4:
      //       break;
      //     default:
      //       break;
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
// @import '../../style/base/aspect-ratio.scss';
@import '../../style/main.css';

.fa-icon{
  width: auto;
  height: 1em; /* 或任意其它字体大小相对值 */
  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
</style>
