import { notification } from 'antd'
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'http://localhost:9999'

interface Token {
  access_token: string
  refresh_token?: string
  token_type?: string
}

const shouldAuth = false

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 如果不需要认证，直接返回
    if (!shouldAuth) return config
    try {
      // jwt auth
      const tokenCache = localStorage.getItem('token')
      if (tokenCache != null) {
        const token = JSON.parse(tokenCache) as Token
        config.headers.Authorization = `${token.token_type ?? 'Bearer'} ${token.access_token}`
      }
    } catch (e) {
      console.error(e)
    }
    return config
  },
  async (error) => {
    console.log('request error')
    return await Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error: AxiosError) {
    let errMsg = ''

    switch (error.code) {
      case AxiosError.ERR_NETWORK:
        errMsg = '网络错误'
        break
      case AxiosError.ERR_INVALID_URL:
        errMsg = '无效的 URL'
        break
      case AxiosError.ERR_BAD_RESPONSE:
        errMsg = '无效的响应'
        break
      case AxiosError.ERR_BAD_REQUEST:
        errMsg = '无效的请求'
        break
      case AxiosError.ETIMEDOUT:
        errMsg = '请求超时'
        break
      default:
        errMsg = '未知错误'
    }

    notification.error({
      message: errMsg,
      description: error.message,
      duration: 3
    })
    return await Promise.reject(error)
  }
)

export const request = axios

export const fetcher = async (url: string): Promise<any> =>
  await request.get(url).then((res: AxiosResponse) => res.data)
