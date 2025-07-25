<template>
  <div class="d-flex flex-column min-vh-100 bg-light">
    <AppHeader />
    <main class="flex-fill py-4">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const { restoreAuth } = useAuth()

// restoreAuth()

onMounted(() => {
  restoreAuth()
})
</script>
