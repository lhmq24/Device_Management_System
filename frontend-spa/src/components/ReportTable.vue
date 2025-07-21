<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle shadow-sm">
      <thead class="table-light">
        <tr>
          <th scope="col">Device</th>
          <th scope="col">Maintainer</th>
          <th scope="col">Date</th>
          <th scope="col">Note</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in reports" :key="`${r.device_id}-${r.m_id}-${r.mr_date}`">
          <td>{{ r.device_name || r.device_id }}</td>
          <td>{{ r.maintainer_name || r.m_id }}</td>
          <td>{{ formatDate(r.mr_date) }}</td>
          <td>{{ r.mr_note }}</td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-sm btn-outline-warning" @click="$emit('edit', r)">
                <i class="fas fa-edit me-1"></i>Edit
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', r)">
                <i class="fas fa-trash me-1"></i>Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['reports'])
defineEmits(['edit', 'delete'])

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>
