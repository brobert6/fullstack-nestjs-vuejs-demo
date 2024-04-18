<script setup lang="ts">
import type { WebUiApiCreateUserDto } from '@/util/webUiApi'

const registerUser = async (fields: WebUiApiCreateUserDto) => {
  //await new Promise((r) => setTimeout(r, 1000))
  alert(JSON.stringify(fields))
}

const stateList = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <FormKit
          type="form"
          @submit="registerUser"
          submit-label="Register User"
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
          <FormKit
            type="text"
            label="First Name"
            name="firstName"
            id="firstName"
            validation="required"
            placeholder="First Name"
          />

          <FormKit
            type="select"
            label="Which country is the smallest?"
            name="small_country"
            :options="['Monaco', 'Vatican City', 'Maldives', 'Tuvalu']"
          />

          <FormKit
            label="U.S. State"
            name="state"
            type="myAutocomplete"
            placeholder="Search for a state"
            help="What is your favorite U.S. state?"
            value="Virginia"
            validation="required"
            :options="stateList"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
    