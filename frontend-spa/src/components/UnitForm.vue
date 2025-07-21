<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="unitName" class="form-label">Unit Name</label>
      <input
        id="unitName"
        v-model="localUnit.unit_name"
        type="text"
        class="form-control"
        placeholder="Enter unit name"
        required
      />
    </div>

    <div class="mb-3">
      <label for="unitLocation" class="form-label">Unit Location</label>
      <input
        id="unitLocation"
        v-model="localUnit.unit_location"
        type="text"
        class="form-control"
        placeholder="Enter unit location"
        required
      />
    </div>

    <button type="submit" class="btn btn-primary">
      {{ isEdit ? 'Update Unit' : 'Add Unit' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  unit: Object,
  isEdit: Boolean,
})

const emit = defineEmits(['submit'])

const localUnit = reactive({
  unit_name: '',
  unit_location: '',
})

watch(
  () => props.unit,
  (newUnit) => {
    if (newUnit) {
      localUnit.unit_name = newUnit.unit_name || ''
      localUnit.unit_location = newUnit.unit_location || ''
    }
  },
  { immediate: true },
)

function onSubmit() {
  emit('submit', { ...localUnit })
  localUnit.unit_name = ''
  localUnit.unit_location = ''
}
</script>
