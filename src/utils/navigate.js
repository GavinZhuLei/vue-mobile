import { getQueryStringByName } from './tools'

export default {
  open(name, params) {
    try {
      window.api.openWin({
        name,
        url: `${name}.html`,
        pageParam: params,
      })
    } catch {
      if (params) {
        if (typeof params === 'object') {
          params = JSON.stringify(params)
        }
        const ecParams = encodeURI(params)
        window.location.href = `/${name}.html?params=${ecParams}`
      } else {
        window.location.href = `/${name}.html`
      }
    }
  },

  getParams() {
    try {
      return window.api.pageParam
    } catch {
      const paramsTxt = decodeURI(getQueryStringByName('params'))
      try {
        return JSON.parse(paramsTxt)
      } catch {
        return paramsTxt
      }
    }
  },

  getParam(name) {
    try {
      const params = window.api.pageParam
      if (params[name]) {
        return params[name]
      }
      return null
    } catch {
      const paramsTxt = decodeURI(getQueryStringByName('params'))
      try {
        const params = JSON.parse(paramsTxt)
        return params[name]
      } catch {
        return null
      }
    }
  },

  back(name) {
    try {
      if (name) {
        window.api.closeWin({
          name,
        })
      } else {
        window.api.closeWin()
      }
    } catch {
      if (!name) {
        window.history.back()
      }
    }
  },

  backTo(name) {
    try {
      window.api.closeToWin({
        name,
      })
    } catch {
      window.location.href = `/${name}.html`
    }
  },
}
