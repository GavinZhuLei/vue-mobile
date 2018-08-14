<template>
  <vm-frame>
    <div>
      <group-title>2 columns</group-title>
      <grid>
        <grid-item label="九宫格" v-for="i in 2" :key="i">
          <img slot="icon" src="../../assets/grid_icon.png">
        </grid-item>
      </grid>
      <group-title>3 columns</group-title>
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item link="/component/cell" label="跳转到Cell">
          <img slot="icon" src="../../assets/grid_icon.png">
        </grid-item>
        <grid-item :link="{ path: '/component/cell'}" label="跳转到Cell">
          <img slot="icon" src="../../assets/grid_icon.png">
        </grid-item>
        <grid-item link="/component/cell" @on-item-click="onItemClick">
          <img slot="icon" src="../../assets/grid_icon.png">
          <span slot="label">跳转到Cell</span>
        </grid-item>
      </grid>
      <group-title>4 columns</group-title>
      <grid :show-lr-borders="false">
        <grid-item label="九宫格" v-for="i in 4" :key="i">
          <img slot="icon" src="../../assets/grid_icon.png">
        </grid-item>
      </grid>
      <group-title> 自定义内容 </group-title>
      <grid :show-vertical-dividers="false">
        <grid-item v-for="i in 5" :key="i">
          <span class="grid-center">{{i}}</span>
        </grid-item>
      </grid>
      <group-title> 自定义列 </group-title>
      <grid :cols="3" :show-lr-borders="false">
        <grid-item v-for="i in 6" :key="i">
          <span class="grid-center">{{i}}</span>
        </grid-item>
      </grid>
    </div>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame'
import { Grid, GridItem, GroupTitle } from 'vux'

export default {
  components: {
    VmFrame,
    Grid,
    GridItem,
    GroupTitle
  },
  methods: {
    onItemClick () {
      console.log('on item click')
    }
  }
}
</script>

<style lang="scss">
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
</style>
