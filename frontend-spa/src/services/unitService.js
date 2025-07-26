import 'axios'

const API_URL = 'http://localhost:3000/api/units'

export async function getUnits() {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return await res.json()
}

export async function getUnit(id) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return await res.json()
}

export async function getDevicesByUnitId(id) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API_URL}/${id}/devices`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return await res.json()
}

export async function createUnit(data) {
  const token = localStorage.getItem('token') || ''
  const formData = new FormData()
  formData.append('unit_name', data.unit_name)
  formData.append('unit_location', data.unit_location)
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  return await res.json()
}

export async function deleteUnit(id) {
  const token = localStorage.getItem('token') || ''
  return await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
}

export async function updateUnit(id, data) {
  const token = localStorage.getItem('token') || ''
  return await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}
