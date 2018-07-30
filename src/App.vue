<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      toast: null
    }
  },
  mounted () {
    console.log('route', this.$route)
    this.toast = this.$createToast({
      time: 0,
      txt: '身份认证中...'
    })

    !this.$route.name && this.toast.show()
  },
  watch: {
    '$route.name': function (val) {
      console.log('change route', val)
      // this.toast.hide()
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';

html,
body {
  height: 100%;
  // min-width: 750px;
  overflow: hidden;
  width: 100%;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(59, 59, 59);
  /* min-height: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fafafa;
  overflow: hidden;
}
.bscroll-vertical-scrollbar {
  width: 5px !important;
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
