const API = 'http://localhost:3000/api/maintainers'

export async function getMaintainers() {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const json = await res.json()
  return json.data
}

export async function getMaintainerById(id) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function createMaintainer(data) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(API, {
    method: 'POST',
    headers: {  Authorization: `Bearer ${token}` },
    body: data,
  })
  return res.json()
}

export async function updateMaintainer(id, data) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  })
  return res.json()
}

export async function deleteMaintainer(id) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}
