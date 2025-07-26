import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import * as reportService from '../services/reportService.js'

export function useReportsQuery() {
  const queryClient = useQueryClient()

  // Query for getting all reports
  const reportsQuery = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const result = await reportService.getReports()
      return result.reports || result || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })

  // Mutation for creating report
  const createReportMutation = useMutation({
    mutationFn: (data) => {
      console.log('Creating report with data:', data)
      const formData = new FormData()
      formData.append('device_id', data.device_id)
      formData.append('m_id', data.m_id)
      formData.append('mr_date', data.mr_date)
      formData.append('mr_note', data.mr_note)
      return reportService.createReport(formData)
    },
    onSuccess: (data) => {
      console.log('Create report result:', data)
      // Invalidate and refetch reports
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
    onError: (error) => {
      console.error('Error creating report:', error)
    },
  })

  // Mutation for updating report
  const updateReportMutation = useMutation({
    mutationFn: (data) => {
      console.log('Updating report with data in composable:', data)
      const formData = new FormData()
      formData.append('device_id', data.device_id)
      formData.append('m_id', data.m_id)
      formData.append('mr_date', data.mr_date)
      formData.append('mr_note', data.mr_note)
      return reportService.updateReport(formData)
    },
    onSuccess: () => {
      // Invalidate and refetch reports
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
    onError: (error) => {
      console.error('Error updating report:', error)
    },
  })

  // Mutation for deleting report
  const deleteReportMutation = useMutation({
    mutationFn: (data) => {
      console.log('Deleting report with data:', data)
      return reportService.deleteReport(data)
    },
    onSuccess: () => {
      // Invalidate and refetch reports
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
    onError: (error) => {
      console.error('Error deleting report:', error)
    },
  })

  return {
    reportsQuery,
    createReportMutation,
    updateReportMutation,
    deleteReportMutation,
  }
}
