<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <TheHeader></TheHeader>

  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped lang="scss">
</style>
