import { ref } from 'vue'

const user = ref(null) 
const isLoggedIn = ref(false)

function setAuth(token, expiresIn) {
  localStorage.setItem('token', token)
  localStorage.setItem('expires_in', expiresIn)
  isLoggedIn.value = true
}

function restoreAuth() {
  isLoggedIn.value = !!localStorage.getItem('token')
}

function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('expires_in')
  isLoggedIn.value = false
  user.value = null
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
