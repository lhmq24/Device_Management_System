<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <h2 class="card-title mb-4">Maintenance Reports</h2>

        <!-- Loading state -->
        <div v-if="isLoading" class="text-center py-4">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="hasError" class="alert alert-danger">
          <p>Error loading data:</p>
          <ul class="mb-2">
            <li v-if="reportsQuery.isError.value">Reports: {{ reportsQuery.error.value?.message }}</li>
            <li v-if="devicesQuery.isError.value">Devices: {{ devicesQuery.error.value?.message }}</li>
            <li v-if="maintainersQuery.isError.value">Maintainers: {{ maintainersQuery.error.value?.message }}</li>
          </ul>
          <button @click="refetchAll" class="btn btn-sm btn-outline-danger">
            Retry All
          </button>
        </div>

        <!-- Content -->
        <template v-else>
          <div class="mb-4">
            <div class="mb-4">
              <ReportForm
                :key="isEditing ? 'edit' + selected?.device_id + selected?.m_id : 'create'"
                :report="selected"
                :devices="devices"
                :maintainers="maintainers"
                :isEdit="isEditing"
                @submit="handleSubmit"
                :isLoading="createReportMutation.isPending.value || updateReportMutation.isPending.value"
              />
            </div>
          </div>

          <ReportTable 
            :reports="paginatedReports ?? []" 
            @edit="startEdit" 
            @delete="handleDelete"
            :isDeleting="deleteReportMutation.isPending.value"
          />
          
          <!-- Pagination controls -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing
              <strong>{{ (page - 1) * PAGE_SIZE + 1 }}</strong> -
              <strong>{{ Math.min(page * PAGE_SIZE, totalRecords) }}</strong>
              of <strong>{{ totalRecords }}</strong> reports
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
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

import { useReportsQuery } from '../composables/useReportsQuery.js'
import { useDevicesQuery } from '../composables/useDevicesQuery.js'
import { useMaintainersQuery } from '../composables/useMaintainersQuery.js'
import { useAuth } from '../composables/useAuth.js'
import { useReportState } from '../composables/useReportState.js'

import ReportForm from '../components/ReportForm.vue'
import ReportTable from '../components/ReportTable.vue'

const { isLoggedIn } = useAuth()

const {
  reports,
  devices,
  maintainers,
  page,
  PAGE_SIZE,
  totalRecords,
  totalPages,
  paginatedReports,
} = useReportState()

const { 
  reportsQuery, 
  createReportMutation, 
  updateReportMutation, 
  deleteReportMutation 
} = useReportsQuery()

const { devicesQuery } = useDevicesQuery()
const { maintainersQuery } = useMaintainersQuery()

const selected = ref(null)
const isEditing = ref(false)

// Computed loading and error states
const isLoading = computed(() => 
  reportsQuery.isLoading.value || 
  devicesQuery.isLoading.value || 
  maintainersQuery.isLoading.value
)

const hasError = computed(() => 
  reportsQuery.isError.value || 
  devicesQuery.isError.value || 
  maintainersQuery.isError.value
)

// Function to refetch all queries
function refetchAll() {
  reportsQuery.refetch()
  devicesQuery.refetch()
  maintainersQuery.refetch()
}

// Watch for login state and data changes
watch(
  [isLoggedIn, () => reportsQuery.data.value, () => devicesQuery.data.value, () => maintainersQuery.data.value],
  ([loggedIn, reportsData, devicesData, maintainersData]) => {
    if (loggedIn) {
      if (reportsData) {
        reports.value = Array.isArray(reportsData) ? reportsData : []
      }
      if (devicesData) {
        devices.value = Array.isArray(devicesData) ? devicesData : []
      }
      if (maintainersData) {
        maintainers.value = Array.isArray(maintainersData) ? maintainersData : []
      }
    } else {
      // Clear data after logout
      reports.value = []
      devices.value = []
      maintainers.value = []
    }
  },
  { immediate: true }
)

// Auto-refetch when user logs in
watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    refetchAll()
  }
})

function handleSubmit(data) {
  if (isEditing.value) {
    updateReportMutation.mutate(data, {
      onSuccess: () => {
        selected.value = null
        isEditing.value = false
        page.value = 1
      }
    })
  } else {
    createReportMutation.mutate(data, {
      onSuccess: () => {
        // Keep form visible, just clear values
        selected.value = {}
        isEditing.value = false
        page.value = 1
      }
    })
  }
}

function startEdit(report) {
  selected.value = report
  isEditing.value = true
}

function handleDelete(data) {
  if (confirm('Delete this report?')) {
    deleteReportMutation.mutate(data, {
      onSuccess: () => {
        page.value = 1
      }
    })
  }
}
</script>