// composables/useUnitState.js
import { ref, computed } from 'vue'

const PAGE_SIZE = 10

const units = ref([])
const selectedUnit = ref(null)
const isEditing = ref(false)
const searchText = ref('')
const page = ref(1)

const filteredUnits = computed(() =>
  units.value.filter((u) => u.unit_name.toLowerCase().includes(searchText.value.toLowerCase())),
)

const totalRecords = computed(() => filteredUnits.value.length)

const paginatedUnits = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filteredUnits.value.slice(start, start + PAGE_SIZE)
})

const totalPages = computed(() => Math.ceil(totalRecords.value / PAGE_SIZE))

export function useUnitState() {
  return {
    units,
    selectedUnit,
    isEditing,
    searchText,
    filteredUnits,
    paginatedUnits,
    totalRecords,
    page,
    totalPages,
    PAGE_SIZE,
  }
}
