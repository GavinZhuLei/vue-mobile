<template>
  <div class="page">
    <slot name="header"></slot>

    <div class="main">
      <slot name="bar"></slot>
      <div class="a-content" :style="{'top': headerHeightVW+'vw'}">
          <a-scroll ref="scroller"
            :pullDownRefresh="pullDownRefreshObj"
            @pullingDown="onPullingDown"
            :pullUpLoad="pullUpLoadObj"
            @pullingUp="onPullingUp"
            :scrollbar="scrollbarObj"
          >

              <slot></slot>

          </a-scroll>
          <slot name="blank"></slot>
      </div>
    </div>

    <page-view></page-view>
  </div>
</template>

<script>
import AScroll from './Scroll'
import PageView from './View'

export default {
  components: {
    AScroll,
    PageView
  },
  props: {
    pullDownRefresh: {
      type: Boolean,
      default: false,
    },
    scrollbar: {
      type: Boolean,
      default: false,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    headerHeightVW: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      scrollbarFade: true,
      pullUpLoadThreshold: 0,
      canLoad: true,
    }
  },
  computed: {
    pullDownRefreshObj() {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop),
      } : false
    },
    scrollbarObj() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false
    },
    pullUpLoadObj() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt },
      } : false
    },
  },

  created() {
    const language = localStorage.getItem('language')
    if (language) {
      this.$i18n.locale = language
    } else {
      this.$i18n.locale = 'zh-CN'
      localStorage.setItem('language', 'zh-CN')
    }
  },
  mounted() {
    this.$emit('on-ready', {
      l: 0, t: 0, w: 375, h: 46,
    })
  },
  methods: {
    onPullingDown() {
      this.$emit('on-refresh')
    },
    finishRefresh() {
      this.$refs.scroller.forceUpdate(true)
      this.$refs.scroller.openPullUp()
      this.canLoad = true
      this.$refs.scroller.openPullUp()
    },
    scrollRefresh() {
      this.$refs.scroller.refresh()
    },
    onPullingUp() {
      // 更新数据更新数据
      if (this.canLoad) {
        this.$emit('on-load')
      } else {
        this.endLoad()
      }
    },
    updateLoad() {
      this.$refs.scroller.forceUpdate(true)
    },
    endLoad() {
      this.$refs.scroller.forceUpdate(false)
      this.$nextTick(() => {
        this.$refs.scroller.closePullUp()
        this.canLoad = false
      })
    },
    openPullUp() {
      this.$refs.scroller.openPullUp()
    },

    scrollTop() {
      this.$refs.scroller.scrollTop()
    },

    initScroll() {
      this.$refs.scroller.scrollTop()
      this.$refs.scroller.openPullUp()
      this.canLoad = true
    },
  },
}
</script>


<style lang="scss">
.page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-flow: column;
          flex-flow: column;

  background: #f5f5f5;
  color: rgba(0,0,0,.75);
}
.main{
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  font-size: 13px;
}
.header{
  // z-index: 99999;
  position: relative;
  color: #fff;
  background: #F59900;

  .van-nav-bar__title{
    font-size: 18px;
  }

  .van-nav-bar__text{
    color: #fff;
    font-size: 16px;
    background: #F59900;
  }

  .van-icon{
    font-size: 24px !important;
    color: #fff;
  }
}

.a-content{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;

  .bscroll-vertical-scrollbar{
    width: 4px !important;
    // right: 0 !important;
  }
}

.van-pull-refresh{
  height: 100%;

  .van-pull-refresh__track{
    height: 100%;
    overflow: auto;
  }
}
</style>
