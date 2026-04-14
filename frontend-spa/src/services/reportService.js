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
  const token = localStorage.getItem('token') || ''
  const res = await fetch(API, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: input,
  })
  return res.json()
}

export async function deleteReport(data) {
  const { device_id, m_id, mr_date } = data
  const token = localStorage.getItem('token') || ''
  const url = new URL('http://localhost:3000/api/maintenance-reports')
  url.searchParams.set('device_id', device_id)
  url.searchParams.set('m_id', m_id)
  url.searchParams.set('mr_date', mr_date)
  const res = await fetch(url.toString(), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}
