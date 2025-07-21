const API = 'http://localhost:3000/api/maintainers'

export async function getMaintainers() {
  const res = await fetch(API)
  const json = await res.json()
  return json.data
}

export async function createMaintainer(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ maintainer: data }),
  })
  return res.json()
}

export async function updateMaintainer(id, data) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteMaintainer(id) {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}
