import CONFIG from '@/config'
type METHOD = "POST" | "GET" | "PUT" | "DELETE"

let header = {
  'content-type': 'application/json',
  "Authorization": ''
}
function request(url: string, data: any, method: METHOD = "GET", config = { header }) {
  const token = uni.getStorageSync("token")

  config.header = {
    ...(config.header),
    Authorization: token
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: CONFIG.APP_API_URL + (url.startsWith('/') ? url : '/' + url),
      data,
      method,
      ...config,
      success: (res: any) => {
        if (res.data.code === 200)
          resolve(res.data)
        else {
          reject(res.data)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}


function get(url: string, config?: any) {
  return request(url, null, 'GET', config)
}

function post(url: string, data?: any, config?: any) {
  return request(url, data, 'POST', config)
}

function put(url: string, data?: any, config?: any) {
  return request(url, data, 'PUT', config)
}

function del(url: string, config?: any) {
  return request(url, null, 'DELETE', config)
}


export default {
  get,
  post,
  put,
  delete: del
}
