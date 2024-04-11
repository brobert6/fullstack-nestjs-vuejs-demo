import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { City, Filters, WebUiApiListListParams } from '../models'
import { apiClient } from '@/services/BaseService'
import { itemsPerPage } from '../constants'
import { objToQueryParamsStr } from '@/util'

export const useStoreCities = defineStore('cities', () => {
  const isLoading = ref(false)
  const cities = ref<City[]>([] as City[])
  const total = ref(0)
  const filters = ref<Filters>({} as Filters)

  const fetchCities = async (skip = 0, take = itemsPerPage): Promise<void> => {
    const apiFilters: WebUiApiListListParams = {
      take,
      skip,
      ...(filters.value && { searchString: filters.value.search }),
      ...(filters.value && { status: filters.value.status })
    }
    const { data } = await apiClient(`/cities${objToQueryParamsStr(apiFilters)}`)
    if (data.total) total.value = data.total
    if (apiFilters.skip === 0) {
      cities.value = []
    }
    data.forEach((item: City) => {
      cities.value.push(item)
    })
  }

  return {
    cities,
    total,
    filters,
    isLoading,
    fetchCities
  }
})
