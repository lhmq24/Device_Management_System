import { ref, computed } from 'vue'

const maintainers = ref([])
const selected = ref(null)
const isEditing = ref(false)


export function useMaintainerState() {
  return {
    maintainers,
    selected,
    isEditing,
  }
}
