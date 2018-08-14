<template>
  <vm-frame @on-ready="onReady">
    <group title="基础组件">
      <cell title="x-button" is-link @click.native="handleComponet('button')"></cell>

    </group>
    <group title="布局">
      <cell title="flexbox" is-link @click.native="handleComponet('flexbox')"></cell>
      <cell title="grid" is-link @click.native="handleComponet('grid')"></cell>
      <!-- <cell title="sticky" is-link @click.native="handleComponet('sticky')"></cell> -->
      <!-- <cell title="view-box" is-link></cell> -->

    </group>
    <group title="表单">
      <cell title="calendar" is-link @click.native="handleComponet('calendar')"></cell>
      <cell title="cell-box" is-link @click.native="handleComponet('cellbox')"></cell>
      <cell title="cell-form-preview" is-link @click.native="handleComponet('cellpre')"></cell>
      <cell title="cell" is-link @click.native="handleComponet('cell')"></cell>
      <cell title="datetime" is-link @click.native="handleComponet('datetime')"></cell>
      <cell title="popup-picker" is-link @click.native="handleComponet('popuppicker')"></cell>
      <cell title="popup-radio" is-link @click.native="handleComponet('popupradio')"></cell>
      <cell title="swipeout" is-link @click.native="handleComponet('swipeout')"></cell>
      <cell title="search" is-link></cell>
      <cell title="x-switch" is-link></cell>
      <cell title="x-input" is-link></cell>
      <cell title="x-number" is-link></cell>
      <cell title="x-textarea" is-link></cell>
      <cell title="x-address" is-link></cell>
    </group>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame'
import {Group, Cell} from 'vux'

export default {
  components: {
    VmFrame,
    Group,
    Cell
  },
  methods: {
    handleComponet (name) {

      api.openWin({
        name: name,
        url: name + '_win.html'
      })
    },

    onReady () {
    }
  }
}
</script>
