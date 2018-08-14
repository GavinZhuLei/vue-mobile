<template>
  <vm-frame>
    <group>
      <cell title="合计" value="￥1024"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame'
import { CellFormPreview, Group, Cell } from 'vux'

export default {
  components: {
    VmFrame,
    CellFormPreview,
    Group,
    Cell
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }]
    }
  }
}
</script>

<style lang="scss">
</style>
