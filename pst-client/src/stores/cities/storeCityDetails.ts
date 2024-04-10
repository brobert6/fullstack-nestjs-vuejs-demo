import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { City, ID } from '../models'
import type { WebUiApiCity } from '@/util/webUiApi'
import { apiClient } from '@/services/BaseService'

export const useStoreCityDetails = defineStore('cityDetails', () => {
  const isLoading = ref(false)
  const cityDetails = ref<City>({} as City)

  const mapCityProperties = (cityDTO: WebUiApiCity) => {
    return {
      id: cityDTO.id,
      name: cityDTO.name,
      description: cityDTO.description,
      active: cityDTO.active
    }
  }

  const fetchCity = async (id: ID): Promise<City> => {
    const { data } = await apiClient(`/cities/${id}`)
    const city = mapCityProperties(data)
    cityDetails.value = city
    return city
  }

  const updateCity = async (id: ID, city: City): Promise<City> => {
    const { data } = await apiClient.patch(`/cities/${id}`, city)
    const cityResponse = mapCityProperties(data)
    cityDetails.value = cityResponse
    return cityResponse
  }

  return {
    cityDetails,
    isLoading,
    fetchCity,
    updateCity
  }
})
