<template>
  <div class="container py-5">
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4"
        >
          <h2 class="card-title mb-4">Devices</h2>
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
              :isEdit="isEditing"
              @submit="handleSubmit"
            />
          </div>
        </div>

        <DeviceTable
          :devices="paginatedDevices"
          @edit="startEdit"
          @delete="handleDelete"
          edit-btn-class="btn btn-sm btn-outline-warning me-2"
          delete-btn-class="btn btn-sm btn-outline-danger"
          edit-btn-text="Edit"
          delete-btn-text="Remove"
        />

        <!-- Pagination controls -->
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing
            <strong>{{ (page - 1) * PAGE_SIZE + 1 }}</strong> -
            <strong>{{ Math.min(page * PAGE_SIZE, totalRecords) }}</strong>
            of <strong>{{ totalRecords }}</strong> devices
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
import { onMounted, watch } from 'vue'
import { getDevices, createDevice, updateDevice, deleteDevice } from '../services/deviceService'
import { getUnits } from '../services/unitService'
import { useAuth } from '../composables/useAuth'

import DeviceForm from '../components/DeviceForm.vue'
import DeviceTable from '../components/DeviceTable.vue'
import { useDeviceState } from '../composables/useDeviceState'

const {
  devices,
  units,
  selectedDevice,
  isEditing,
  showForm,
  searchTerm,
  paginatedDevices,
  page,
  totalPages,
  totalRecords,
  PAGE_SIZE,
} = useDeviceState()

const { isLoggedIn } = useAuth()

watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    load()
  } else {
    devices.value = [] // Clear data after logout
  }
})

watch(searchTerm, () => {
  page.value = 1 // Reset to first page on search term change
})


onMounted(() => {
  if (isLoggedIn.value) {
    load()
  }
})

async function load() {
  devices.value = await getDevices()
  const unitResponse = await getUnits()
  units.value = unitResponse.units || unitResponse.data?.units || []
}

async function handleCreate(formData) {
  await createDevice(formData)
  showForm.value = false
  await load()
}


async function handleUpdate(data) {
  await updateDevice(selectedDevice.value.device_id, data)
  selectedDevice.value = null
  isEditing.value = false
  showForm.value = false
  await load()
}

function startEdit(device) {
  selectedDevice.value = { ...device }
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
  selectedDevice.value = {}
  isEditing.value = false
  showForm.value = false
}

function toggleForm() {
  if (showForm.value || isEditing.value) {
    handleCancel()
  } else {
    showForm.value = true
  }
}
function handleSubmit(data) {
  if (isEditing.value) {
    handleUpdate(data)
  } else {
    handleCreate(data)
  }
}
</script>
