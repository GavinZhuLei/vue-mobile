<template>
  <div class="upload-container">
    <div class="upload-photo"  v-for="(item, index) in fileList" :key="item.key">
      <icon class="upload-delete" name="regular/times-circle" @click.native="handleDelete(index)"></icon>
      <div v-if="item.status == 'uploading'" class="upload-percent">
        <span>{{item.percent}}%</span>
      </div>
      <div v-if="item.status == 'error'" class="upload-error">
        <icon name="exclamation-circle" style="font-size: 20px; color: #ef4f4f;"></icon>
      </div>
      <icon @click.native="handleVideoViewer(item)" v-if="type=='video'" name="regular/play-circle" style="position: absolute;font-size: 40px; color: #fff;"></icon>
      <img :src="item.url" v-if="type=='image'" @click="handleViewer(index)">
      <img :src="item.url+'?vframe/png/offset/0'" v-if="type=='video' && item.url.indexOf(domain)>=0">
    </div>
    <div class="upload-text" :style="{display: fileList.length < length ? 'inline-block' : 'none'}">
      <icon name="plus" class="upload-icon"></icon>
      <input v-if="type == 'image'" ref="uploadFile" accept="image/*" type="file" multiple @change="handleFileChange" class="upload-input">
      <input v-if="type == 'video'" ref="uploadFile" accept="video/*" type="file" multiple @change="handleFileChange" class="upload-input">
    </div>

    <image-viewer ref="uploadViewer" :imgs="fileList.map(item => ({src: item.url}))"></image-viewer>
    <!-- <image-viewer ref="uploadViewer" :imgs="[{src: 'http://p72b5q4gf.bkt.clouddn.com/FiQ12ONNGPiLy785ty7zbI3DygM6'}]"></image-viewer> -->

    <video-viewer ref="videoViewer"  v-model="videoVisible" :src="videoSrc" :pic="videoPic"></video-viewer>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import ImageViewer from './ImageViewer'
import VideoViewer from './VideoViewer'
import config from '../util/config.js'

