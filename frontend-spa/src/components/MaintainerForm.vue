<template>
  <form @submit.prevent="onSubmit" class="row g-3">
    <!-- Name -->
    <div class="col-md-6">
      <label for="mName" class="form-label">Name</label>
      <input
        id="mName"
        v-model="form.m_name"
        type="text"
        class="form-control"
        placeholder="Enter name"
        required
      />
    </div>

    <!-- Email -->
    <div class="col-md-6">
      <label for="mEmail" class="form-label">Email</label>
      <input
        id="mEmail"
        v-model="form.m_email"
        type="email"
        class="form-control"
        placeholder="Enter email"
        required
      />
    </div>

    <!-- Phone -->
    <div class="col-md-6">
      <label for="mPhone" class="form-label">Phone</label>
      <input
        id="mPhone"
        v-model="form.m_phone"
        type="tel"
        class="form-control"
        placeholder="Enter phone number"
        required
      />
    </div>

    <!-- Submit Button -->
    <div class="col-12 d-flex justify-content-end">
      <button type="submit" class="btn btn-primary">
        <i :class="isEdit ? 'fas fa-save me-1' : 'fas fa-plus me-1'"></i>
        {{ isEdit ? 'Update Maintainer' : 'Create Maintainer' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
  maintainer: Object,
  isEdit: Boolean,
})

const form = ref({
  m_name: '',
  m_email: '',
  m_phone: '',
})

watch(
  () => props.maintainer,
  (val) => {
    form.value = val ? { ...val } : { m_name: '', m_email: '', m_phone: '' }
  },
  { immediate: true },
)

function onSubmit() {
  const data = new FormData()
  data.append('m_name', form.value.m_name)
  data.append('m_email', form.value.m_email)
  data.append('m_phone', form.value.m_phone)
  if (props.isEdit) {
    data.append('id', props.maintainer.m_id)
  }
  emit('submit', data)
}
</script>
