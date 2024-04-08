import { reportError } from '@/util/errorReporting'
import axios from 'axios'
// import { setupCache } from 'axios-cache-adapter'//it has a dependency bug currently, if not fix 'axios-cache-interceptor' can be used

// /*
// Cache adapter with a specific cache time
// Only GET request results are cached by default
// */
// const cache = setupCache({
//   maxAge: 5 * 60 * 1000, // cache for 5 minutes
// })

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  //adapter: cache.adapter,
})

export const defaultApiRejectHandle = () => (reason: Error) => {
  console.error(reason)
  return Promise.reject('Api error: ' + reason.message)
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response !== undefined && error.response.status === 401) {
      reportError(error)
      //   const appStore = useAppStore()
      //   appStore.logout()
    } else if (error.response !== undefined && error.response.status === 412) {
      //412 is a validation error, handled by the PageService
      return Promise.resolve(error)
    }
    return Promise.reject(error)
  }
)
