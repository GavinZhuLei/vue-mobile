<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
      It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">

      <!-- Container that holds slides.
        PhotoSwipe keeps only 3 of them in the DOM to save memory.
        Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">

        <div class="pswp__top-bar">

          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

          <!-- <button class="pswp__button pswp__button--share" title="Share"></button> -->

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
            </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>

        </div>

    </div>

    <cube-toast v-model="toastVisible" txt="图片加载中" :time="0" :mask="true"></cube-toast>

  </div>
</template>

<script>
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import PhotoSwipe from 'photoswipe/dist/photoswipe.js'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.js'

export default {
  props: {
    imgs: {
      type: Array
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      imageList: [],
      pswpElement: null,
      options: {
        index: this.index,
        history: false
      },
      gallery: null,
      loaded: false,
      set: null,
      toastVisible: false
    }
  },
  mounted () {
    console.log('photoswipe', PhotoSwipe, PhotoSwipeUIDefault)

    console.log('3333', this.calcIamge())
  },
  methods: {
    calcIamge () {
      let loadIamge = []
      this.imageList = Array.apply(Array(this.imgs.length))
      const _this = this
      for (let i = 0; i < this.imgs.length; i++) {
        loadIamge.push(new Promise((resolve, reject) => {
          let img = new Image()
          img.src = this.imgs[i].src
          // img.src = 'http://p72b5q4gf.bkt.clouddn.com/FiQ12ONNGPiLy785ty7zbI3DygM6'
          img.onload = function () {
            _this.imageList[i] = {
              ..._this.imgs[i],
              w: this.width,
              h: this.height
            }

            console.log('2222', _this.imageList)

            resolve()
          }
        }))
      }

      return loadIamge
    },
    show (index) {
      this.toastVisible = true
      this.options.index = index
      if (this.loaded) {
        this.galleryShow()
      } else {
        Promise.all(this.calcIamge()).then(() => {
          console.log('promise...')
          this.loaded = true
          this.galleryShow()
        })
      }
    },
    galleryShow () {
      this.toastVisible = false
      this.pswpElement = document.querySelectorAll('.pswp')[0]

      this.gallery = new PhotoSwipe(this.pswpElement, PhotoSwipeUIDefault, this.imageList, this.options)

      const _this = this
      this.gallery.listen('unbindEvents', function () { })
      this.gallery.listen('close', function () {
        _this.gallery.close()
      })

      this.gallery.init()
    }
  },
  watch: {
    imgs: {
      deep: true,
      handler (val) {
        this.loaded = false
        Promise.all(this.calcIamge()).then(() => {
          console.log('promise...')
          this.loaded = true
        })
      }
    }
  }
}
</script>
