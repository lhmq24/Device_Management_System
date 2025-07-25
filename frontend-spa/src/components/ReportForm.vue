<template>
  <form @submit.prevent="onSubmit" class="p-3 border rounded shadow-sm bg-light">
    <!-- Device -->
    <div class="mb-3">
      <label for="device" class="form-label">Device</label>
      <select id="device" v-model="form.device_id" required class="form-select">
        <option disabled value="">Select Device</option>
        <option v-for="d in devices" :key="d.device_id" :value="d.device_id">{{ d.device_name }}</option>
      </select>
    </div>

    <!-- Maintainer -->
    <div class="mb-3">
      <label for="maintainer" class="form-label">Maintainer</label>
      <select id="maintainer" v-model="form.m_id" required class="form-select">
        <option disabled value="">Select Maintainer</option>
        <option v-for="m in maintainers" :key="m.m_id" :value="m.m_id">{{ m.m_name }}</option>
      </select>
    </div>

    <!-- Maintenance Date -->
    <div class="mb-3">
      <label for="date" class="form-label">Maintenance Date</label>
      <input id="date" v-model="form.mr_date" type="date" required class="form-control" />
    </div>

    <!-- Note -->
    <div class="mb-3">
      <label for="note" class="form-label">Note (optional)</label>
      <input id="note" v-model="form.mr_note" class="form-control" placeholder="Note (optional)" />
    </div>

    <!-- Submit -->
    <button type="submit" class="btn btn-primary w-100">
      <i :class="isEdit ? 'fas fa-save me-1' : 'fas fa-plus me-1'"></i>
      {{ isEdit ? 'Update Report' : 'Create Report' }}
    </button>
  </form>
</template>


<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['submit'])
const props = defineProps({
  report: Object,
  devices: Array,
  maintainers: Array,
  isEdit: Boolean,
})

const form = ref({
  device_id: '',
  m_id: '',
  mr_date: '',
  mr_note: '',
})

// Watch and auto-fill form when editing
watch(
  () => props.report,
  (r) => {
    form.value = r
      ? {
          device_id: r.device_id || '',
          m_id: r.m_id || '',
          mr_date: formatDate(r.mr_date),
          mr_note: r.mr_note || '',
        }
      : {
          device_id: '',
          m_id: '',
          mr_date: '',
          mr_note: '',
        }
  },
  { immediate: true }
)

function onSubmit() {
  console.log('Submitting report:', form.value)
  emit('submit', { ...form.value })
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toISOString().split('T')[0] // yyyy-mm-dd
}
</script>

