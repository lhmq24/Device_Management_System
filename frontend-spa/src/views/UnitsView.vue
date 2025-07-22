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
          <UnitForm
            :unit="selectedUnit"
            :isEdit="isEditing"
            @submit="isEditing ? handleUpdate : handleCreate"
          />
        </div>

        <!-- Unit table -->
        <UnitTable :units="filteredUnits" @edit="startEdit" @delete="handleDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted} from 'vue'
import { useUnitState } from '../composables/useUnitState.js'
import { getUnits, createUnit, updateUnit, deleteUnit } from '../services/unitService.js'

import UnitForm from '../components/UnitForm.vue'
import UnitTable from '../components/UnitTable.vue'
import SearchBar from '../components/SearchBar.vue'

const {
  units,
  selectedUnit,
  isEditing,
  searchText,
  filteredUnits
} = useUnitState();

function filterUnits(text) {
  searchText.value = text
}

async function loadUnits() {
  const response = await getUnits()
  units.value = response.data?.units || response.units || []
}

async function handleCreate(data) {
  try {
    await createUnit(data)
    await loadUnits()
  } catch (err) {
    console.error('Create failed:', err.message)
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

onMounted(loadUnits)
</script>
