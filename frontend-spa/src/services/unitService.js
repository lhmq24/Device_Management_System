import 'axios'

const API_URL = 'http://localhost:3000/api/units'

export async function getUnits() {
  const res = await fetch(API_URL)
  return await res.json()
}

export async function getUnit(id) {
  const res = await fetch(`${API_URL}/${id}`)
  return await res.json()
}

export async function createUnit(data) {
  return await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function deleteUnit(id) {
  return await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
}

export async function updateUnit(id, data) {
  return await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
