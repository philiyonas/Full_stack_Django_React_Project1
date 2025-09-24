import axios from "axios"       // import axios for HTTP requests
import { ACCESS_TOKEN } from "./constants" // localStorage key for token

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL  // Vite env var (must start with VITE_)
})

/**request interceptor to handle 
 * Request interceptor — adds Authorization header when a token exists.
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            // set Bearer token in Authorization header
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        // propagate errors
        return Promise.reject(error)
    }
)

export default api
