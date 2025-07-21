import axios from 'axios'

const API = 'http://localhost:3000/api/devices'

export async function getDevices() {
  const response = await axios.get(`http://localhost:3000/api/devices`)
  return response.data.data.devices
}

export async function createDevice(data) {
  return await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function updateDevice(id, data) {
  return await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function deleteDevice(id) {
  return await fetch(`${API}/${id}`, {
    method: 'DELETE',
  })
}
