<template>
  <page style="z-index: 99;">
    third

    <div>
      <button @click="handleHome">回到home</button>
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
      this.$router.go(-2)
    }
  }
}
</script>
