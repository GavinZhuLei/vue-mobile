// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Header, Button } from 'mint-ui'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

import 'vue-awesome/icons/regular/plus-square'

import FastClick from 'fastclick'

FastClick.prototype.focus = function (targetElement) {
  'use strict'
  targetElement.focus()
}

FastClick.attach(document.body)

Vue.component('icon', Icon)


Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
