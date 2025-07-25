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

        <!-- Auth buttons -->
        <div class="d-flex">
          <GoogleLogin
            v-if="!isLoggedIn"
            :client-id="clientId"
            :callback="handleCredentialResponse"
            popup-type="TOKEN"
          >
            <template #default>
              <button class="btn btn-outline-light btn-sm">
                <i class="fab fa-google me-1"></i> Login with Google
              </button>
            </template>
          </GoogleLogin>

          <div v-if="isLoggedIn" class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-danger btn-sm" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { GoogleLogin } from 'vue3-google-login'
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn, setAuth, clearAuth } = useAuth() 

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const handleCredentialResponse = (response) => {
  try {
    if (!response) return
    const { access_token, expires_in } = response
    if (access_token) {
      setAuth(access_token, expires_in)
    }
  } catch (err) {
    console.error('Failed to login', err)
  }
}

function handleLogout() {
  try {
    const confirmed = confirm('Are you sure you want to sign out?')
    if (!confirmed) return
    clearAuth()
  } catch (err) {
    console.error('Failed to log out', err)
  }
}
</script>

