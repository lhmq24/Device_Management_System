<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <h2 class="card-title mb-4">Maintenance Reports</h2>

        <div class="mb-4">
          <div class="mb-4">
            <ReportForm
              :report="isEditing ? { ...selected } : null"
              :devices="devices"
              :maintainers="maintainers"
              :isEdit="isEditing"
              @submit="isEditing ? handleUpdate : handleCreate"
            />
          </div>
        </div>

        <ReportTable :reports="paginatedReports" @edit="startEdit" @delete="handleDelete" />
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

async function handleCreate(data) {
  console.log('Creating report with data:', data)
  await createReport(data)
  page.value = 1
  await load()
}

function startEdit(report) {
  selected.value = report
  isEditing.value = true
}

async function handleUpdate(data) {
  await updateReport(data)
  selected.value = null
  isEditing.value = false
  page.value = 1
  await load()
}

async function handleDelete(data) {
  if (confirm('Delete this report?')) {
    await deleteReport(data)
    page.value = 1
    await load()
  }
}

onMounted(load)
</script>
