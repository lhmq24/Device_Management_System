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
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  })
  return res.json()
}

export async function updateReport(input) {
  console.log('Updating report with data in service:', input)
  const token = localStorage.getItem('token') || ''
  const res = await fetch(API, {
    method: 'PUT',
    headers: {  Authorization: `Bearer ${token}` },
    body: input,
  })
  return res.json()
}

export async function deleteReport(id) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(API, {
    method: 'DELETE',
    headers: {  Authorization: `Bearer ${token}` },
  })
  return res.json()
}
