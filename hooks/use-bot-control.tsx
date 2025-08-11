"use client"

import { useState, useEffect, useCallback } from 'react'
import { chimeraAPI, type BotStatus } from '@/lib/api'

export interface BotControlState {
  status: BotStatus | null
  isLoading: boolean
  error: string | null
  monitoringData: any
  aiSettings: any
}

export function useBotControl() {
  const [state, setState] = useState<BotControlState>({
    status: null,
    isLoading: true,
    error: null,
    monitoringData: null,
    aiSettings: null
  })

  const updateState = useCallback((updates: Partial<BotControlState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  const fetchBotStatus = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: null })
      const response = await chimeraAPI.getBotStatus()
      if (response.success) {
        updateState({ status: response.data, isLoading: false })
      } else {
        updateState({ error: 'Failed to fetch bot status', isLoading: false })
      }
    } catch (error) {
      updateState({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      })
    }
  }, [updateState])

  const fetchMonitoringData = useCallback(async () => {
    try {
      const response = await chimeraAPI.getMonitoringData()
      if (response.success) {
        updateState({ monitoringData: response.data })
      }
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error)
    }
  }, [updateState])

  const fetchAISettings = useCallback(async () => {
    try {
      const response = await chimeraAPI.getAISettings()
      if (response.success) {
        updateState({ aiSettings: response.data })
      }
    } catch (error) {
      console.error('Failed to fetch AI settings:', error)
    }
  }, [updateState])

  const controlBot = useCallback(async (action: 'start' | 'pause' | 'stop') => {
    try {
      updateState({ isLoading: true, error: null })
      const response = await chimeraAPI.controlBot(action)
      if (response.success) {
        updateState({ status: response.data, isLoading: false })
        return { success: true, message: response.message }
      } else {
        updateState({ error: 'Failed to control bot', isLoading: false })
        return { success: false, message: 'Failed to control bot' }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      updateState({ error: errorMessage, isLoading: false })
      return { success: false, message: errorMessage }
    }
  }, [updateState])

  const updateMonitoringChannels = useCallback(async (channels: string[]) => {
    try {
      const response = await chimeraAPI.updateMonitoringChannels(channels)
      if (response.success) {
        // Update the status with new monitoring channels
        if (state.status) {
          updateState({ 
            status: { 
              ...state.status, 
              monitoring_channels: response.data 
            }
          })
        }
        return { success: true, message: response.message }
      } else {
        return { success: false, message: 'Failed to update monitoring channels' }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      return { success: false, message: errorMessage }
    }
  }, [state.status, updateState])

  const updateAISettings = useCallback(async (aiFeatures: any) => {
    try {
      const response = await chimeraAPI.updateAISettings(aiFeatures)
      if (response.success) {
        // Update the status with new AI settings
        if (state.status) {
          updateState({ 
            status: { 
              ...state.status, 
              ai_features: response.data 
            },
            aiSettings: response.data
          })
        }
        return { success: true, message: response.message }
      } else {
        return { success: false, message: 'Failed to update AI settings' }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      return { success: false, message: errorMessage }
    }
  }, [state.status, updateState])

  const generateAIReport = useCallback(async (timeframe: string = '24h') => {
    try {
      const response = await chimeraAPI.generateAIReport(state.monitoringData || {}, timeframe)
      if (response.success) {
        return { success: true, data: response.data }
      } else {
        return { success: false, message: 'Failed to generate AI report' }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      return { success: false, message: errorMessage }
    }
  }, [state.monitoringData])

  const analyzeText = useCallback(async (text: string) => {
    try {
      const response = await chimeraAPI.analyzeText(text)
      if (response.success) {
        return { success: true, data: response.data }
      } else {
        return { success: false, message: 'Failed to analyze text' }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      return { success: false, message: errorMessage }
    }
  }, [])

  const detectAnomalies = useCallback(async (metrics: any) => {
    try {
      const response = await chimeraAPI.detectAnomalies(metrics)
      if (response.success) {
        return { success: true, data: response.data }
      } else {
        return { success: false, message: 'Failed to detect anomalies' }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      return { success: false, message: errorMessage }
    }
  }, [])

  const checkHealth = useCallback(async () => {
    try {
      const response = await chimeraAPI.checkHealth()
      return { success: response.success, data: response }
    } catch (error) {
      return { success: false, message: 'Health check failed' }
    }
  }, [])

  // Initialize data on mount
  useEffect(() => {
    fetchBotStatus()
    fetchMonitoringData()
    fetchAISettings()
  }, [fetchBotStatus, fetchMonitoringData, fetchAISettings])

  // Set up polling for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBotStatus()
      fetchMonitoringData()
    }, 10000) // Poll every 10 seconds

    return () => clearInterval(interval)
  }, [fetchBotStatus, fetchMonitoringData])

  return {
    ...state,
    actions: {
      controlBot,
      updateMonitoringChannels,
      updateAISettings,
      generateAIReport,
      analyzeText,
      detectAnomalies,
      checkHealth,
      refresh: fetchBotStatus
    }
  }
}

