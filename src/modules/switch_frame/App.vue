<template>
  <vm-frame>
    <group title="值转换 map">
      <x-switch title="默认 true" :value-map="['0', '1']" v-model="stringValue"></x-switch>
      <cell title="value" :value="typeof stringValue + ' ' + stringValue"></cell>
    </group>
    <group :title="'Basic Usage'">
      <x-switch title="默认 false"></x-switch>
      <x-switch title="默认 true" :inline-desc="value1 + ''" v-model="value1"></x-switch>
    </group>
    <group title="禁用">
      <x-switch title="默认 false" disabled></x-switch>
      <x-switch title="默认 true" :value="true" disabled></x-switch>
    </group>
    <group :title="'prevent default'">
      <x-switch title="默认 false" prevent-default v-model="value2" @on-click="onClick"></x-switch>
    </group>
    <group :title="'使用html设置title'">
      <x-switch disabled title="<span style='color:red'>我是红色</span>"></x-switch>
    </group>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame.vue'
import { XSwitch, Group, Cell } from 'vux'

export default {
  components: {
    VmFrame,
    XSwitch,
    Group,
    Cell
  },
  methods: {
    onClick (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.$vux.loading.show({
        text: 'in processing'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.value2 = newVal
      }, 1000)
    }
  },
  data () {
    return {
      value1: true,
      value2: false,
      stringValue: '0'
    }
  }
}
</script>

<style lang="scss">
</style>
