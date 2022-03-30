import axios from "axios"
import store from "../store"

const http = axios.create({
  baseURL: "http://api-ccw.com:3000",
  headers: { "content-type": "application/json"  },
})

http.interceptors.request.use(
  config => {
    config.headers["X-hip-id"] = 'LwvwBh7syLeMg/E3FGnMB7sl2MNVCoNRF6IiQHdK2ls='
    const isAuthenticated = store.getters["isAuthenticated"]
    if (isAuthenticated) {
      config.headers.common["Authorization"] = store.getters["getAccessToken"]
      
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)
http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

export default http