import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '@/services/BaseService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    data: {},
    token: sessionStorage.getItem('TOKEN') || null
  })

  const register = async (user) => {
    try {
      const { data } = await apiClient.post('/auth/register', user)
      setUser(data.user)
      setToken(data.token)
      return data
    } catch (error) {
      console.error('Error in register action:', error)
      throw error
    }
  }

  const login = async (userDto) => {
    const { data } = await apiClient.post('/auth/login', userDto)
    debugger
    delete userDto.password
    setUser(data.user)
    setToken(data.accessToken)
    return data
  }

  const logout = async () => {
    user.value.token = null
    user.value.data = {}
    sessionStorage.removeItem('TOKEN')
  }

  const getUser = async () => {
    try {
      const { data } = await apiClient.get('/user')
      setUser(data)
    } catch (error) {
      console.error('Error in getUser action:', error)
      throw error
    }
  }

  const setUser = (userData) => {
    user.value.data = userData
  }

  const setToken = (token) => {
    user.value.token = token
    sessionStorage.setItem('TOKEN', token)
  }

  return {
    user,
    register,
    login,
    logout,
    getUser
  }
})
