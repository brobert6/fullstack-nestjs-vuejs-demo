<script setup lang="ts">
import type { WebUiApiCreateUserDto } from '@/util/webUiApi'

const registerUser = async (fields: WebUiApiCreateUserDto) => {
  await new Promise((r) => setTimeout(r, 1000))
  alert(JSON.stringify(fields))
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register new account
      </h2>
    </div>

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

          <!-- Last Name -->

          <FormKit
            type="text"
            label="Last Name"
            name="lastName"
            id="lastName"
            validation="required"
            placeholder="Last Name"
          />

          <!-- Phone -->

          <FormKit
            type="tel"
            label="Phone"
            name="phone"
            id="phone"
            validation="required"
            placeholder="Phone"
          />

          <!-- Address -->

          <FormKit
            type="text"
            label="Address"
            name="address"
            id="address"
            validation="required"
            placeholder="Address"
          />

          <!-- City -->

          <FormKit
            type="text"
            label="City"
            name="city"
            id="city"
            validation="required"
            placeholder="City"
          />

          <!-- State -->

          <FormKit
            type="text"
            label="State"
            name="state"
            id="state"
            validation="required"
            placeholder="State"
          />

          <!-- Zip Code -->
          <FormKit
            type="text"
            label="Zip Code"
            name="zipCode"
            id="zipCode"
            validation="required"
            placeholder="Zip Code"
          />

          <!-- Country -->

          <FormKit
            type="text"
            label="Country"
            name="country"
            id="country"
            validation="required"
            placeholder="Country"
          />

          <FormKit
            type="email"
            label="Email"
            name="email"
            id="email"
            validation="required"
            placeholder="Email address"
          />

          <FormKit
            type="password"
            label="Password"
            name="password"
            id="password"
            validation="required"
            placeholder="Email address"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
    