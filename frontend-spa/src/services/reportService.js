const API = 'http://localhost:3000/api/maintenance-reports'

export async function getReports() {
  const res = await fetch(API)
  const result = await res.json()
  return result.data
}

export async function createReport(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateReport(id, data) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteReport(id) {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}
