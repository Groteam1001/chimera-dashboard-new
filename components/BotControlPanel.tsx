"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useBotControl } from "@/hooks/use-bot-control"
import {
  Bot,
  MessageSquare,
  Users,
  Brain,
  Play,
  Pause,
  Square,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  BarChart3,
  Zap,
  Eye,
} from "lucide-react"

interface BotControlPanelProps {
  isMobile?: boolean
}

export function BotControlPanel({ isMobile = false }: BotControlPanelProps) {
  const { status, isLoading, error, monitoringData, aiSettings, actions } = useBotControl()
  const [reportTimeframe, setReportTimeframe] = useState('24h')
  const [analysisText, setAnalysisText] = useState('')
  const [newChannels, setNewChannels] = useState('')

  const getBotStatusColor = (botStatus: string) => {
    switch (botStatus) {
      case 'online': return 'bg-green-900/50 text-green-300 border-green-500/50'
      case 'paused': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50'
      case 'offline': return 'bg-gray-800 text-gray-300 border-gray-600'
      default: return 'bg-gray-800 text-gray-300 border-gray-600'
    }
  }

  const getBotStatusIcon = (botStatus: string) => {
    switch (botStatus) {
      case 'online': return <CheckCircle className="w-4 h-4" />
      case 'paused': return <Pause className="w-4 h-4" />
      case 'offline': return <Square className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const handleControlBot = async (action: 'start' | 'pause' | 'stop') => {
    const result = await actions.controlBot(action)
    if (result.success) {
      console.log(`✅ Bot ${action} successful: ${result.message}`)
    } else {
      console.error(`❌ Bot ${action} failed: ${result.message}`)
    }
  }

  const handleUpdateChannels = async () => {
    if (!newChannels.trim()) return
    
    const channels = newChannels.split(',').map(ch => ch.trim()).filter(ch => ch)
    const result = await actions.updateMonitoringChannels(channels)
    
    if (result.success) {
      console.log('✅ Monitoring channels updated successfully')
      setNewChannels('')
    } else {
      console.error('❌ Failed to update monitoring channels:', result.message)
    }
  }

  const handleGenerateReport = async () => {
    const result = await actions.generateAIReport(reportTimeframe)
    if (result.success) {
      console.log('✅ AI Report generated:', result.data)
    } else {
      console.error('❌ Failed to generate report:', result.message)
    }
  }

  const handleAnalyzeText = async () => {
    if (!analysisText.trim()) return
    
    const result = await actions.analyzeText(analysisText)
    if (result.success) {
      console.log('✅ Text analysis result:', result.data)
    } else {
      console.error('❌ Text analysis failed:', result.message)
    }
  }

  const handleToggleAIFeature = async (feature: string, enabled: boolean) => {
    if (!aiSettings) return
    
    const newSettings = { ...aiSettings, [feature]: enabled }
    const result = await actions.updateAISettings(newSettings)
    
    if (result.success) {
      console.log(`✅ AI feature ${feature} ${enabled ? 'enabled' : 'disabled'}`)
    } else {
      console.error(`❌ Failed to update AI feature ${feature}:`, result.message)
    }
  }

  if (error) {
    return (
      <Card className="bg-black/80 border-red-500/30 shadow-xl shadow-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Bot Connection Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-300 mb-4">{error}</p>
          <Button 
            onClick={actions.refresh}
            variant="outline"
            className="border-red-500/50 text-red-300 hover:bg-red-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Connection
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-4 ${isMobile ? 'space-y-3' : 'space-y-6'}`}>
      {/* Bot Status Card */}
      <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
        <CardHeader className={isMobile ? 'pb-3' : 'pb-4'}>
          <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-gold glow-gold flex items-center gap-2`}>
            <Bot className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            DISCORD BOT STATUS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getBotStatusIcon(status?.status || 'offline')}
              <Badge className={`${getBotStatusColor(status?.status || 'offline')} border font-bold px-3 py-1`}>
                {status?.status?.toUpperCase() || 'UNKNOWN'}
              </Badge>
            </div>
            <Button
              onClick={actions.refresh}
              variant="outline"
              size="sm"
              className="border-gold/50 text-gold hover:bg-gold/10 bg-transparent"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {status && (
            <div className="text-sm text-gold/70">
              Last Updated: {new Date(status.last_updated).toLocaleString()}
            </div>
          )}

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-3`}>
            <Button
              onClick={() => handleControlBot('start')}
              disabled={isLoading || status?.status === 'online'}
              className="bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              <Play className="w-4 h-4 mr-2" />
              START
            </Button>
            <Button
              onClick={() => handleControlBot('pause')}
              disabled={isLoading || status?.status !== 'online'}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold"
            >
              <Pause className="w-4 h-4 mr-2" />
              PAUSE
            </Button>
            <Button
              onClick={() => handleControlBot('stop')}
              disabled={isLoading || status?.status === 'offline'}
              variant="destructive"
              className="font-bold"
            >
              <Square className="w-4 h-4 mr-2" />
              STOP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Configuration */}
      <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
        <CardHeader className={isMobile ? 'pb-3' : 'pb-4'}>
          <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-gold glow-gold flex items-center gap-2`}>
            <Eye className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            MONITORING CONFIG
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="channels" className="text-gold/90 font-medium">
              Monitored Channels (comma-separated)
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="channels"
                value={newChannels}
                onChange={(e) => setNewChannels(e.target.value)}
                placeholder="general, announcements, support"
                className="bg-black/50 border-gold/30 text-gold placeholder:text-gold/50"
              />
              <Button
                onClick={handleUpdateChannels}
                size="sm"
                className="bg-gold text-black hover:bg-gold/90 font-bold"
              >
                Update
              </Button>
            </div>
          </div>

          {status?.monitoring_channels && status.monitoring_channels.length > 0 && (
            <div>
              <Label className="text-gold/90 font-medium">Current Channels:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {status.monitoring_channels.map((channel, index) => (
                  <Badge key={index} className="bg-gold/20 text-gold border-gold/30">
                    #{channel}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Features */}
      <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
        <CardHeader className={isMobile ? 'pb-3' : 'pb-4'}>
          <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-gold glow-gold flex items-center gap-2`}>
            <Brain className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            AI FEATURES
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiSettings && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-gold/90 font-medium">Sentiment Analysis</Label>
                <Switch
                  checked={aiSettings.sentiment_analysis}
                  onCheckedChange={(checked) => handleToggleAIFeature('sentiment_analysis', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gold/90 font-medium">Anomaly Detection</Label>
                <Switch
                  checked={aiSettings.anomaly_detection}
                  onCheckedChange={(checked) => handleToggleAIFeature('anomaly_detection', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gold/90 font-medium">Auto Reports</Label>
                <Switch
                  checked={aiSettings.auto_reports}
                  onCheckedChange={(checked) => handleToggleAIFeature('auto_reports', checked)}
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <Label htmlFor="analysis-text" className="text-gold/90 font-medium">
                Test Text Analysis
              </Label>
              <Textarea
                id="analysis-text"
                value={analysisText}
                onChange={(e) => setAnalysisText(e.target.value)}
                placeholder="Enter text to analyze sentiment and topics..."
                className="bg-black/50 border-gold/30 text-gold placeholder:text-gold/50 mt-2"
                rows={3}
              />
              <Button
                onClick={handleAnalyzeText}
                size="sm"
                className="bg-gold text-black hover:bg-gold/90 font-bold mt-2"
                disabled={!analysisText.trim()}
              >
                <Brain className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>

            <div>
              <Label className="text-gold/90 font-medium">Generate AI Report</Label>
              <div className="flex gap-2 mt-2">
                <select
                  value={reportTimeframe}
                  onChange={(e) => setReportTimeframe(e.target.value)}
                  className="bg-black/50 border border-gold/30 text-gold rounded px-3 py-2 text-sm"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
                <Button
                  onClick={handleGenerateReport}
                  size="sm"
                  className="bg-gold text-black hover:bg-gold/90 font-bold"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Data */}
      {monitoringData && (
        <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
          <CardHeader className={isMobile ? 'pb-3' : 'pb-4'}>
            <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-gold glow-gold flex items-center gap-2`}>
              <Activity className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              MONITORING DATA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
              <div className="text-center p-3 bg-gradient-to-br from-gold/10 to-red/10 rounded-lg border border-gold/20">
                <div className="text-xl font-bold text-gold glow-gold">
                  {monitoringData.new_channels?.length || 0}
                </div>
                <div className="text-xs text-gold/70">NEW CHANNELS</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-pink/10 to-red/10 rounded-lg border border-pink/20">
                <div className="text-xl font-bold text-pink glow-pink">
                  {monitoringData.messages?.length || 0}
                </div>
                <div className="text-xs text-pink/70">MESSAGES</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-red/10 to-gold/10 rounded-lg border border-red/20">
                <div className="text-xl font-bold text-red-400 glow-red">
                  {monitoringData.alerts?.length || 0}
                </div>
                <div className="text-xs text-red-300/70">ALERTS</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-gold/10 to-pink/10 rounded-lg border border-gold/20">
                <div className="text-xl font-bold text-gold glow-gold">
                  {monitoringData.reports?.length || 0}
                </div>
                <div className="text-xs text-gold/70">REPORTS</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

