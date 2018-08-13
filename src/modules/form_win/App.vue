<template>
  <div id="app">
    <mt-header id="header" title="表单">
      <mt-button icon="back" @click.native="handleBack"  slot="left">返回</mt-button>
    </mt-header>

    <div id="main">

    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    window.apiready = function () {
      const header = $api.byId('header')
      $api.fixStatusBar(header)

      var headerPos = $api.offset(header);
      var main = $api.byId('main');
      var mainPos = $api.offset(main);
      api.openFrame({
        name: 'home',
        url: 'form_frame.html',
        bounces: true,
        rect: {
            x: 0,
            y: headerPos.h,
            w: 'auto',
            h: mainPos.h
        }
      });
    }

  },
  methods: {
    handleBack () {
      api.closeWin()
    }
  }
}
</script>

<style lang="scss">
@import '../../style/base/aspect-ratio.scss';

#header{
  height: 60px;
  font-size: 16px;

  .header-icon{
    font-size: 20px;
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
