<template>
  <div class="table-responsive">
    <table class="table align-middle table-bordered table-hover shadow-sm rounded">
      <thead class="table-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Buy Date</th>
          <th scope="col">Interval</th>
          <th scope="col">Unit</th>
          <th scope="col">Image</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in devices" :key="device.device_id">
          <td>{{ device.device_name }}</td>
          <td>{{ formatDate(device.device_buy_date) }}</td>
          <td>{{ device.device_maintenance_interval }} days</td>
          <td>{{ device.unit_name || device.unit_id }}</td>
          <td>
            <img
              :src="`http://localhost:3000${device.device_img}`"
              alt="device image"
              class="img-thumbnail"
              style="width: 50px; height: 50px; object-fit: cover"
            />
          </td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button @click="$emit('edit', device)" class="btn btn-sm btn-outline-warning">
                <i class="fas fa-edit me-1"></i>Edit
              </button>
              <button
                @click="$emit('delete', device.device_id)"
                class="btn btn-sm btn-outline-danger"
              >
                <i class="fas fa-trash-alt me-1"></i>Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['devices'])
defineEmits(['edit', 'delete'])

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>
