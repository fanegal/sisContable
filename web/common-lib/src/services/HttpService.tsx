import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    //const token = localStorageService.getAccessToken()
    /* if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    } */
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    
    //response.data = response.data.data ? response.data.data : response.data;
    return response;
  },
  function (error) {
    const originalRequest = error.config

    /* if (
      error.response.status === 401 &&
      originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
    ) {
      router.push('/login')
      return Promise.reject(error)
    } */

   /*  if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorageService.getRefreshToken()
      return axios
        .post('/auth/token', {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            localStorageService.setToken(res.data)
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + localStorageService.getAccessToken()
            return axios(originalRequest)
          }
        })
    } */
    return Promise.reject(error)
  }
)

export class HttpService {

  static async get(url:string, headers:any = {}, signal = undefined) {
    const res = await axios.get(url, {
      headers: headers,
      signal: signal
    });
    return res;
  }

  static async post(url:string, request:any = {}, headers:any = {}) {
    const res = await axios.post(url, request, {
      headers: headers,
    });
    
    return res;
  }

  /**THIS ADD PUT, DELETE, PATCH, HEALTH, etc */
}
export default HttpService;