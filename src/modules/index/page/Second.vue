<template>
  <page style="z-index: 99;">
    second

    <div>
      <button @click="handleHome">去第三个页面</button>
    </div>
  </page>
</template>

<script>
import Page from '../../../components/Page'

export default {
  components: {
    Page,
  },
  methods: {
    handleHome() {
      this.$router.push({name: 'third'})
    }
  }
}
</script>
