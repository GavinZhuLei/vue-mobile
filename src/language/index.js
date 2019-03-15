
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhHK from './zh-HK'
import enUS from './en-US'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en-US',
  fallbackLocale: 'zh-HK',
  messages: {
    'zh-HK': zhHK,
    'en-US': enUS,
  },
})
