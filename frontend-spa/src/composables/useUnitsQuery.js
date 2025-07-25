import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getUnits, createUnit, updateUnit, deleteUnit } from '../services/unitService'

export function useUnitsQuery() {
  const queryClient = useQueryClient()

  const unitsQuery = useQuery({
    queryKey: ['units'],
    queryFn: getUnits,
    select: (data) => data.units || data.data?.units || [],
  })

  const createUnitMutation = useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
    },
  })

  const updateUnitMutation = useMutation({
    mutationFn: ({ id, data }) => updateUnit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
    },
  })

  const deleteUnitMutation = useMutation({
    mutationFn: deleteUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
    },
  })

  return {
    unitsQuery,
    createUnitMutation,
    updateUnitMutation,
    deleteUnitMutation,
  }
}
