import { ref, computed } from 'vue'

const devices = ref([])
const units = ref([])
const selectedDevice = ref(null)
const isEditing = ref(false)
const showForm = ref(false)
const searchTerm = ref('')

const filteredDevices = computed(() => {
  if (!searchTerm.value.trim()) return devices.value
  return devices.value.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
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
  }
}
