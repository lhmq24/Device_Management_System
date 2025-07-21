<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <h2 class="card-title mb-4">Maintainers</h2>

        <div class="mb-4">
          <MaintainerForm
            :maintainer="selected"
            :isEdit="isEditing"
            @submit="isEditing ? handleUpdate : handleCreate"
          />
        </div>

        <MaintainerTable :maintainers="maintainers" @edit="startEdit" @delete="handleDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getMaintainers,
  createMaintainer,
  updateMaintainer,
  deleteMaintainer,
} from '../services/maintainerService.js'

import MaintainerForm from '../components/MaintainerForm.vue'
import MaintainerTable from '../components/MaintainerTable.vue'

const maintainers = ref([])
const selected = ref(null)
const isEditing = ref(false)

async function load() {
  const response = await getMaintainers()
  maintainers.value = response.maintainers || []
}

async function handleCreate(data) {
  const result = await createMaintainer(data)
  console.log('Create maintainer result:', result)
  await load()
}

function startEdit(m) {
  selected.value = m
  isEditing.value = true
}

async function handleUpdate(data) {
  await updateMaintainer(selected.value.id, data)
  selected.value = null
  isEditing.value = false
  await load()
}

async function handleDelete(id) {
  if (confirm('Delete this maintainer?')) {
    await deleteMaintainer(id)
    await load()
  }
}

onMounted(load)
</script>
