import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { City, Filters } from '../models'
import { apiClient } from '@/services/BaseService'
import { itemsPerPage } from '../constants'
import { objToQueryParamsStr } from '@/util'
import type { ServerOptions } from 'vue3-easy-data-table'
import type { WebUiApiCitiesControllerFindAllParams } from '@/util/webUiApi'

export const useStoreCities = defineStore('cities', () => {
  const isLoading = ref(false)
  const cities = ref<City[]>([] as City[])
  const total = ref(0)
  const filters = ref<Filters>({
    rowsPerPage: itemsPerPage,
    page: 1
  } as Filters)

  const fetchCities = async (): Promise<void> => {
    const apiFilters: WebUiApiCitiesControllerFindAllParams = {
      limit: filters.value.rowsPerPage,
      page: (filters.value.page - 1) * filters.value.rowsPerPage,
      ...(filters.value.search && { searchQuery: filters.value.search }),
      //...(filters.value && { status: filters.value.status })
      ...(filters.value.sortBy && { sortBy: filters.value.sortBy as string }),
      ...(filters.value.sortType && { sortOrder: filters.value.sortType as string })
    }
    const { data } = await apiClient(`/cities${objToQueryParamsStr(apiFilters)}`)
    if (data.meta && data.meta.totalItems) total.value = data.meta.totalItems

    cities.value = []

    data.items.forEach((item: City) => {
      cities.value.push(item)
    })
  }

  const updateServerOptions = (options: ServerOptions): void => {
    filters.value.rowsPerPage = options.rowsPerPage
    filters.value.page = options.page
    filters.value.sortBy = options.sortBy
    filters.value.sortType = options.sortType
  }

  const updateSearch = (search: string): void => {
    filters.value.search = search
  }

  return {
    cities,
    total,
    filters,
    isLoading,
    fetchCities,
    updateSearch,
    updateServerOptions
  }
})
