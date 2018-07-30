<template>
  <transition name="page-move">
    <!-- <keep-alive> -->
      <router-view class="cube-view"></router-view>
    <!-- </keep-alive> -->

  </transition>
</template>

<style lang="stylus" rel="stylesheet/stylus">
.cube-view {
  transform: translate(0, 0);
}

.page-move-enter, .page-move-leave-active {
  transform: translate(100%, 0);
}

.page-move-enter-active, .page-move-leave-active {
  transition: transform 0.3s;
}
</style>
