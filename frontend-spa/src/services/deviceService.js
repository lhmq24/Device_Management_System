import axios from 'axios'

const API = 'http://localhost:3000/api/devices'

export async function getDevices() {
  const token = localStorage.getItem('token') || ''
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  // Safe fallback logic
  const data = response.data
  return data.devices || data.data?.devices || []
}

export async function getDeviceById(id) {
  const token = localStorage.getItem('token') || ''
  const response = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export async function createDevice(data) {
  console.log('Creating device with data:', data)
  const token = localStorage.getItem('token') || ''
  return await fetch(API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`, 
    },
    body: data,
  })
}


export async function updateDevice(id, data) {
  const token = localStorage.getItem('token') || ''
  return await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  })
}

export async function deleteDevice(id) {
  const token = localStorage.getItem('token') || ''
  return await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
