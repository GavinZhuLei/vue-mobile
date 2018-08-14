<template>
  <vm-frame>
    <group>
      <cell title="cell" value="hello" is-link></cell>
      <cell-box is-link>
        cell-box long long long long long long long
      </cell-box>
      <cell-box>
        cell-box hello world hello world hello world
      </cell-box>
      <cell title="cell" value="hello" is-link></cell>
    </group>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame'
import { Group, Cell, CellBox } from 'vux'

export default {
  components: {
    VmFrame,
    Group,
    Cell,
    CellBox
  }
}
</script>

<style lang="scss">
</style>
