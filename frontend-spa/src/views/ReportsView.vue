<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <h2 class="card-title mb-4">Maintenance Reports</h2>

        <div class="mb-4">
          <div class="mb-4">
            <ReportForm
              :key="isEditing ? 'edit' + selected?.device_id + selected?.m_id : 'create'"
              :report="selected"
              :devices="devices"
              :maintainers="maintainers"
              :isEdit="isEditing"
              @submit="handleSubmit"
            />
          </div>
        </div>

        <ReportTable :reports="paginatedReports ?? []" @edit="startEdit" @delete="handleDelete" />
        <!-- Pagination controls -->
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing
            <strong>{{ (page - 1) * PAGE_SIZE + 1 }}</strong> -
            <strong>{{ Math.min(page * PAGE_SIZE, totalRecords) }}</strong>
            of <strong>{{ totalRecords }}</strong> reports
          </div>

          <div class="btn-group">
            <button class="btn btn-outline-secondary" @click="page--" :disabled="page <= 1">
              Prev
            </button>
            <button
              class="btn btn-outline-secondary"
              @click="page++"
              :disabled="page >= totalPages"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

import { getReports, createReport, updateReport, deleteReport } from '../services/reportService.js'
import { getDevices } from '../services/deviceService.js'
import { getMaintainers } from '../services/maintainerService.js'

import { useAuth } from '../composables/useAuth.js'
const { isLoggedIn } = useAuth()

import { useReportState } from '../composables/useReportState.js'
const {
  reports,
  devices,
  maintainers,
  page,
  PAGE_SIZE,
  totalRecords,
  totalPages,
  paginatedReports,
} = useReportState()

import ReportForm from '../components/ReportForm.vue'
import ReportTable from '../components/ReportTable.vue'

const selected = ref(null)
const isEditing = ref(false)

watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    load()
  } else {
    reports.value = [] // Clear data after logout
  }
})

onMounted(() => {
  if (isLoggedIn.value) {
    load()
  }
})

async function load() {
  const resReports = await getReports()
  const resDevices = await getDevices()
  const resMaintainers = await getMaintainers()

  reports.value = resReports.reports || resReports.data?.reports || []
  //devices.value = resDevices.devices || resDevices.data?.devices || []
  devices.value = resDevices
  maintainers.value = resMaintainers.maintainers || resMaintainers.data?.maintainers || []
}

function handleSubmit(data) {
  if (isEditing.value) {
    handleUpdate(data)
  } else {
    handleCreate(data)
  }
}

async function handleCreate(data) {
  console.log('Creating report with data:', data)
  const newReport = await createReport(data)
  reports.value.unshift(newReport) // add to top
  page.value = 1
}

function startEdit(report) {
  selected.value = report
  isEditing.value = true
}

async function handleUpdate(data) {
  console.log('Updating report with data in View:', data)
  const formData = new FormData()
  formData.append('device_id', data.device_id)
  formData.append('m_id', data.m_id)
  formData.append('mr_date', data.mr_date)
  formData.append('mr_note', data.mr_desc)
  const updated = await updateReport(formData)
  const idx = reports.value.findIndex(
    (r) =>
      r.device_id === updated.device_id && r.m_id === updated.m_id && r.mr_date === updated.mr_date,
  )

  if (idx !== -1) {
    reports.value[idx] = updated
  }

  selected.value = null
  isEditing.value = false
  page.value = 1
}

async function handleDelete(data) {
  if (confirm('Delete this report?')) {
    await deleteReport(data)
    page.value = 1
    await load()
  }
}
</script>
