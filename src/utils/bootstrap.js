
import Vue from 'vue';
import Vant, { Locale } from 'vant';
import FastClick from 'fastclick';
import 'vant/lib/index.css';
import zhCN from 'vant/lib/locale/lang/zh-CN';
import enUS from 'vant/lib/locale/lang/en-US';
import i18n from '../language'

export default {
  init: (app, router, store) => {
    const language = localStorage.getItem('language')

    if (language) {
      if (language === 'zh-CN') {
        Locale.use('zhCN', zhCN)
      } else {
        Locale.use('enUS', enUS)
      }
    } else {
      Locale.use('zhCN', zhCN);
    }

    Vue.config.productionTip = false;

    FastClick.prototype.focus = (targetElement) => {
      targetElement.focus()
    }

    FastClick.attach(document.body)

    Vue.use(Vant)

    new Vue({
      i18n,
      router,
      store,
      render: h => h(app),
    }).$mount('#app');
  },
}
