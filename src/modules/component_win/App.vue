<template>
  <win @open-frame="onOpenFrame">
    <x-header id="header" slot="header" :left-options="{preventGoBack: true}" @on-click-back="handleClose">组件库</x-header>
  </win>
</template>

<script>
import Win from '../../components/Win'
import { XHeader } from 'vux'

export default {
  components: {
    Win,
    XHeader
  },
  methods: {
    handleClose () {
      api.closeWin()
    },

    onOpenFrame (header, main) {
      api.openFrame({
        name: 'component',
        url: 'component_frame.html',
        bounces: true,
        rect: {
            x: 0,
            y: header.h,
            w: 'auto',
            h: main.h
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
