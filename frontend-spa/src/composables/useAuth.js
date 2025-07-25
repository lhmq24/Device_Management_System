import { ref } from 'vue'

const user = ref(null)
const isLoggedIn = ref(false)
let logoutTimer = null

function setAuth(token, expiresIn) {
  const expiresAt = Date.now() + expiresIn * 1000

  localStorage.setItem('token', token)
  localStorage.setItem('expires_in', expiresIn)
  localStorage.setItem('expires_at', expiresAt)

  isLoggedIn.value = true

  scheduleAutoLogout(expiresAt)
}

function restoreAuth() {
  const token = localStorage.getItem('token')
  const expiresAt = parseInt(localStorage.getItem('expires_at'))

  if (token && expiresAt && Date.now() < expiresAt) {
    isLoggedIn.value = true
    scheduleAutoLogout(expiresAt)
  } else {
    clearAuth()
  }
}

function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('expires_in')
  localStorage.removeItem('expires_at')

  isLoggedIn.value = false
  user.value = null

  if (logoutTimer) {
    clearTimeout(logoutTimer)
    logoutTimer = null
  }
}

function scheduleAutoLogout(expiresAt) {
  const timeLeft = expiresAt - Date.now()

  if (logoutTimer) {
    clearTimeout(logoutTimer)
  }

  if (timeLeft > 0) {
    logoutTimer = setTimeout(() => {
      clearAuth()
      alert('Your session has expired. Please sign in again.')
    }, timeLeft)
  }
}

export function useAuth() {
  return {
    user,
    isLoggedIn,
    setAuth,
    restoreAuth,
    clearAuth,
  }
}
