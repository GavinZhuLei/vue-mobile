'use strict'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.

import App from './App'
import router from './router'
import FastClick from 'fastclick'
import 'normalize.css/normalize.css'
import rpc from './service/rpc'
import Icon from 'vue-awesome/components/Icon'

import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/regular/times-circle'
import 'vue-awesome/icons/exclamation-circle'
import 'vue-awesome/icons/regular/play-circle'

import Cube from './cube'
import Mand from './mand'
import Mint from './mint'

import config from './util/config'

require('babel-polyfill/dist/polyfill.js')

Cube(Vue)
Mand(Vue)
Mint(Vue)

FastClick.prototype.focus = function (targetElement) {
  'use strict'
  targetElement.focus()
}

FastClick.attach(document.body)

console.log('xxx', navigator.userAgent)
Vue.config.productionTip = false

rpc.setHost(config.origin, config.db, config.accountCode)
// const rpcDef = rpc.dingtalkLogin(config.code, config.url, config.jsApiList, config.agentId)

Vue.prototype.rpc = rpc

Vue.component('icon', Icon)

router.beforeEach((to, from, next) => {
  /*
  if (!rpc.isLogined()) {
    console.log('not login')
    rpcDef.then((res) => {
      console.log('auth', res)
      next()
    }).catch((msg) => {
      console.log('error', msg)
    })
  } else {
    next()
  }
  */
  next()
})

router.afterEach((to, from) => {
  // ...
  console.log(to)
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
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
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
