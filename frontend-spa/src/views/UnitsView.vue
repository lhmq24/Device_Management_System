<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <h2 class="card-title mb-4">Units</h2>

        <!-- Search bar -->
        <div class="mb-4">
          <SearchBar @search="filterUnits" />
        </div>

        <!-- Unit form -->
        <div class="mb-4">
          <UnitForm :unit="selectedUnit" :isEdit="isEditing" @submit="handleSubmit" />
        </div>

        <!-- Unit table -->
        <UnitTable :units="paginatedUnits" @edit="startEdit" @delete="handleDelete" />
        
        <!-- Pagination controls -->
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing
            <strong>{{ (page - 1) * PAGE_SIZE + 1 }}</strong> -
            <strong>{{ Math.min(page * PAGE_SIZE, totalRecords) }}</strong>
            of <strong>{{ totalRecords }}</strong> units
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
import { watch } from 'vue'
import { useUnitState } from '../composables/useUnitState.js'
import { useUnitsQuery } from '../composables/useUnitsQuery.js'
import { useAuth } from '../composables/useAuth.js'

import UnitForm from '../components/UnitForm.vue'
import UnitTable from '../components/UnitTable.vue'
import SearchBar from '../components/SearchBar.vue'

const {
  PAGE_SIZE,
  totalRecords,
  totalPages,
  page,
  units,
  selectedUnit,
  isEditing,
  searchText,
  paginatedUnits,
} = useUnitState()

const { isLoggedIn } = useAuth()
const {
  unitsQuery,
  createUnitMutation,
  updateUnitMutation,
  deleteUnitMutation,
} = useUnitsQuery()

// --- 🟢 Refetch and assign units on login/logout ---
watch(isLoggedIn, async (loggedIn) => {
  if (loggedIn) {
    const unitsResult = await unitsQuery.refetch()
    units.value = Array.isArray(unitsResult.data) ? unitsResult.data : []
  } else {
    units.value = []
  }
})

// --- 🟢 Keep syncing query data to state if available ---
watch(
  [isLoggedIn, () => unitsQuery.data.value],
  ([loggedIn, data]) => {
    if (loggedIn && Array.isArray(data)) {
      units.value = data
    } else {
      units.value = []
    }
  },
  { immediate: true }
)

// 🔍 Search logic
function filterUnits(text) {
  searchText.value = text
  page.value = 1
}

// 💾 Handle submit (create or update)
function handleSubmit(data) {
  if (isEditing.value) {
    handleUpdate(data)
  } else {
    handleCreate(data)
  }
}

function handleCreate(data) {
  createUnitMutation.mutate(data, {
    onSuccess: () => unitsQuery.refetch(),
    onError: (err) => alert(err.message || 'Create failed'),
  })
}

function handleUpdate(data) {
  updateUnitMutation.mutate(
    { id: selectedUnit.value.unit_id, data },
    {
      onSuccess: () => {
        selectedUnit.value = null
        isEditing.value = false
        unitsQuery.refetch()
      },
      onError: (err) => alert(err.message || 'Update failed'),
    }
  )
}

function handleDelete(id) {
  if (confirm('Are you sure?')) {
    deleteUnitMutation.mutate(id, {
      onSuccess: () => unitsQuery.refetch(),
      onError: (err) => alert(err.message || 'Delete failed'),
    })
  }
}

function startEdit(unit) {
  selectedUnit.value = unit
  isEditing.value = true
}
</script>


