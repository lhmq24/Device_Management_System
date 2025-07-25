import { ref, computed } from 'vue'

const devices = ref([])
const units = ref([])
const selectedDevice = ref(null)
const isEditing = ref(false)
const showForm = ref(false)
const searchTerm = ref('')

const PAGE_SIZE = 5
const page = ref(1)

const filteredDevices = computed(() => {
  if (!searchTerm.value.trim()) return devices.value
  return devices.value.filter((device) =>
    device.device_name.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

const totalRecords = computed(() => filteredDevices.value.length)
const totalPages = computed(() => Math.ceil(totalRecords.value / PAGE_SIZE))

const paginatedDevices = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filteredDevices.value.slice(start, start + PAGE_SIZE)
})

export function useDeviceState() {
  return {
    devices,
    units,
    selectedDevice,
    isEditing,
    showForm,
    searchTerm,
    filteredDevices,
    paginatedDevices,
    page,
    totalPages,
    totalRecords,
    PAGE_SIZE,
  }
}
