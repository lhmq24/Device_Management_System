<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <h2 class="card-title mb-4">Maintenance Reports</h2>

        <div class="mb-4">
          <ReportForm
            :report="selected"
            :devices="devices"
            :maintainers="maintainers"
            :isEdit="isEditing"
            @submit="isEditing ? handleUpdate : handleCreate"
          />
        </div>

        <ReportTable :reports="reports" @edit="startEdit" @delete="handleDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import {
  getReports,
  createReport,
  updateReport,
  deleteReport
} from '../services/reportService.js'

import { getDevices } from '../services/deviceService.js'
import { getMaintainers } from '../services/maintainerService.js'

import ReportForm from '../components/ReportForm.vue'
import ReportTable from '../components/ReportTable.vue'

import { useReportState } from '../composables/useReportState.js'

const {
  reports,
  devices,
  maintainers,
  selected,
  isEditing
} = useReportState()

async function load() {
  const resReports = await getReports()
  const resDevices = await getDevices()
  const resMaintainers = await getMaintainers()

  reports.value = resReports.reports || resReports || []
  devices.value = resDevices.devices || resDevices || []
  maintainers.value = resMaintainers.maintainers || resMaintainers || []
}

async function handleCreate(data) {
  await createReport(data)
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
  await load()
}

async function handleDelete(data) {
  if (confirm('Delete this report?')) {
    await deleteReport(data)
    await load()
  }
}

onMounted(load)
</script>
