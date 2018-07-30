<template>
  <page>
    <div>这是A页面</div>

    <cube-button type="primary" @click="handleGoto">跳转到B</cube-button>

    <page-view></page-view>
  </page>
</template>

<script>
import Page from '../components/Page'
import PageView from '../components/View'

export default {
  components: {
    Page,
    PageView
  },
  methods: {
    handleGoto () {
      this.$router.push({name: 'b'})
    }
  }
}
</script>
