<template>
  <div class="page">
    <div class="wrapper">
      <main class="content">
        <slot></slot>
      </main>
    </div>

    <cube-toast txt='' :time="0" :mask="true" v-model="loadingVisible"></cube-toast>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  created () {
    if (this.title) {
      document.title = this.title
      var i = document.createElement('iframe')
      i.src = '/favicon.ico'
      i.style.display = 'none'
      i.onload = function () {
        setTimeout(function () {
          i.remove()
        }, 9)
      }
      document.body.appendChild(i)
    }
  },
  data () {
    return {
      loadingVisible: false
    }
  },
  methods: {
    showLoading () {
      this.loadingVisible = true
    },
    hideLoading () {
      this.loadingVisible = false
    }
  },
  watch: {
    title (val) {
      if (val) {
        document.title = this.title
        var i = document.createElement('iframe')
        i.src = '/favicon.ico'
        i.style.display = 'none'
        i.onload = function () {
          setTimeout(function () {
            i.remove()
          }, 9)
        }
        document.body.appendChild(i)
      }
    }
  }
}
</script>


<style lang="scss">
.page {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  // right: 0;
  bottom: 0;
  // background: #efeff4;
  background: #efeff4;
  overflow: hidden;

  & > .wrapper {
    height: calc(100%);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
