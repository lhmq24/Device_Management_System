<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Device Manager</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/units" class="nav-link">Units</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/devices" class="nav-link">Devices</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/maintainers" class="nav-link">Maintainers</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/reports" class="nav-link">Reports</router-link>
          </li>
        </ul>

        <!-- Google Auth Buttons -->
        <div class="d-flex">
          <div v-if="!isLoggedIn">
            <button class="btn btn-outline-light btn-sm" @click="handleLogin">
              Login with Google
            </button>
          </div>
          <div v-else class="d-flex align-items-center gap-2">
            <img :src="user.picture" alt="avatar" class="rounded-circle" width="32" height="32" />
            <span class="text-white">{{ user.name }}</span>
            <button class="btn btn-outline-danger btn-sm" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, inject } from 'vue'

const user = ref(null)
const isLoggedIn = ref(false)
const $googleAuth = inject('googleAuth') || inject('$googleAuth')

function handleLogin() {
  if (!$googleAuth) {
    alert('Google Auth plugin not available')
    return
  }
  $googleAuth
    .signIn()
    .then((response) => {
      user.value = response
      isLoggedIn.value = true
    })
    .catch(() => {
      alert('Login failed')
    })
}

function handleLogout() {
  if ($googleAuth) $googleAuth.signOut()
  user.value = null
  isLoggedIn.value = false
}
</script>
