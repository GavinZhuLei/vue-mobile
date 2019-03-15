<template>
  <page
    ref="page"
    class="home-container"
    @on-ready="onReady"
    scrollbar
    :headerHeightVW="headerHeightVW"
  >

    <van-nav-bar slot="header" class="header" title="xxxxx">
    </van-nav-bar>


  </page>
</template>

<script>
import Draggable from 'vuedraggable'
import Page from '../../../components/Page'
import PageView from '../../../components/View'
import io from '../../../api'
import Cookies from 'js-cookie'

export default {
  components: {
    Page,
    Draggable,
    PageView
  },
  data() {
    return {
      headerHeightVW: 0,
    }
  },
  computed: {
  },
  methods: {
    onReady(header) {
      this.headerHeightVW = (header.h) * 100 / header.w
    },
  }
}
</script>

<style lang="scss">

</style>
