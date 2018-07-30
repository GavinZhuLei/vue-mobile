import {getAuthUrl} from './tools'

let config = {
  qiniuDomain: ''
}

if (process.env.NODE_ENV === 'development') {
  config = {
    ...config,
    origin: '',
    db: '',
    accountCode: '',
    code: null,
    url: getAuthUrl(),
    jsApiList: [],
    agentId: ''
  }
} else if (process.env.NODE_ENV === 'production') {
  config = {
    ...config,
    origin: '',
    db: '',
    accountCode: '',
    code: null,
    url: getAuthUrl(),
    jsApiList: [],
    agentId: ''
  }
}
console.log(config)
export default config
