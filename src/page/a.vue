<template>
  <page>
    <div>这是A页面</div>

    <div>

      <cube-button type="primary" @click="handleRefresh">刷新数据</cube-button>
      <cube-button type="primary" @click="handleAdd">添加数据</cube-button>
      <div>------</div>
      <div v-for="item in list" :key="item.id">
        {{item.id}}--{{item.name}}
      </div>
    </div>

    <cube-button type="primary" @click="handleGoto">跳转到B</cube-button>

    <page-view></page-view>
  </page>
</template>

<script>
import Page from '../components/Page'
import PageView from '../components/View'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    Page,
    PageView
  },
  computed: {
    ...mapGetters('test', {
      list: 'getList'
    })
  },
  mounted () {
    console.log(this.$store)
  },
  methods: {
    ...mapActions('test', ['refreshList', 'upRefreshList']),
    handleGoto () {
      this.$router.push({name: 'b'})
    },
    handleRefresh () {
      this.refreshList()
    },
    handleAdd () {
      this.upRefreshList()
    }
  }
}
</script>
