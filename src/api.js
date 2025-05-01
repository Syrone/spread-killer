import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE || ''

const api = axios.create({
  baseURL,
})

api.interceptors.request.use((config) => {
  const apiKey = process.env.REACT_APP_API_KEY
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default api