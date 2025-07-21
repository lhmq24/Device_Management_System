<template>
  <table class="table table-bordered table-hover">
    <thead class="table-light">
      <tr>
        <th>Unit Name</th>
        <th>Location</th>
        <th style="width: 150px">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="unit in units" :key="unit.unit_id">
        <td>{{ unit.unit_name }}</td>
        <td>{{ unit.unit_location }}</td>
        <td>
          <button class="btn btn-sm btn-primary me-2" @click="$emit('edit', unit)">Edit</button>
          <button class="btn btn-sm btn-danger" @click="$emit('delete', unit.unit_id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['units'])
defineEmits(['edit', 'delete'])
</script>
