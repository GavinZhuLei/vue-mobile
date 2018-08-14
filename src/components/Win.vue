<template>
  <div id="app">

    <slot name="header">

    </slot>

    <div id="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    window.apiready = () => {
      const header = $api.byId('header')
      $api.fixStatusBar(header)

      var headerPos = $api.offset(header)
      var main = $api.byId('main')
      var mainPos = $api.offset(main)

      this.$emit('open-frame', headerPos, mainPos)
    }
  }
}
</script>

<style lang="scss">
#header{
  .vux-header-left{
    top: auto;
    bottom: 11px;
  }

  .vux-header-right{
    // vertical-align: middle;
    top: auto;
    bottom: 11px;
  }
}

html,body{
    height: 100%;
}
#app{
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-flex-flow: column;
            flex-flow: column;
}

#main{
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
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
