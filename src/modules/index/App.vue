<template>
  <div id="app">
    <div id="header">
        <h1>APICloud</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    window.apiready = function () {
      var header = $api.byId('header')
      $api.fixStatusBar(header)
    }
  }
}
</script>

<style lang="scss">
@import '../../style/base/aspect-ratio.scss';

#header{
    text-align: center; background-color: #81a9c3; color: #fff;
    width: 100%;
}
#header h1{
    font-size: 20px; height: 44px; line-height: 44px; margin: 0em; color: #fff;
}
</style>
