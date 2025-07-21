<template>
  <form @submit.prevent="onSubmit" class="row g-3">
    <!-- Unit Select -->
    <div class="col-md-6">
      <label for="unitSelect" class="form-label">Unit</label>
      <select v-model="form.unit_id" id="unitSelect" class="form-select" required>
        <option disabled value="">Select Unit</option>
        <option v-for="unit in units" :key="unit.id" :value="unit.id">
          {{ unit.unit_name }}
        </option>
      </select>
    </div>

    <!-- Device Name -->
    <div class="col-md-6">
      <label for="deviceName" class="form-label">Device Name</label>
      <input
        v-model="form.name"
        id="deviceName"
        type="text"
        class="form-control"
        placeholder="Enter device name"
        required
      />
    </div>

    <!-- Buy Date -->
    <div class="col-md-6">
      <label for="buyDate" class="form-label">Buy Date</label>
      <input v-model="form.buy_date" id="buyDate" type="date" class="form-control" required />
    </div>

    <!-- Maintenance Interval -->
    <div class="col-md-6">
      <label for="intervalDate" class="form-label">Next Maintenance</label>
      <input
        v-model="form.maintenance_interval_date"
        id="intervalDate"
        type="date"
        class="form-control"
        required
      />
    </div>

    <!-- Image URL -->
    <div class="col-12">
      <label for="deviceImage" class="form-label">Image URL</label>
      <input
        v-model="form.device_img"
        id="deviceImage"
        type="text"
        class="form-control"
        placeholder="http://example.com/image.jpg"
      />
    </div>

    <!-- Submit Button -->
    <div class="col-12 d-flex justify-content-end">
      <button type="submit" class="btn btn-primary">
        <i :class="isEdit ? 'fas fa-save me-1' : 'fas fa-plus me-1'"></i>
        {{ isEdit ? 'Update Device' : 'Create Device' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
  device: Object,
  units: Array,
  isEdit: Boolean,
})

const form = ref({
  unit_id: '',
  name: '',
  buy_date: '',
  maintenance_interval_date: '',
  device_img: '',
})

watch(
  () => props.device,
  (val) => {
    form.value = val
      ? { ...val }
      : {
          unit_id: '',
          name: '',
          buy_date: '',
          maintenance_interval_date: '',
          device_img: '',
        }
  },
  { immediate: true },
)

function onSubmit() {
  emit('submit', { ...form.value })
}
</script>
