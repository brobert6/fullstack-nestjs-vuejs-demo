<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { generateSchema } from '@/util/formKit'
import { useStoreCityDetails } from '../../stores/cities/storeCityDetails'
import { mapPromiseStatusWithCallbacks } from '@/composables/useApiFetch'
import { ref } from 'vue'

import type { WebUiApiCreateCityDto } from '../../util/webUiApi'
import { storeToRefs } from 'pinia'
import type { City, FieldSchema } from '@/stores/models'

const route = useRoute()
const router = useRouter()

const cityId = route.params.id as string

const cityDetailsStore = useStoreCityDetails()

const { cityDetails, isLoading } = storeToRefs(cityDetailsStore)

const schema = ref<FieldSchema[]>([])

mapPromiseStatusWithCallbacks(
  cityDetailsStore.fetchCity(cityId),
  isLoading,
  () => {
    schema.value = generateSchema<WebUiApiCreateCityDto>(cityDetails.value)
  },
  (error: any) => {
    console.log(error)
  }
)

const updateCity = async (fields: City) => {
  mapPromiseStatusWithCallbacks(
    cityDetailsStore.updateCity(cityId, fields),
    isLoading,
    () => {
      router.push({ name: 'CitiesList' })
    },
    (error: any) => {
      console.log(error)
    }
  )
}

// const data: WebUiApiCreateCityDto = {
//   name: '123123',
//   active: false,
//   description: '23123'
// }

// const schema = [
//   {
//     $formkit: 'text',
//     name: 'firstName',
//     value: '$firstName',
//     label: 'First Name',
//     validation: 'required'
//   },
//   {
//     $formkit: 'email',
//     name: 'email',
//     value: '$email',
//     label: 'Email',
//     validation: 'required|email'
//   }
// ]
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">Edit city</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" v-if="!isLoading">
      <div class="space-y-6">
        <FormKit
          type="form"
          @submit="updateCity"
          submit-label="Submit"
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
          <!-- <FormKitSchema :schema="schema" :data="data" /> -->
          <FormKitSchema :schema="schema" :data="cityDetails" />
        </FormKit>
      </div>
    </div>
  </div>
</template>
    