<template>
  <router-view :key="$route.path"></router-view>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>