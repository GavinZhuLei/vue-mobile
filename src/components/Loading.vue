<template>
  <div class="mf-loading-container">
    <img src="../assets/images/loading/loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading'

export default {
  name: COMPONENT_NAME,
}
</script>
<style lang="scss">
  .mf-loading-container{
    img {
      width: 20px;
      height: 20px;
      display: block;
    }
  }
</style>
