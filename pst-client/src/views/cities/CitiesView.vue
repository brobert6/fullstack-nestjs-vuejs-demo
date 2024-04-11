<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStoreCities } from '../../stores/cities/storeCities'
import { mapPromiseStatus, mapPromiseStatusWithCallbacks } from '@/composables/useApiFetch'
import { ref } from 'vue'
import { reportError } from '@/util/errorReporting'

import { storeToRefs } from 'pinia'

const router = useRouter()

const isLoading = ref(false)

const citiesStore = useStoreCities()
const { cities, total, filters } = storeToRefs(citiesStore)

const searchWords = ref(filters.value.search ? filters.value.search.split(' ') : [])
mapPromiseStatus(citiesStore.fetchCities(), isLoading)

function onFiltersUpdate(skip: number) {
  searchWords.value = filters.value.search ? filters.value.search.split(' ') : []
  mapPromiseStatusWithCallbacks(
    citiesStore.fetchCities(skip),
    isLoading,
    () => {},
    () => {
      showSnackbar('ViewNews.citiesFailMsg', { type: 'error' })
    }
  )
}

function goToDetails(id: ID) {
  router
    .push({
      name: 'EditCity',
      params: { id: id }
    })
    .catch(reportError)
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto">
      <h2 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">Cities</h2>
    </div>
    <div class="mt-10 sm:mx-auto" v-if="!isLoading">
      <table class="table-fixed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="city in cities" :key="city.id">
            <td>{{ city.name }}</td>
            <td>{{ city.description }}</td>
            <td>{{ city.active ? 'Active' : 'Inactive' }}</td>
            <td>
              <button
                @click="goToDetails(city.id)"
                type="button"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-0.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="pagination">Total elements: {{ total }}</p>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: none;
}
</style>
    