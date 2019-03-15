<template>
  <div class="canvasBox" :style="getHorizontalStyle">
    <canvas></canvas>
  </div>
</template>

<script>
import Draw from '../utils/draw.js'

export default {
  data() {
    return {
      draw: null,
      degree: 0,
    }
  },
  mounted() {
    this.initCanvas()
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      setTimeout(() => {
        this.draw = new Draw(canvas, -this.degree);
      }, 500)
    },
    getHorizontalStyle() {
      const d = document;
      let w = 0
      let h = 0

      try {
        w = api.screenWidth
        h = api.screenHeight
      } catch {
        w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
        h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      }

      let length = (h - w) / 2;
      let width = w;
      let height = h;

      switch (this.degree) {
        case -90:
          length = -length;
        case 90:
          width = h;
          height = w;
          break;
        default:
          length = 0;
      }
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector('canvas'));
        this.canvasBox.appendChild(document.createElement('canvas'));
        setTimeout(() => {
          this.initCanvas();
        }, 200);
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        'transform-origin': 'center center',
      };
    },
    getImage() {
      return this.draw.getPNGImage()
    },
  },
}
</script>

<style lang="scss">
.canvasBox{
  display: flex;
  justify-content: center;
  padding: 8px;

  canvas {
    flex: 1;
    cursor: crosshair;
    border: 2px dashed rgba(0,0,0,.75);

  }
}
</style>
