<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../style/main.css';

html,body{
  background: #f5f5f5;
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
