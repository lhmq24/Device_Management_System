const API = 'http://localhost:3000/api/maintenance-reports'


export async function getReports() {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const result = await res.json()
  return result.data
}

export async function createReport(data) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateReport(id, data) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteReport(id) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: {  Authorization: `Bearer ${token}` },
  })
  return res.json()
}
