<template>
  <div class="container py-5">
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4"
        >
          <h2 class="h4 mb-3 mb-md-0">Device List</h2>
          <div>
            <button
              class="btn btn-outline-primary d-inline-flex align-items-center"
              @click="toggleForm"
            >
              <i :class="showForm || isEditing ? 'fas fa-times' : 'fas fa-plus'"></i>
              <span class="ms-2">
                {{ showForm || isEditing ? 'Cancel' : 'Add Device' }}
              </span>
            </button>
          </div>
        </div>

        <div class="row g-3 align-items-center mb-4">
          <div class="col-md-6">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control"
              placeholder="🔍 Search devices..."
            />
          </div>
        </div>

        <div v-if="showForm || isEditing" class="mb-4">
          <div class="p-4 border rounded bg-light">
            <DeviceForm
              :device="selectedDevice"
              :units="units"
              @create="handleCreate"
              @update="handleUpdate"
            />
          </div>
        </div>

        <DeviceTable
          :devices="filteredDevices"
          @edit="startEdit"
          @delete="handleDelete"
          edit-btn-class="btn btn-sm btn-outline-warning me-2"
          delete-btn-class="btn btn-sm btn-outline-danger"
          edit-btn-text="Edit"
          delete-btn-text="Remove"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getDevices, createDevice, updateDevice, deleteDevice } from '../services/deviceService'
import { getUnits } from '../services/unitService'

import DeviceForm from '../components/DeviceForm.vue'
import DeviceTable from '../components/DeviceTable.vue'

const devices = ref([])
const units = ref([])
const selectedDevice = ref(null)
const isEditing = ref(false)
const showForm = ref(false)
const searchTerm = ref('')

onMounted(async () => {
  await load()
})

async function load() {
  devices.value = await getDevices()
  units.value = await getUnits()
}

async function handleCreate(data) {
  await createDevice(data)
  showForm.value = false
  await load()
}

async function handleUpdate(data) {
  await updateDevice(selectedDevice.value.id, data)
  selectedDevice.value = null
  isEditing.value = false
  showForm.value = false
  await load()
}

function startEdit(device) {
  selectedDevice.value = device
  isEditing.value = true
  showForm.value = true
}

async function handleDelete(id) {
  if (confirm('Are you sure?')) {
    await deleteDevice(id)
    await load()
  }
}

function handleCancel() {
  selectedDevice.value = null
  isEditing.value = false
  showForm.value = false
}

const filteredDevices = computed(() => {
  if (!searchTerm.value.trim()) return devices.value
  return devices.value.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

function toggleForm() {
  if (showForm.value || isEditing.value) {
    handleCancel()
  } else {
    showForm.value = true
  }
}
</script>
