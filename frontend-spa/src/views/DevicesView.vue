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
        <h3 v-if="devices.length === 0 && !isEditing" class="card-title mt-2 mb-2">
          Oops, no devices found for this Unit
        </h3>

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
import { watch, computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useDeviceState } from '../composables/useDeviceState'
import { useDevicesQuery } from '../composables/useDevicesQuery'
import { useUnitsQuery } from '../composables/useUnitsQuery'
const { unitsQuery, useDevicesByUnitIdQuery } = useUnitsQuery()

import DeviceForm from '../components/DeviceForm.vue'
import DeviceTable from '../components/DeviceTable.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

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
const { devicesQuery, createDeviceMutation, updateDeviceMutation, deleteDeviceMutation } =
  useDevicesQuery()

const unitId = computed(() => route.query.unitId || null)

// Watch for unitId changes and fetch filtered devices
watch(
  () => unitId.value,
  (newUnitId) => {
    if (newUnitId) {
      const query = useDevicesByUnitIdQuery(Number(newUnitId))

      watch(
        () => query.data.value,
        (newDevices) => {
          if (query.isError.value) {
            console.warn('No devices found or failed:', query.error.value)
            devices.value = []
          } else {
            devices.value = Array.isArray(newDevices) ? newDevices : []
          }
        },
        { immediate: true },
      )
    }
  },
  { immediate: true },
)

// Handle all-devices query and units - ONLY when no unitId is present
watch(
  [isLoggedIn, () => devicesQuery.data.value, () => unitsQuery.data.value],
  ([loggedIn, devicesData, unitsData]) => {
    if (loggedIn) {
      // Always update units
      units.value = unitsData || []

      // ONLY update devices when no unitId filter is active
      if (!unitId.value) {
        devices.value = Array.isArray(devicesData) ? devicesData : []
      } 
    } else {
      devices.value = []
      units.value = []
    }
  },
  { immediate: true },
)

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
    updateDeviceMutation.mutate({ id: selectedDevice.value.device_id, data })
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
