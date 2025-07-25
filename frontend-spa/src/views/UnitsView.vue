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
import { onMounted, watch } from 'vue'
import { useUnitState } from '../composables/useUnitState.js'
import { getUnits, createUnit, updateUnit, deleteUnit } from '../services/unitService.js'
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

watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    loadUnits()
  } else {
    units.value = [] // Clear data after logout
  }
})

onMounted(() => {
  if (isLoggedIn.value) {
    loadUnits()
  }
})

function filterUnits(text) {
  searchText.value = text
  page.value = 1 // reset to first page after search
}

async function loadUnits() {
  const response = await getUnits()
  units.value = response.data?.units || response.units || []
}

async function handleCreate(data) {
  try {
    const result = await createUnit(data)
    if (result.status === 'success') {
      await loadUnits()
    } else {
      alert(result.message || 'Failed to create unit')
    }
  } catch (err) {
    console.error('Create failed:', err.message)
    alert('Create failed: ' + err.message)
  }
}

function startEdit(unit) {
  selectedUnit.value = unit
  isEditing.value = true
}

async function handleUpdate(data) {
  await updateUnit(selectedUnit.value.unit_id, data)
  selectedUnit.value = null
  isEditing.value = false
  await loadUnits()
}

async function handleDelete(id) {
  if (confirm('Are you sure?')) {
    await deleteUnit(id)
    await loadUnits()
  }
}

function handleSubmit(data) {
  if (isEditing.value) {
    handleUpdate(data)
  } else {
    handleCreate(data)
  }
}

onMounted(loadUnits)
</script>
