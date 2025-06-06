import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE || ''

const api = axios.create({
  baseURL,
})

export default api