<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStoreCities } from '../../stores/cities/storeCities'
import { mapPromiseStatus } from '@/composables/useApiFetch'
import { ref, watch } from 'vue'
import { reportError } from '@/util/errorReporting'
import { storeToRefs } from 'pinia'
import type { City } from '@/stores/models'
import type { Header, ServerOptions } from 'vue3-easy-data-table'

const router = useRouter()

const isLoading = ref(false)

const citiesStore = useStoreCities()
const { cities, total } = storeToRefs(citiesStore)

const headers: Header[] = [
  { text: 'Name', value: 'name', sortable: true },
  { text: 'Description', value: 'description', sortable: true },
  { text: 'Status', value: 'active', sortable: true }
]

const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 5,
  sortBy: 'name',
  sortType: 'asc'
})

const loadFromServer = () => {
  mapPromiseStatus(citiesStore.fetchCities(), isLoading)
}

const onRowClick = (item: City) => {
  router
    .push({
      name: 'EditCity',
      params: { id: item.id }
    })
    .catch(reportError)
}

const searchCities = (fields: any) => {
  citiesStore.updateSearch(fields['search'])
  loadFromServer()
}

watch(
  serverOptions,
  (newServerOptions) => {
    citiesStore.updateServerOptions(newServerOptions)
    loadFromServer()
  },
  { deep: true }
)

loadFromServer()
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto">
      <h2 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">Cities</h2>
    </div>
    <div class="filters">
      <div class="mt-10 sm:mx-auto">
        <FormKit
          type="form"
          @submit="searchCities"
          submit-label="Search"
          :classes="{
            form: 'space-y-6'
          }"
          :submit-attrs="{
            inputClass:
              'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            wrapperClass: 'im-on-the-wrapper',
            outerClass: 'im-on-the-outer-wrapper'
          }"
        >
          <FormKit type="search" name="search" placeholder="Search..." label="Search" value="" />
        </FormKit>
      </div>
    </div>

    <div class="mt-10 sm:mx-auto" v-if="!isLoading">
      <EasyDataTable
        :headers="headers"
        :items="cities"
        :loading="isLoading"
        v-model:server-options="serverOptions"
        @click-row="onRowClick"
        alternating
        multi-sort
        show-index
        :server-items-length="total"
      >
      </EasyDataTable>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: none;
}
</style>
    