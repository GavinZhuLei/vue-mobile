<template>
  <div id="app">
    <div>{{xxx}}</div>
    <group label-width="4em" label-margin-right="2em" label-align="left">
      <x-input title="title" v-model="value" placeholder="输入标题"></x-input>
      <x-textarea title="内容" placeholder="输入内容" :show-counter="true" :rows="2" autosize></x-textarea>
      <x-number title="数量" v-model="number"></x-number>
    </group>
  </div>
</template>

<script>
import {Group, XInput, XTextarea, XNumber} from 'vux'

export default {
  name: 'App',
  data () {
    return {
      value: '',
      number: 0,
      xxx: 'bb'
    }
  },
  mounted () {
    this.xxx = JSON.parse(window.localStorage.getItem('xxx')).a
  },
  components: {
    Group,
    XInput,
    XTextarea,
    XNumber
  },
  methods: {
  }
}
</script>

<style lang="scss">
// @import '../../style/base/aspect-ratio.scss';
@import '../../style/main.css';

html,body{
  background: #fafafa;
}

.fa-icon{
  width: auto;
  height: 1em; /* 或任意其它字体大小相对值 */
  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
</style>
