<template>
  <vm-frame>
    <group>
      <x-input title="title" placeholder="输入标题"></x-input>
    </group>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame'
import {Group, XInput} from 'vux'

export default {
  components: {
    VmFrame,
    Group,
    XInput
  }
}
</script>
