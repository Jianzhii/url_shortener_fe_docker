import axios from 'axios'
import { ElMessage } from 'element-plus'

// create an axios instance
const service = axios.create({
    baseURL: process.env.BACKEND_BASE_API || `http://localhost:3000`, // url = base url + request url
    timeout: 5000, // request timeout
})

// response interceptor
service.interceptors.response.use(
    (response) => {
        const res = response.data
        if (res.status !== 200 && res.status !== 201) {
            ElMessage({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000,
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    (error) => {
        error = error.response.data
        // console.log('err' + error.message) // for debug
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        })
        return Promise.reject(error)
    }
)

export default service
