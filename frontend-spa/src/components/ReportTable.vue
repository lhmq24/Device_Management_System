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
          <td>{{ r.formatted_date }}</td>
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
import { computed, reactive } from 'vue'
import { getDeviceById } from '../services/deviceService.js'
import { getMaintainerById } from '../services/maintainerService.js'

const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
  },
})
defineEmits(['edit', 'delete'])

// === Cache maps to avoid duplicate requests ===
const deviceCache = reactive(new Map())
const maintainerCache = reactive(new Map())

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toISOString().split('T')[0] // yyyy-mm-dd
}

// === Enrich reports as computed value ===
const enrichedReports = computed(() =>
  props.reports.map((report) => {
    let device = deviceCache.get(report.device_id)
    let maintainer = maintainerCache.get(report.m_id)

    // Lazy fetch: trigger fetch if not cached yet
    if (!device) {
      getDeviceById(report.device_id)
        .then((res) => {
          deviceCache.set(report.device_id, res?.data)
        })
        .catch((err) => {
          console.error(`Failed to fetch device ${report.device_id}`, err)
        })
    }

    if (!maintainer) {
      getMaintainerById(report.m_id)
        .then((res) => {
          maintainerCache.set(report.m_id, res?.data)
        })
        .catch((err) => {
          console.error(`Failed to fetch maintainer ${report.m_id}`, err)
        })
    }

    return {
      ...report,
      device_name: device?.device_name || `Device #${report.device_id}`,
      m_name: maintainer?.m_name || `Maintainer #${report.m_id}`,
      formatted_date: formatDate(report.mr_date),
    }
  }),
)
</script>
