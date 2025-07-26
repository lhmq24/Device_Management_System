<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <h2 class="card-title mb-4">Maintainers</h2>

        <div class="row g-3 align-items-center mb-4">
          <div class="col-md-6">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control"
              placeholder="🔍 Search maintainers..."
            />
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="maintainersQuery.isLoading.value" class="text-center py-4">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="maintainersQuery.isError.value" class="alert alert-danger">
          Error loading maintainers: {{ maintainersQuery.error.value?.message }}
          <button @click="maintainersQuery.refetch()" class="btn btn-sm btn-outline-danger ms-2">
            Retry
          </button>
        </div>

        <!-- Content -->
        <template v-else>
          <div class="mb-4">
            <MaintainerForm 
              :maintainer="selected" 
              :isEdit="isEditing" 
              @submit="handleSubmit"
              :isLoading="createMaintainerMutation.isPending.value || updateMaintainerMutation.isPending.value"
            />
          </div>

          <MaintainerTable
            :maintainers="paginatedMaintainers"
            @edit="startEdit"
            @delete="handleDelete"
            :isDeleting="deleteMaintainerMutation.isPending.value"
          />
          
          <!-- Pagination controls -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing
              <strong>{{ (page - 1) * PAGE_SIZE + 1 }}</strong> -
              <strong>{{ Math.min(page * PAGE_SIZE, totalRecords) }}</strong>
              of <strong>{{ totalRecords }}</strong> maintainers
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
import { watch } from 'vue'
import { useMaintainersQuery } from '../composables/useMaintainersQuery.js'
import { useMaintainerState } from '../composables/useMaintainerState.js'
import { useAuth } from '../composables/useAuth.js'

import MaintainerForm from '../components/MaintainerForm.vue'
import MaintainerTable from '../components/MaintainerTable.vue'

const {
  maintainers,
  selected,
  isEditing,
  page,
  searchTerm,
  PAGE_SIZE,
  totalRecords,
  totalPages,
  paginatedMaintainers,
} = useMaintainerState()

const { isLoggedIn } = useAuth()
const { 
  maintainersQuery, 
  createMaintainerMutation, 
  updateMaintainerMutation, 
  deleteMaintainerMutation 
} = useMaintainersQuery()

// Watch for login state and sync data
watch(
  [isLoggedIn, () => maintainersQuery.data.value],
  ([loggedIn, maintainersData]) => {
    if (loggedIn && maintainersData) {
      maintainers.value = Array.isArray(maintainersData) ? maintainersData : []
    } else if (!loggedIn) {
      maintainers.value = []
    }
  },
  { immediate: true }
)

// Auto-refetch when user logs in
watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    maintainersQuery.refetch()
  }
})

function startEdit(maintainer) {
  selected.value = maintainer
  isEditing.value = true
}

function handleSubmit(data) {
  if (isEditing.value) {
    updateMaintainerMutation.mutate(
      { id: selected.value.id, data },
      {
        onSuccess: () => {
          selected.value = null
          isEditing.value = false
          page.value = 1
        }
      }
    )
  } else {
    createMaintainerMutation.mutate(data, {
      onSuccess: () => {
        // Keep form visible, just clear values
        selected.value = {}
        isEditing.value = false
        page.value = 1
      }
    })
  }
}

function handleDelete(id) {
  if (confirm('Delete this maintainer?')) {
    deleteMaintainerMutation.mutate(id, {
      onSuccess: () => {
        page.value = 1
      }
    })
  }
}
</script>