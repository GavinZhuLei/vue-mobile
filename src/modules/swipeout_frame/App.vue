<template>
  <vm-frame>
    <div class="vux-1px-t">

    <swipeout>

      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">Yes</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">Right</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
        JavaScript is the best language
        </div>
      </swipeout-item>

      <swipeout-item :threshold=".5" underlay-color="#ccc">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" background-color="#336DD6">Fav</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" background-color="#D23934">Delete</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-tb">
        threshold = 0.5
        </div>
      </swipeout-item>

      <swipeout-item :disabled="disabled" ref="swipeoutItem" :right-menu-width="210" :sensitivity="15">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary" :width="70">Fav</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn" :width="70">Delete</swipeout-button>
          <swipeout-button @click.native="onButtonClick('ignore')" type="default" :width="70">Ignore</swipeout-button>
        </div>

        <div slot="left-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">Fav</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">Delete</swipeout-button>
        </div>

        <div slot="content" class="demo-content vux-1px-b">

        now <span v-if="disabled">disabled</span>
        <span v-else>enabled</span>
        </div>
      </swipeout-item>

    </swipeout>
  </div>


    <div style="padding:15px;">
      <x-button @click.native="disabled = false" type="primary" :disabled="!disabled">set Enabled</x-button>
      <x-button @click.native="disabled = true" type="warn" :disabled="disabled">set Disabled</x-button>
      <x-button @click.native="$refs.swipeoutItem.open('left')" type="primary">open left menu</x-button>
      <x-button @click.native="$refs.swipeoutItem.open('right')" type="primary">open right menu</x-button>
      <x-button @click.native="$refs.swipeoutItem.close()" type="warn">close menu</x-button>
    </div>
    <br>
    <group-title>use vux-1px to style items</group-title>
    <swipeout class="vux-1px-tb">
      <swipeout-item transition-mode="follow" v-for="i in 3" :key="i">
        <div slot="right-menu">
          <swipeout-button type="primary">Yes</swipeout-button>
          <swipeout-button type="warn">Right</swipeout-button>
        </div>
        <div slot="content" :class="{'vux-1px-b': i !== 3, 'vux-1px-t': i === 1}" style="padding:12px;">JavaScript is the best language</div>
      </swipeout-item>
    </swipeout>
    <br>
    <br>
  </vm-frame>
</template>

<script>
import VmFrame from '../../components/Frame'
import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'

export default {
  components: {
    VmFrame,
    GroupTitle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  methods: {
    onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    }
  },
  data () {
    return {
      disabled: false
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.demo-content {
  padding: 10px 10px;
}
</style>
