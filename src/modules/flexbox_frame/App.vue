<template>
  <vm-frame>
    <div>
      <divider> 水平 </divider>
      <flexbox>
        <flexbox-item><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      </flexbox>
      <br>
      <flexbox>
        <flexbox-item><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item><div class="flex-demo">3</div></flexbox-item>
      </flexbox>
      <br>
      <flexbox>
        <flexbox-item><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item><div class="flex-demo">3</div></flexbox-item>
        <flexbox-item><div class="flex-demo">4</div></flexbox-item>
      </flexbox>
      <br>
      <flexbox>
        <flexbox-item><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item><div class="flex-demo">3</div></flexbox-item>
        <flexbox-item><div class="flex-demo">4</div></flexbox-item>
        <flexbox-item><div class="flex-demo">5</div></flexbox-item>
      </flexbox>
      <br>
      <flexbox>
        <flexbox-item><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item><div class="flex-demo">3</div></flexbox-item>
        <flexbox-item><div class="flex-demo">4</div></flexbox-item>
        <flexbox-item><div class="flex-demo">5</div></flexbox-item>
        <flexbox-item><div class="flex-demo">6</div></flexbox-item>
      </flexbox>
      <br>
      <divider> 水平无间隙 </divider>
      <flexbox :gutter="0">
        <flexbox-item><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item><div class="flex-demo">3</div></flexbox-item>
        <flexbox-item><div class="flex-demo">4</div></flexbox-item>
      </flexbox>
      <br>
      <divider>  </divider>
      <flexbox orient="vertical">
        <flexbox-item><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      </flexbox>
      <br>
      <divider> 垂直无间隙 </divider>
      <flexbox orient="vertical" :gutter="0">
        <flexbox-item><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2</div></flexbox-item>
      </flexbox>
      <br>
      <divider> 网格（12列） </divider>
      <flexbox>
        <flexbox-item :span="4"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item><div class="flex-demo">2/3</div></flexbox-item>
      </flexbox>
      <br>
      <flexbox>
        <flexbox-item :span="6"><div class="flex-demo">6/12</div></flexbox-item>
        <flexbox-item :span="2"><div class="flex-demo">2/12</div></flexbox-item>
        <flexbox-item ><div class="flex-demo">rest</div></flexbox-item>
      </flexbox>
      <br>
      <divider> 弹性网格 </divider>
      <flexbox>
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/6"><div class="flex-demo">1/6</div></flexbox-item>
        <flexbox-item :span="1/8"><div class="flex-demo">1/8</div></flexbox-item>
        <flexbox-item :span="1/8"><div class="flex-demo">1/8</div></flexbox-item>
        <flexbox-item><div class="flex-demo">rest</div></flexbox-item>
      </flexbox>
      <br>
      <flexbox :gutter="0">
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/6"><div class="flex-demo">1/6</div></flexbox-item>
        <flexbox-item :span="1/8"><div class="flex-demo">1/8</div></flexbox-item>
        <flexbox-item :span="1/8"><div class="flex-demo">1/8</div></flexbox-item>
        <flexbox-item><div class="flex-demo">rest</div></flexbox-item>
      </flexbox>
      <br>
      <divider> 弹性网格 </divider>
      <flexbox :gutter="0">
        <flexbox-item :span="1/3" :order="4"><div class="flex-demo">1</div></flexbox-item>
        <flexbox-item :span="1/6" :order="3"><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item :span="1/8" :order="2"><div class="flex-demo">3</div></flexbox-item>
        <flexbox-item :span="1/8" :order="1"><div class="flex-demo">4</div></flexbox-item>
        <flexbox-item :order="-99"><div class="flex-demo">5</div></flexbox-item>
      </flexbox>
      <br>
      <divider>flex-wrap</divider>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">1/3</div></flexbox-item>
      </flexbox>

    </div>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame'
import { Flexbox, FlexboxItem, Divider } from 'vux'

export default {
  components: {
    VmFrame,
    Flexbox,
    FlexboxItem,
    Divider
  }

}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>
