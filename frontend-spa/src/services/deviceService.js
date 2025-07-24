import axios from 'axios'

const API = 'http://localhost:3000/api/devices'

// export async function getDevices() {
//   const token = localStorage.getItem('token') || ''
//   const response = await axios.get(`http://localhost:3000/api/devices`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   return response.data.data.devices
// }

export async function getDevices() {
  const token = localStorage.getItem('token') || ''
  const response = await axios.get('http://localhost:3000/api/devices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

export async function createDevice(data) {
  const token = localStorage.getItem('token') || ''
  return await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

export async function updateDevice(id, data) {
  const token = localStorage.getItem('token') || ''
  return await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

export async function deleteDevice(id) {
  const token = localStorage.getItem('token') || ''
  return await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
