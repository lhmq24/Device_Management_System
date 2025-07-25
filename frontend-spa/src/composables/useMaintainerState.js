// composables/useMaintainerState.js
import { ref, computed } from 'vue'

const maintainers = ref([])
const selected = ref(null)
const isEditing = ref(false)

const PAGE_SIZE = 5
const page = ref(1)

const totalRecords = computed(() => maintainers.value.length)
const totalPages = computed(() => Math.ceil(totalRecords.value / PAGE_SIZE))

const paginatedMaintainers = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return maintainers.value.slice(start, start + PAGE_SIZE)
})

export function useMaintainerState() {
  return {
    maintainers,
    selected,
    isEditing,
    page,
    PAGE_SIZE,
    totalRecords,
    totalPages,
    paginatedMaintainers,
  }
}
