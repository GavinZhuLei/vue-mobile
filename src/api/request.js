import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'

const request = axios.create({
  withCredentials: true,
})

request.interceptors.request.use(
  (config) => {
    console.log(config)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Openerp-Session-Id': Cookies.get('token'),
    }

    config.data = qs.stringify(config.data)

    return config
  },
  (error) => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  },
)

request.interceptors.response.use(
  (response) => {
    console.log('response', response)
    if (response.data.errcode === 0) {
      return response.data.data
    }
    return Promise.reject(response.data.msg)
  },
  (error) => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  },
)

export default request
