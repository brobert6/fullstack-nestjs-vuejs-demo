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
  <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-none">
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="border-b border-gray-200 px-4 py-4 sm:px-6">
          <FormKit
            type="form"
            @submit="searchCities"
            submit-label="Search"
            :classes="{
              form: 'flex flex-row items-center justify-end'
            }"
            :submit-attrs="{
              inputClass:
                'flex-grow text-sm font-semibold leading-6 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
              wrapperClass: 'flex'
            }"
          >
            <FormKit type="search" name="search" placeholder="Search..." value="" />
          </FormKit>
        </div>
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
          table-class-name="table-fixed"
        >
        </EasyDataTable>

        <!-- <div
          class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        >
          <div class="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >Previous</a
            >
            <a
              href="#"
              class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >Next</a
            >
          </div>
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">1</span>
                to
                <span class="font-medium">10</span>
                of
                <span class="font-medium">97</span>
                results
              </p>
            </div>
            <div>
              <nav
                class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >1</a
                >
                <a
                  href="#"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >2</a
                >
                <a
                  href="#"
                  class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >3</a
                >
                <span
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >...</span
                >
                <a
                  href="#"
                  class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >8</a
                >
                <a
                  href="#"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >9</a
                >
                <a
                  href="#"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >10</a
                >
                <a
                  href="#"
                  class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* .pagination {
  display: none;
} */

::v-deep .formkit-wrapper {
  button {
    padding: 8px;
    margin: 1px 0 1px 5px;
  }
}

.table-fixed {
  --easy-table-border: none;
}
</style>
    