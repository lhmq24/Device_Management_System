<template>
  <form @submit.prevent="onSubmit" class="p-3 border rounded shadow-sm bg-light">
    <div class="mb-3">
      <label for="device" class="form-label">Device</label>
      <select id="device" v-model="form.device_id" required class="form-select">
        <option disabled value="">Select Device</option>
        <option v-for="d in devices" :key="d.id" :value="d.id">{{ d.device_name }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="maintainer" class="form-label">Maintainer</label>
      <select id="maintainer" v-model="form.m_id" required class="form-select">
        <option disabled value="">Select Maintainer</option>
        <option v-for="m in maintainers" :key="m.id" :value="m.id">{{ m.m_name }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="date" class="form-label">Maintenance Date</label>
      <input id="date" v-model="form.mr_date" type="date" required class="form-control" />
    </div>

    <div class="mb-3">
      <label for="note" class="form-label">Note (optional)</label>
      <input id="note" v-model="form.mr_note" class="form-control" placeholder="Note (optional)" />
    </div>

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

watch(
  () => props.report,
  (val) => {
    form.value = val ? { ...val } : { device_id: '', m_id: '', mr_date: '', mr_note: '' }
  },
  { immediate: true },
)

function onSubmit() {
  emit('submit', { ...form.value })
}
</script>
