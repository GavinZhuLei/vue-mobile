<template>
  <div class="amis-search-wrp">
    <van-search class="amis-search" @blur="handleSearch" :placeholder="placeholder" v-model="dataValue" />
    <div class="amis-search-scan" @click="handleScan"></div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataValue: this.value,
    }
  },
  methods: {
    handleScan() {
      this.$emit('on-scan')
    },
    handleSearch() {
      this.$emit('on-search', this.dataValue)
    },
  },
  watch: {
    dataValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.dataValue = val
    },
  },
}
</script>


<style lang="scss">
.amis-search-wrp{
  display: flex;
  background: #fff;
  // z-index: 9999;
  position: relative;
}

.amis-search-scan{
  width: 34px;
  height: 100%;
  margin-top: 10px;

  &::before{
    display: block;
    background: url('../assets/images/search/icon-scan.png') no-repeat;
    background-size: 100%;
    height: 24px;
    width: 24px;
    content: '';
  }
}

.amis-search{
  flex:1;
  background: #fff !important;

  .van-cell{
    background: #FAFAFA;
  }

  .van-icon-search{
    &:before{
      content: '';
      width: 16px;
      height: 16px;
      background: url('../assets/images/search/icon-search.png') no-repeat;
      background-size: 100%;
      margin-top: 4px;
      // vertical-align: middle;
    }
  }
}
</style>
