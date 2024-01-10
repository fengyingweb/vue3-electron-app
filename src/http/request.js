import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 60000 // 请求超时时间
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL

// request拦截器
axios.interceptors.request.use(
    (config) => {
        NProgress.start()
        if (
            config.method === 'post' &&
            config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
          ) {
            config.data = qs.stringify(config.data)
          }
        return config
    },
    error => {
        NProgress.done()
        Promise.reject(error)
    }
)

// respone拦截器
axios.interceptors.response.use(
    (response) => {
        NProgress.done()
        if (response.data && response.data.code === 403) {
            // logout();
            ElMessage.error(response.data.msg)
        } else if (response.data && response.data.code && response.data.code !== '0' && response.data.code !== 200) {
            // 200 为了 oss 接口添加
            ElMessage.error(response.data.msg)
        } else {
            return response.data
        }
        return response.data
    },
    error => {
        NProgress.done()
        const response = Object.assign({}, error.response)
        if (response) {
            switch (response.status) {
                case 401:
                    ElMessage.error('你还没有登录呦！')
                    break
                case 404:
                    ElMessage.error('没找接口信息')
                    break
                case 500:
                    ElMessage.error('系统异常')
                    break
                default:
                    ElMessage.error(error.message)
                    break
            }
        }
        return Promise.reject(error)
    }
)

export default axios
