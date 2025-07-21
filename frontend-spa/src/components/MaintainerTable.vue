<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle shadow-sm">
      <thead class="table-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in maintainers" :key="m.id">
          <td>{{ m.m_name }}</td>
          <td>{{ m.m_email }}</td>
          <td>{{ m.m_phone }}</td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button @click="$emit('edit', m)" class="btn btn-sm btn-outline-warning">
                <i class="fas fa-edit me-1"></i>Edit
              </button>
              <button @click="$emit('delete', m.id)" class="btn btn-sm btn-outline-danger">
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
defineProps(['maintainers'])
defineEmits(['edit', 'delete'])
</script>
