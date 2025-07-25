<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle shadow-sm">
      <thead class="table-light">
        <tr>
          <th scope="col">Device</th>
          <th scope="col">Maintainer</th>
          <th scope="col">Date</th>
          <th scope="col">Note</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in enrichedReports" :key="`${r.device_id}-${r.m_id}-${r.mr_date}`">
          <td>{{ r.device_name }}</td>
          <td>{{ r.m_name }}</td>
          <td>{{ formatDate(r.mr_date) }}</td>
          <td>{{ r.mr_note }}</td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-sm btn-outline-warning" @click="$emit('edit', r)">
                <i class="fas fa-edit me-1"></i>Edit
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', r)">
                <i class="fas fa-trash me-1"></i>Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getDeviceById } from '../services/deviceService.js'
import { getMaintainerById } from '../services/maintainerService.js'

const props = defineProps(['reports'])
defineEmits(['edit', 'delete'])

const enrichedReports = ref([])

const deviceCache = new Map()
const maintainerCache = new Map()

// Enrich reports when props.reports changes
watch(
  () => props.reports,
  async (newReports) => {
    console.log('reports: ', props.reports)
    console.log('[ReportTable] Incoming reports:', newReports)

    const enriched = await Promise.all(
  newReports.map(async (report) => {

    // === DEVICE ===
    let device
    if (deviceCache.has(report.device_id)) {
      device = deviceCache.get(report.device_id)
      console.log(`  [CACHE] Found device in cache:`, device)
    } else {
      try {
        console.log(`  [API] Fetching device with ID: ${report.device_id}`)
        const res = await getDeviceById(report.device_id)
        console.log(`  [API] Response for device ${report.device_id}:`, res)
        device = res?.data
        deviceCache.set(report.device_id, device)
        console.log(`  [API] Fetched device:`, res)
      } catch (e) {
        console.error(`  [ERROR] Failed to fetch device ${report.device_id}:`, e)
      }
    }

    // === MAINTAINER ===
    let maintainer
    if (maintainerCache.has(report.m_id)) {
      maintainer = maintainerCache.get(report.m_id)
    } else {
      try {
        const res = await getMaintainerById(report.m_id)
        maintainer = res?.data
        maintainerCache.set(report.m_id, maintainer)
      } catch (e) {
        console.error(`  [ERROR] Failed to fetch maintainer ${report.m_id}:`, e)
      }
    }

    const enrichedReport = {
      ...report,
      device_name: device?.device_name || `Device #${report.device_id}`,
      m_name: maintainer?.m_name || `Maintainer #${report.m_id}`,
    }

    return enrichedReport
  })
)


    enrichedReports.value = enriched
  },
  { immediate: true }
)

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toISOString().split('T')[0]
}
</script>

