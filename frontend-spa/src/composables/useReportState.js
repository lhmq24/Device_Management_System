// composables/useReportState.js
import { ref, computed } from 'vue'

const reports = ref([])
const devices = ref([])
const maintainers = ref([])
const selected = ref(null)
const isEditing = ref(false)

const PAGE_SIZE = 5
const page = ref(1)

const totalRecords = computed(() => reports.value.length)
const totalPages = computed(() => Math.ceil(totalRecords.value / PAGE_SIZE))

const paginatedReports = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return reports.value.slice(start, start + PAGE_SIZE)
})

export function useReportState() {
  return {
    reports,
    devices,
    maintainers,
    selected,
    isEditing,
    page,
    PAGE_SIZE,
    totalRecords,
    totalPages,
    paginatedReports,
  }
}
