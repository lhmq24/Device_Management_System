import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import * as maintainerService from '../services/maintainerService.js'

export function useMaintainersQuery() {
  const queryClient = useQueryClient()

  // Query for getting all maintainers
  const maintainersQuery = useQuery({
    queryKey: ['maintainers'],
    queryFn: async () => {
      const response = await maintainerService.getMaintainers()
      return response.maintainers || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })

  // Mutation for creating maintainer
  const createMaintainerMutation = useMutation({
    mutationFn: maintainerService.createMaintainer,
    onSuccess: (data) => {
      // Invalidate and refetch maintainers
      queryClient.invalidateQueries({ queryKey: ['maintainers'] })
    },
    onError: (error) => {
      console.error('Error creating maintainer:', error)
    },
  })

  // Mutation for updating maintainer
  const updateMaintainerMutation = useMutation({
    mutationFn: ({ id, data }) => maintainerService.updateMaintainer(id, data),
    onSuccess: () => {
      // Invalidate and refetch maintainers
      queryClient.invalidateQueries({ queryKey: ['maintainers'] })
      // Also invalidate specific maintainer if cached
      queryClient.invalidateQueries({ queryKey: ['maintainer'] })
    },
    onError: (error) => {
      console.error('Error updating maintainer:', error)
    },
  })

  // Mutation for deleting maintainer
  const deleteMaintainerMutation = useMutation({
    mutationFn: maintainerService.deleteMaintainer,
    onSuccess: () => {
      // Invalidate and refetch maintainers
      queryClient.invalidateQueries({ queryKey: ['maintainers'] })
    },
    onError: (error) => {
      console.error('Error deleting maintainer:', error)
    },
  })

  return {
    maintainersQuery,
    createMaintainerMutation,
    updateMaintainerMutation,
    deleteMaintainerMutation,
  }
}

// Separate composable for getting maintainer by ID
export function useMaintainerByIdQuery(maintainerId) {
  return useQuery({
    queryKey: ['maintainer', maintainerId],
    queryFn: async () => {
      const result = await maintainerService.getMaintainerById(maintainerId.value || maintainerId)
      return result.data || result
    },
    enabled: !!maintainerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}
