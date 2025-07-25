// composables/useDevicesQuery.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getDevices, createDevice, updateDevice, deleteDevice } from '../services/deviceService'

export function useDevicesQuery() {
  const queryClient = useQueryClient()

  const devicesQuery = useQuery({
    queryKey: ['devices'],
    queryFn: getDevices,
  })

  const createDeviceMutation = useMutation({
    mutationFn: createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries(['devices'])
    },
  })

  const updateDeviceMutation = useMutation({
    mutationFn: ({ id, data }) => updateDevice(id, data),
    onSuccess: () => queryClient.invalidateQueries(['devices']),
  })

  const deleteDeviceMutation = useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => queryClient.invalidateQueries(['devices']),
  })

  return {
    devicesQuery,
    createDeviceMutation,
    updateDeviceMutation,
    deleteDeviceMutation,
  }
}
