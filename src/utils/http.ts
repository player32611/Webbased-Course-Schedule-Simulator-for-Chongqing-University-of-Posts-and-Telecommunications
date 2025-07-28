import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/6805479-6519063-default',
    timeout: 5000,
})

//拦截器
httpInstance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

httpInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export { httpInstance }