import { ref } from 'vue'

const reports = ref([])
const devices = ref([])
const maintainers = ref([])
const selected = ref(null)
const isEditing = ref(false)

export function useReportState() {
  return {
    reports,
    devices,
    maintainers,
    selected,
    isEditing,
  }
}
