// composables/useUnitState.js
import { ref, computed } from 'vue'

const units = ref([])
const selectedUnit = ref(null)
const isEditing = ref(false)
const searchText = ref('')

const filteredUnits = computed(() =>
  units.value.filter((u) => u.unit_name.toLowerCase().includes(searchText.value.toLowerCase())),
)

export function useUnitState() {
  return {
    units,
    selectedUnit,
    isEditing,
    searchText,
    filteredUnits,
  }
}
