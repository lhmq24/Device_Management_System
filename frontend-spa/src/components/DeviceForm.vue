<template>
  <form @submit.prevent="onSubmit" class="row g-3">
    <!-- Unit Select -->
    <div class="col-md-6">
      <label for="unitSelect" class="form-label">Unit</label>
      <select v-model="form.unit_id" id="unitSelect" class="form-select" required>
        <option disabled value="">Select Unit</option>
        <option v-for="unit in units" :key="unit.unit_id" :value="Number(unit.unit_id)">
          {{ unit.unit_name }}
        </option>
      </select>
    </div>

    <!-- Device Name -->
    <div class="col-md-6">
      <label for="deviceName" class="form-label">Device Name</label>
      <input
        v-model="form.device_name"
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
      <input
        v-model="form.device_buy_date"
        id="buyDate"
        type="date"
        class="form-control"
        required
      />
    </div>

    <!-- Maintenance Interval -->
    <div class="col-md-6">
      <label for="intervalDate" class="form-label">Next Maintenance (days)</label>
      <input
        v-model.number="form.device_maintenance_interval"
        id="intervalDate"
        type="number"
        class="form-control"
        placeholder="Enter interval in days"
        min="1"
        required
      />
    </div>

    <!-- File Upload Field -->
    <div class="col-12">
      <label for="deviceImage" class="form-label">Upload Image</label>
      <input
        id="deviceImage"
        type="file"
        class="form-control"
        accept="image/*"
        @change="handleFileChange"
      />
      <div v-if="previewUrl" class="mt-2">
        <img :src="previewUrl" alt="Preview" class="img-thumbnail" style="max-height: 150px" />
      </div>
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
const previewUrl = ref('')
const file = ref(null)

const props = defineProps({
  device: Object,
  units: Array,
  isEdit: Boolean,
})

const form = ref({
  unit_id: 1,
  device_name: '',
  device_buy_date: '',
  device_maintenance_interval: 30,
  device_img: '/images/blank-profile-picture.png',
})

watch(
  () => props.device,
  (val) => {
    const safeDevice = val || {}

    const formatDate = (dateStr) => {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return date.toISOString().split('T')[0] // keep only YYYY-MM-DD
    }

    form.value = {
      unit_id: safeDevice.unit_id ?? 1,
      device_name: safeDevice.device_name ?? '',
      device_buy_date: formatDate(safeDevice.device_buy_date),
      device_maintenance_interval: safeDevice.device_maintenance_interval ?? 30,
      device_img: safeDevice.device_img ?? '/images/blank-profile-picture.png',
    }
  },
  { immediate: true },
)

function handleFileChange(event) {
  const selected = event.target.files[0]
  file.value = selected
  if (selected) {
    previewUrl.value = URL.createObjectURL(selected)
  } else {
    previewUrl.value = ''
  }
}

function onSubmit() {
  const data = new FormData()
  data.append('unit_id', form.value.unit_id)
  data.append('device_name', form.value.device_name)
  data.append('device_buy_date', form.value.device_buy_date)
  data.append('device_maintenance_interval', form.value.device_maintenance_interval)
  if (file.value) {
    data.append('imgFile', file.value)
  }

  emit('submit', data)
}
</script>
