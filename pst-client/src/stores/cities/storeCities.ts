import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { City, Filters, WebUiApiListListParams } from '../models'
import { apiClient } from '@/services/BaseService'
import { itemsPerPage } from '../constants'
import { objToQueryParamsStr } from '@/util'
import type { ServerOptions } from 'vue3-easy-data-table'

export const useStoreCities = defineStore('cities', () => {
  const isLoading = ref(false)
  const cities = ref<City[]>([] as City[])
  const total = ref(0)
  const filters = ref<Filters>({
    rowsPerPage: itemsPerPage,
    page: 1
  } as Filters)

  const fetchCities = async (): Promise<void> => {
    const apiFilters: WebUiApiListListParams = {
      take: filters.value.rowsPerPage,
      skip: filters.value.page * filters.value.rowsPerPage,
      //TODO: add sorting
      ...(filters.value && { searchString: filters.value.search }),
      ...(filters.value && { status: filters.value.status })
    }
    const { data } = await apiClient(`/cities${objToQueryParamsStr(apiFilters)}`)
    if (data.total) total.value = data.total

    cities.value = []

    data.forEach((item: City) => {
      cities.value.push(item)
    })
  }

  const updateServerOptions = (options: ServerOptions): void => {
    filters.value.rowsPerPage = options.rowsPerPage
    filters.value.page = options.page
    filters.value.sortBy = options.sortBy
    filters.value.sortType = options.sortType
  }

  return {
    cities,
    total,
    filters,
    isLoading,
    fetchCities,
    updateServerOptions
  }
})
