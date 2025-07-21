<template>
  <input type="text" class="form-control" placeholder="Search units..." @input="handleInput" />
</template>

<script setup>
const emit = defineEmits(['search'])

function handleInput(event) {
  emit('search', event?.target?.value || '')
}
</script>
