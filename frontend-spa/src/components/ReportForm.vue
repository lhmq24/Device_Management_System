<template>
  <form @submit.prevent="onSubmit" class="p-3 border rounded shadow-sm bg-light">
    <div class="mb-3">
      <label for="device" class="form-label">Device</label>
      <select
        id="device"
        :value="form.device_id"
        @input="updateField('device_id', $event)"
        required
        class="form-select"
      >
        <option disabled value="">Select Device</option>
        <option v-for="d in devices" :key="d.id" :value="d.id">{{ d.device_name }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="maintainer" class="form-label">Maintainer</label>
      <select
        id="maintainer"
        :value="form.m_id"
        @input="updateField('m_id', $event)"
        required
        class="form-select"
      >
        <option disabled value="">Select Maintainer</option>
        <option v-for="m in maintainers" :key="m.id" :value="m.id">{{ m.m_name }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="date" class="form-label">Maintenance Date</label>
      <input
        id="date"
        :value="form.mr_date"
        @input="updateField('mr_date', $event)"
        type="date"
        required
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="note" class="form-label">Note (optional)</label>
      <input
        id="note"
        :value="form.mr_note"
        @input="updateField('mr_note', $event)"
        class="form-control"
        placeholder="Note (optional)"
      />
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
  (newReport) => {
    if (newReport) {
      // Only update form if there's a change in the report
      Object.assign(form.value, newReport)
    }
  },
  { immediate: true },
)

// Custom method to handle form input updates
function updateField(field, event) {
  form.value[field] = event.target.value
}

function onSubmit() {
  emit('submit', { ...form.value })
}
</script>
