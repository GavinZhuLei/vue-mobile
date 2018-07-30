import Vue from 'vue'
import Vuex from 'vuex'
import test from './test'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test
  }
})

export default store
