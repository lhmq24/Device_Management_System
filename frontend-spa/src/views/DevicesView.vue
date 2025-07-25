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
import { watch, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useDeviceState } from '../composables/useDeviceState'
import { useDevicesQuery } from '../composables/useDevicesQuery'
import { useUnitsQuery } from '../composables/useUnitsQuery'

import DeviceForm from '../components/DeviceForm.vue'
import DeviceTable from '../components/DeviceTable.vue'

const { unitsQuery } = useUnitsQuery()
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
const {
  devicesQuery,
  createDeviceMutation,
  updateDeviceMutation,
  deleteDeviceMutation,
} = useDevicesQuery()

onMounted(() => {
  if (isLoggedIn.value) {
    devicesQuery.refetch()
    unitsQuery.refetch()
  }
})

watch(
  [() => unitsQuery.data.value, () => devicesQuery.data.value],
  ([unitsData, devicesData]) => {
    units.value = unitsData || []

    if (isLoggedIn.value && Array.isArray(devicesData)) {
      devices.value = devicesData
    } else {
      devices.value = []
    }
  },
  { immediate: true }
)

watch(isLoggedIn, (loggedIn) => {
  if (!loggedIn) {
    devices.value = [] // Clear data after logout
  }
})

function toggleForm() {
  if (showForm.value || isEditing.value) handleCancel()
  else showForm.value = true
}

function handleCancel() {
  selectedDevice.value = null
  isEditing.value = false
  showForm.value = false
}

function handleSubmit(data) {
  if (isEditing.value) {
    updateDeviceMutation.mutate(
      { id: selectedDevice.value.device_id, data },
    )
  } else {
    createDeviceMutation.mutate(data, {
      onSuccess: () => {
        // Keep form visible, just clear values
        selectedDevice.value = {}
        isEditing.value = false
        // Optional: you can also reset the file/image if needed
      },
    })
  }
}


function startEdit(device) {
  selectedDevice.value = { ...device }
  isEditing.value = true
  showForm.value = true
}

function handleDelete(id) {
  if (confirm('Are you sure?')) {
    deleteDeviceMutation.mutate(id)
  }
}
</script>

