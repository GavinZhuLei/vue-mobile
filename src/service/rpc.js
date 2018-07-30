class OdooCorsRpc {
  constructor () {
    this.request_counts = 0
    this.session_id = undefined
    this.host = undefined
    this.db = undefined
    this.account_code = undefined

    if (window.hasOwnProperty('wx') === true) {
      window.wxSdk = window.wx
    } else if (window.hasOwnProperty('dd') === true) {
      if (!this.checkPc()) {
        window.ddsdk = window.dd
      } else {
        window.ddsdk = window.DingTalkPC
      }
    }
  }

  checkPc () {
    let userAgentInfo = navigator.userAgent
    let Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod'
    ]
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) >= 0) {
        return false
      }
    }
    return true
  }

  isLogined () {
    return this.session_id !== undefined
  }

  setHost (host, db, accountCode) {
    this.host = host
    this.db = db
    this.account_code = accountCode
  }

  static setCookie (name, value, ttl) {
    ttl = ttl || 24 * 60 * 60 * 365
    document.cookie = [
      name + '=' + value,
      'path=/',
      'max-age=' + ttl,
      'expires=' + new Date(new Date().getTime() + ttl * 1000).toGMTString()
    ].join(';')
  }

  rpcSendRequest (url, jsonData) {
    // clear session_id in cookie
    OdooCorsRpc.setCookie('session_id', '', -1)

    return new Promise((resolve, reject) => {
      // create a new asynchronous request
      let request = new XMLHttpRequest()

      // open the request
      request.open('POST', this.host + url, true)

      // Define the content type : JSON-RPC -> application/json
      request.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      )

      // set the response type
      request.responseType = 'json'

      // set the mime type
      if (request.overrideMimeType) request.overrideMimeType('application/json')

      // append session_id
      if (this.session_id && this.session_id !== '') {
        request.withCredentials = true
        request.setRequestHeader('X-Openerp-Session-Id', this.session_id)
      }

      request.onload = () => {
        if (request.status === 200) {
          let data = {}

          if (typeof request.response === 'string') {
            data = JSON.parse(request.response)
          } else {
            data = request.response
          }

          if (data && data.error) {
            reject(data.error)
          } else if (!data.result) {
            reject(Error('no result in data received'))
          } else if (
            typeof data.result === 'object' &&
            'records' in data.result
          ) {
            resolve(data.result.records)
          } else {
            resolve(data.result)
          }
        } else {
          reject(Error('Fail to get ' + url))
        }
      }

      try {
        request.send(JSON.stringify(jsonData))
      } catch (error) {
      }

      this.request_counts += 1
    })
  }

  login (db, login, password) {
    return new Promise((resolve, reject) => {
      // construct the data
      let jsonData = {
        jsonrpc: '2.0',
        method: 'call',
        params: { db: db, login: login, password: password },
        id: 'r' + this.request_counts
      }
      // send the request
      this.rpcSendRequest('/web/session/authenticate', jsonData).then(
        rst => {
          if (rst.uid !== false) {
            this.session_id = rst.session_id
            resolve(rst)
          } else {
            reject(Error('Fail to login in database'))
          }
        },
        error => {
          reject(error)
        }
      )

      this.request_counts += 1
    })
  }

  odooRpcAuth (route, code, agentId) {
    return new Promise((resolve, reject) => {
      if (!code || code === '') {
        reject(Error('the code param is invalidate'))
      }

      // construct the data
      let jsonData = {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          code: code,
          db: this.db,
          account_code: this.account_code,
          agent_id: agentId
        },
        id: 'r' + this.request_counts
      }

      // send the request
      this.rpcSendRequest(route, jsonData).then(
        rst => {
          if (rst.uid !== false) {
            this.session_id = rst.session_id
            resolve(rst)
          } else {
            reject(Error('Fail to authenticate'))
          }
        },
        error => {
          reject(error)
        }
      ).catch(err => {
        console.log(err)
      })
    })
  }

  configDingTalk (config) {
    return new Promise((resolve, reject) => {
      try {
        window.ddsdk.error(err => {
          console.log('钉钉认证出错')
          reject(err)
        })

        window.ddsdk.config(config)
        window.ddsdk.ready(() => {
          resolve(config)
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  getDingTalkCode (config) {
    return new Promise((resolve, reject) => {
      window.ddsdk.runtime.permission.requestAuthCode({
        corpId: config.corpId,
        onSuccess: info => {
          resolve(info.code)
        },
        onFail: err => {
          console.log(err)
          reject(err)
        }
      })
    })
  }

  getDingTalkConfig (uncheckedURL) {
    return new Promise((resolve, reject) => {
      if (!uncheckedURL || uncheckedURL === '') {
        reject(Error('the uncheckedURL param is invalidate'))
      }

      let xhr = new XMLHttpRequest()
      xhr.responseType = 'json'

      let url =
        this.host +
        '/dingtalk/auth_config/' +
        '?url=' +
        uncheckedURL +
        '&account_code=' +
        this.account_code
      xhr.open('GET', url, true)

      xhr.onload = rst => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(Error('Fail to login in database'))
        }
      }
      xhr.send(null)
    })
  }

  dingtalkLogin (code, url, jsApiList, agentId) {
    if (!jsApiList) {
      return this.odooRpcAuth('/dingtalk/auth/', code, agentId)
    }
    // jsApi
    return new Promise((resolve, reject) => {
      console.log('dingtakk login')
      this.getDingTalkConfig(url)
        .then(config => {
          let _config = {}
          _config.agentId = agentId
          _config.corpId = config.corp_id
          _config.timeStamp = config.timestamp
          _config.nonceStr = config.noncestr
          _config.signature = config.signature
          _config.jsApiList = jsApiList
          return this.configDingTalk(_config)
        })
        .then(_config => {
          return this.getDingTalkCode(_config)
        })
        .then(_code => {
          return this.odooRpcAuth('/dingtalk/auth/', _code, agentId)
        })
        .then(() => {
          console.log('Odoo权限验证成功')
          resolve()
        })
        .catch(err => {
          console.log(err)
          console.log('在取得Odoo权限验证中出现错误')
          reject(err)
        })
    })
  }

  configWechat (config) {
    return new Promise((resolve, reject) => {
      let error = false
      window.wxSdk.config(config)
      window.wxSdk.ready(() => {
        if (!error) {
          resolve(config)
        }
      })
      window.wxSdk.error(err => {
        error = true
        console.log(`config wechat error ${JSON.stringify(err)}`)
        reject(err)
      })
    })
  }

  getWechatConfig (uncheckedURL, accountCode, agentId) {
    return new Promise((resolve, reject) => {
      if (!uncheckedURL || uncheckedURL === '') {
        reject(Error('the uncheckedURL param is invalidate'))
      }
      // construct the data
      let jsonData = {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          url: uncheckedURL,
          account_code: accountCode,
          agent_id: agentId
        },
        id: 'r' + this.request_counts
      }
      // send the request
      this.rpcSendRequest('/cdtct_wechat/auth_config/', jsonData).then(
        rst => {
          resolve(rst)
        },
        error => {
          console.log(error)
          reject(error)
        }
      )
    })
  }

  wechatLogin (code, authUrl, jsApiList, agentId, debug) {
    if (!jsApiList) {
      return this.odooRpcAuth('/cdtct_wechat/auth/', code, agentId)
    }
    // jsApi
    return new Promise((resolve, reject) => {
      this.getWechatConfig(authUrl, this.account_code, agentId)
        .then(config => {
          let _config = {}
          _config.debug = debug
          _config.appId = config.appId
          _config.timestamp = config.timestamp
          _config.nonceStr = config.noncestr
          _config.signature = config.signature
          _config.jsApiList = jsApiList
          return this.configWechat(_config)
        })
        .then(() => {
          return this.odooRpcAuth('/cdtct_wechat/auth/', code, agentId)
        })
        .then(() => {
          console.log('Odoo权限验证成功')
          resolve()
        })
        .catch(err => {
          console.log(err)
          console.log('在取得Odoo权限验证中出现错误')
          reject(err)
        })
    })
  }

  searchRead (model, params) {
    let iParams = params || {}
    iParams.model = model
    let jsonData = {
      jsonrpc: '2.0',
      method: 'call',
      params: iParams,
      id: 'r' + this.request_counts
    }
    return this.rpcSendRequest('/web/dataset/search_read', jsonData)
  }

  call (model, method, args, params) {
    let _self = this
    let jsonData = {
      jsonrpc: '2.0',
      params: {
        model: model,
        method: method,
        args: args || [[]],
        kwargs: params || {}
      },
      id: 'r' + _self.request_counts
    }

    return this.rpcSendRequest('/web/dataset/call_kw', jsonData)
  }

  create (model, datas) {
    return this.call(model, 'create', datas)
  }

  update (model, id, data) {
    return this.call(model, 'write', [id, data])
  }

  del (model, ids) {
    return this.call(model, 'unlink', [ids])
  }
}

let rpc = new OdooCorsRpc()
export default rpc
