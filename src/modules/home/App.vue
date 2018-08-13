<template>
  <div id="app">
    <group>
      <cell title="跳转" is-link @click.native="handleTest"></cell>
      <cell title="编辑表单" is-link @click.native="handleForm"></cell>
      <cell title="组件" is-link @click.native="handleComponent"></cell>
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
