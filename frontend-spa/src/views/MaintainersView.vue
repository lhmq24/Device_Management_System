<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <h2 class="card-title mb-4">Maintainers</h2>

        <div class="mb-4">
          <MaintainerForm :maintainer="selected" :isEdit="isEditing" @submit="handleSubmit" />
        </div>

        <MaintainerTable
          :maintainers="paginatedMaintainers"
          @edit="startEdit"
          @delete="handleDelete"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import {
  getMaintainers,
  createMaintainer,
  updateMaintainer,
  deleteMaintainer,
} from '../services/maintainerService.js'
import { useMaintainerState } from '../composables/useMaintainerState.js'
const {
  maintainers,
  selected,
  isEditing,
  page,
  PAGE_SIZE,
  totalRecords,
  totalPages,
  paginatedMaintainers,
} = useMaintainerState()

import { useAuth } from '../composables/useAuth.js'

import MaintainerForm from '../components/MaintainerForm.vue'
import MaintainerTable from '../components/MaintainerTable.vue'

const { isLoggedIn } = useAuth()

watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    load()
  } else {
    maintainers.value = [] // Clear data after logout
  }
})

onMounted(() => {
  if (isLoggedIn.value) {
    load()
  }
})

async function load() {
  const response = await getMaintainers()
  maintainers.value = response.maintainers || []
}

async function handleCreate(data) {
  const result = await createMaintainer(data)
  console.log('Create maintainer result:', result)
  page.value = 1
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
  page.value = 1
  await load()
}

async function handleDelete(id) {
  if (confirm('Delete this maintainer?')) {
    await deleteMaintainer(id)
    page.value = 1
    await load()
  }
}

function handleSubmit(data) {
  if (isEditing.value) {
    handleUpdate(data)
  } else {
    handleCreate(data)
  }
}

onMounted(load)
</script>