export default {
  components: {
    ImageViewer,
    VideoViewer
  },
  props: {
    value: {
      type: Array
    },
    length: {
      type: Number,
      default: 9
    },
    token: {
      type: String
    },
    type: {
      type: String,
      default: 'image'
    }
  },
  data () {
    return {
      fileList: this.value,
      domain: config.qiniuDomain,
      videoVisible: false,
      videoViewerShow: false,
      videoSrc: '',
      videoPic: ''
    }
  },
  mounted () {

  },
  methods: {
    handleViewer (index) {
      this.$refs.uploadViewer.show(index)
    },
    handleVideoViewer (video) {
      console.log('video', video.url)
      this.videoSrc = video.url
      this.videoPic = video.url + '?vframe/png/offset/0'
      this.$nextTick(() => {
        this.videoVisible = true
      })
    },
    handleFileChange () {
      console.log('file', this.$refs.uploadFile.files)
      const files = this.$refs.uploadFile.files

      if (this.length < this.fileList.length + files.length) {
        this.$createToast({
          txt: `您最多还可以上传${this.length - this.fileList.length}张图片`,
          type: 'warn',
          time: 2000
        }).show()
        return false
      }

      for (let i = 0; i < files.length; i++) {
        let file = files[i]

        const reader = new FileReader()

        const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

        reader.onload = () => {
          this.fileList.push({
            key,
            url: reader.result,
            percent: 0,
            status: 'uploading'
          })

          console.log('file....', file)

          this.$nextTick(() => [
            // this.uplaodAction(file, key)
            this.uplaodAction2(reader.result, file, key)
          ])
        }

        reader.readAsDataURL(file)
      }
    },
    uplaodAction2 (res, file, key) {
      var pic = res.split(',')[1]
      console.log('res...', file.size, key)
      var url = 'http://upload-z2.qiniu.com/putb64/' + file.size // 非华东空间需要根据注意事项 1 修改上传域名
      var xhr = new XMLHttpRequest()

      let changeIndex = -1
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].key === key) {
          changeIndex = i
          break
        }
      }

      const _this = this

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          let resData = JSON.parse(xhr.response)
          console.log('----', resData)
          if (resData.key) {
            _this.$set(_this.fileList[changeIndex], 'percent', 100)
            setTimeout(() => {
              _this.$set(_this.fileList, changeIndex, {
                ..._this.fileList[changeIndex],
                url: _this.domain + resData.key,
                status: 'complete',
                percent: 100
              })

              let completeList = []
              _this.fileList.forEach(item => {
                if (item.status === 'complete') {
                  completeList.push(item)
                }
              })

              _this.$emit('input', completeList)
            }, 200)
          } else {
            _this.fileList[changeIndex].status = 'error'
          }
        }
      }
      xhr.onloadstart = () => {
        console.log('222', xhr.readyState)
      }
      xhr.onprogress = (res) => {
        console.log('progress', res)

        if (res.total) {
          if (typeof res.total === 'number') {
            _this.$set(_this.fileList[changeIndex], 'percent', res.total)
            // _this.fileList[changeIndex].percent = parseInt(res.total)
          } else {
            _this.fileList[changeIndex].percent = parseInt(res.total.percent)
          }
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/octet-stream')
      xhr.setRequestHeader('Authorization', 'UpToken ' + this.token)
      xhr.send(pic)
    },
    uplaodAction (file, key) {
      const _this = this
      let index = -1
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].key === key) {
          index = i
          break
        }
      }
      const observable = qiniu.upload(file, key, this.token, {
        fname: key,
        mimeType: ['image/png', 'image/jpeg', 'image/gif']
      }, {
        useCdnDomain: true,
        region: qiniu.region.z2
      })

      /* const subscription = */ observable.subscribe({
        next (res) {
          console.log('next', res.total.percent, index)
          _this.fileList[index].percent = parseInt(res.total.percent)
        },
        error (err) {
          console.log('error', err)

          _this.fileList[index].status = 'error'
        },
        complete (res) {
          console.log('complete', res)

          _this.$set(_this.fileList, index, {
            ..._this.fileList[index],
            url: _this.domain + res.key,
            status: 'complete'
          })

          let completeList = []
          _this.fileList.forEach(item => {
            if (item.status === 'complete') {
              completeList.push(item)
            }
          })

          _this.$emit('input', completeList)
        }
      })
    },
    handleDelete (index) {
      this.fileList.splice(index, 1)

      let completeList = []
      this.fileList.forEach(item => {
        if (item.status === 'complete') {
          completeList.push(item)
        }
      })

      this.$emit('input', completeList)
    }
  }
}
</script>

<style scoped>
.upload-text{
  width: 70px;
  height: 70px;
  background: #fff;
  border: 1px dashed #333;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 10px 10px 0px 0;
}
.upload-icon{
  font-size: 30px;
  color: #666;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -15px;
  margin-top: -15px;
}
.upload-input{
  position: absolute;
  top: 0;
  left:0;
  right: 0;
  bottom: 0;
  opacity: 0;
  width: 100%;
}
.upload-photo{
  height: 70px;
  width: 70px;
  margin: 10px 10px 5px 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  border: 1px solid #333;
  position: relative;
  vertical-align: top;
}
.upload-photo img{
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
.upload-delete{
  position: absolute;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #000;
  color: #fff;
  border-radius: 50%;
  z-index: 2;
}
.upload-percent{
  position: absolute;
  left:0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #fff;
  background: rgba(0,0,0,0.5);
  z-index: 1;
  text-align: center;
  padding-top:25px;
  font-size: 20px;
}
.upload-error {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1;
  text-align: center;
  padding-top:25px;
  font-size: 20px;
}
</style>
