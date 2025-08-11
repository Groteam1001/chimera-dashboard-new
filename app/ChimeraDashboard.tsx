"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Lock,
  User,
  Settings,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Power,
  Activity,
  Zap,
  Eye,
  Target,
  Download,
  RefreshCw,
  Menu,
  X,
} from "lucide-react"

// Types
type SystemStatus = "offline" | "online" | "warning" | "critical"
type OperationMode = "monitoring" | "analysis" | "maintenance"

interface SystemMetrics {
  cpuUsage: number
  memoryUsage: number
  networkThroughput: number
  diskUsage: number
  activeConnections: number
  responseTime: number
  powerLevel: number
  threatLevel: number
}

interface AlertItem {
  id: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  timestamp: Date
  resolved: boolean
}

interface LogEntry {
  id: string
  type: "info" | "warning" | "error" | "critical"
  message: string
  timestamp: Date
}

// Discord Bot Types
interface DiscordSettings {
  botToken: string
  guildId: string
  reportChannelId: string
  dmReportUsers: string[]
  monitorChannelCreation: boolean
  monitorChannelDeletion: boolean
  monitorRoleChanges: boolean
  monitorMemberJoin: boolean
  monitorMemberLeave: boolean
  monitorMessageDeletes: boolean
  webhookUrl: string
  alertKeywords: string[]
}

interface DiscordEvent {
  id: string
  type: "channel_create" | "channel_delete" | "member_join" | "member_leave" | "role_change" | "message_delete"
  timestamp: Date
  details: string
  userId?: string
  channelId?: string
  guildId?: string
  severity: "low" | "medium" | "high"
}

// Professional Login Component with Gold/Red/Pink/Black Theme
function LoginInterface({ onLogin }: { onLogin: () => void }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      if (credentials.username.toLowerCase() === "admin" && credentials.password === "chimera2024") {
        onLogin()
      } else {
        setError("Access denied. Invalid credentials.")
        setIsLoading(false)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold to-red rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl shadow-gold/20 animate-pulse-gold">
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-black" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2 glow-gold">CHIMERA</h1>
          <p className="text-sm md:text-base text-gold/80 font-medium tracking-wide">Enterprise AI Control System</p>
        </div>

        <Card className="bg-black/90 border-gold/30 shadow-2xl shadow-gold/10 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl md:text-2xl text-center text-gold glow-gold">System Access</CardTitle>
            <p className="text-xs md:text-sm text-gold/70 text-center">
              Enter your credentials to access the control panel
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gold font-medium text-sm md:text-base">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 md:w-5 md:h-5 text-gold/70" />
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                    className="pl-10 md:pl-12 h-10 md:h-12 bg-black/60 border-gold/30 text-white focus:border-gold focus:ring-gold/50 text-sm md:text-base"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gold font-medium text-sm md:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 md:w-5 md:h-5 text-gold/70" />
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    className="pl-10 md:pl-12 h-10 md:h-12 bg-black/60 border-gold/30 text-white focus:border-gold focus:ring-gold/50 text-sm md:text-base"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm animate-pulse">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 md:h-12 bg-gradient-to-r from-gold to-red hover:from-gold/90 hover:to-red/90 text-black font-bold text-sm md:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-gold/30"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span className="text-xs md:text-base">Authenticating...</span>
                  </div>
                ) : (
                  "ACCESS SYSTEM"
                )}
              </Button>

              <p className="text-xs text-gold/60 text-center mt-4">Demo: admin / chimera2024</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Enhanced 3D Visualization with Gold/Red/Pink theme
function SystemVisualization({ status, metrics }: { status: SystemStatus; metrics: SystemMetrics }) {
  const sphereRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)

  const statusConfig = useMemo(
    () => ({
      offline: { color: 0x64748b, intensity: 0.1, speed: 0.5 },
      online: { color: 0xffd700, intensity: 0.6, speed: 1.0 },
      warning: { color: 0xff6b35, intensity: 0.8, speed: 1.5 },
      critical: { color: 0xff1493, intensity: 1.0, speed: 2.0 },
    }),
    [],
  )

  useFrame((state) => {
    if (!sphereRef.current || !ringsRef.current) return

    const time = state.clock.elapsedTime
    const config = statusConfig[status]

    // Core rotation and pulsing
    sphereRef.current.rotation.y += 0.01 * config.speed
    ringsRef.current.rotation.z += 0.005 * config.speed

    // Dynamic scaling based on power level
    const scale = 1 + (metrics.powerLevel / 100) * 0.3 + Math.sin(time * config.speed) * 0.1
    sphereRef.current.scale.setScalar(scale)

    // Update material properties
    const material = sphereRef.current.material as THREE.MeshStandardMaterial
    material.emissive.setHex(config.color)
    material.emissiveIntensity = config.intensity * (metrics.powerLevel / 100)

    // Update ring materials
    ringsRef.current.children.forEach((ring, index) => {
      const ringMaterial = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial
      ringMaterial.opacity = 0.3 + (metrics.powerLevel / 100) * 0.4 + Math.sin(time + index) * 0.1
    })
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffd700" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ff6b35" />
      <pointLight position={[0, 5, -5]} intensity={0.6} color="#ff1493" />

      {/* Main core sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive={statusConfig[status].color}
          emissiveIntensity={statusConfig[status].intensity}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Energy rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.0, 32]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[2.2, 2.4, 32]} />
          <meshBasicMaterial color="#ff6b35" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <ringGeometry args={[2.6, 2.8, 32]} />
          <meshBasicMaterial color="#ff1493" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  )
}

// Enhanced Chart Component
function MetricsChart({ data, title, color }: { data: number[]; title: string; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear with dark background
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * rect.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    // Draw chart line
    if (data.length > 1) {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.shadowColor = color
      ctx.shadowBlur = 3
      ctx.beginPath()

      const stepX = rect.width / (data.length - 1)
      data.forEach((value, index) => {
        const x = index * stepX
        const y = rect.height - (value / 100) * rect.height

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Fill area with gradient
      ctx.lineTo(rect.width, rect.height)
      ctx.lineTo(0, rect.height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
      gradient.addColorStop(0, color + "40")
      gradient.addColorStop(1, color + "00")

      ctx.fillStyle = gradient
      ctx.fill()
    }
  }, [data, color])

  return (
    <div className="space-y-2 md:space-y-3">
      <h4 className="text-xs md:text-sm font-semibold text-gold">{title}</h4>
      <canvas
        ref={canvasRef}
        className="w-full h-16 md:h-24 border border-gold/20 rounded-lg bg-black/50"
        style={{ width: "100%", height: window.innerWidth < 768 ? "64px" : "96px" }}
      />
    </div>
  )
}

// Enhanced Status Badge
function StatusBadge({ status }: { status: SystemStatus }) {
  const config = {
    offline: { color: "bg-gray-800 text-gray-300 border-gray-600", icon: "●", label: "OFFLINE" },
    online: { color: "bg-green-900/50 text-green-300 border-green-500/50", icon: "●", label: "ONLINE" },
    warning: { color: "bg-yellow-900/50 text-yellow-300 border-yellow-500/50", icon: "●", label: "WARNING" },
    critical: { color: "bg-red-900/50 text-red-300 border-red-500/50", icon: "●", label: "CRITICAL" },
  }

  return (
    <Badge className={`${config[status].color} border font-bold px-2 md:px-3 py-1 animate-pulse text-xs md:text-sm`}>
      <span className="mr-1 md:mr-2 text-sm md:text-lg">{config[status].icon}</span>
      {config[status].label}
    </Badge>
  )
}

// Main Enhanced Dashboard
export default function ChimeraDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [systemStatus, setSystemStatus] = useState<SystemStatus>("online")
  const [operationMode, setOperationMode] = useState<OperationMode>("monitoring")
  const [isRebooting, setIsRebooting] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [settings, setSettings] = useState({
    theme: "dark",
    notifications: true,
    autoRefresh: true,
    refreshInterval: 1500,
    soundEffects: false,
    highContrast: false,
    language: "en",
    timezone: "UTC",
    dataRetention: 30,
    alertThreshold: 75,
    discordSettings: {
      botToken: "",
      guildId: "",
      reportChannelId: "",
      dmReportUsers: [],
      monitorChannelCreation: true,
      monitorChannelDeletion: true,
      monitorRoleChanges: false,
      monitorMemberJoin: true,
      monitorMemberLeave: true,
      monitorMessageDeletes: false,
      webhookUrl: "",
      alertKeywords: ["spam", "raid", "hack", "attack"],
    },
  })

  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 45,
    memoryUsage: 62,
    networkThroughput: 78,
    diskUsage: 34,
    activeConnections: 156,
    responseTime: 245,
    powerLevel: 85,
    threatLevel: 15,
  })

  const [chartData, setChartData] = useState<number[]>(Array.from({ length: 20 }, () => Math.random() * 40 + 30))
  const [memoryData, setMemoryData] = useState<number[]>(Array.from({ length: 20 }, () => Math.random() * 50 + 25))
  const [networkData, setNetworkData] = useState<number[]>(Array.from({ length: 20 }, () => Math.random() * 60 + 20))

  const [alerts] = useState<AlertItem[]>([
    {
      id: "1",
      severity: "low",
      message: "System backup completed successfully",
      timestamp: new Date(),
      resolved: true,
    },
    {
      id: "2",
      severity: "medium",
      message: "Memory usage elevated above normal threshold",
      timestamp: new Date(),
      resolved: false,
    },
    {
      id: "3",
      severity: "high",
      message: "Network latency spike detected in sector 7",
      timestamp: new Date(),
      resolved: false,
    },
    {
      id: "4",
      severity: "critical",
      message: "Unauthorized access attempt blocked",
      timestamp: new Date(),
      resolved: false,
    },
  ])

  const [systemLogs] = useState<LogEntry[]>([
    { id: "1", type: "info", message: "Core systems initialized successfully", timestamp: new Date() },
    { id: "2", type: "warning", message: "Memory usage approaching threshold", timestamp: new Date() },
    { id: "3", type: "error", message: "Network anomaly detected in subsystem", timestamp: new Date() },
    { id: "4", type: "critical", message: "Security breach attempt neutralized", timestamp: new Date() },
  ])

  const [discordEvents] = useState<DiscordEvent[]>([
    {
      id: "1",
      type: "channel_create",
      timestamp: new Date(),
      details: "New channel #general-chat created by @AdminUser",
      userId: "123456789",
      channelId: "987654321",
      guildId: "555666777",
      severity: "medium",
    },
    {
      id: "2",
      type: "member_join",
      timestamp: new Date(),
      details: "New member @NewUser joined the server",
      userId: "111222333",
      severity: "low",
    },
    {
      id: "3",
      type: "channel_delete",
      timestamp: new Date(),
      details: "Channel #old-channel deleted by @ModUser",
      userId: "444555666",
      channelId: "777888999",
      severity: "high",
    },
  ])

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("chimera-settings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        // Ensure discordSettings exists with defaults
        const settingsWithDefaults = {
          ...parsed,
          discordSettings: {
            botToken: "",
            guildId: "",
            reportChannelId: "",
            dmReportUsers: [],
            monitorChannelCreation: true,
            monitorChannelDeletion: true,
            monitorRoleChanges: false,
            monitorMemberJoin: true,
            monitorMemberLeave: true,
            monitorMessageDeletes: false,
            webhookUrl: "",
            alertKeywords: ["spam", "raid", "hack", "attack"],
            ...parsed.discordSettings,
          },
        }
        setSettings(settingsWithDefaults)
      } catch (error) {
        console.error("Failed to load settings:", error)
      }
    }
  }, [])

  const handleLogin = useCallback(() => setIsAuthenticated(true), [])

  const handleSystemReboot = useCallback(() => {
    setIsRebooting(true)
    setSystemStatus("offline")
    console.log("🔄 System reboot initiated...")

    setTimeout(() => {
      setSystemStatus("online")
      setIsRebooting(false)
      console.log("✅ System reboot completed!")
    }, 3000)
  }, [])

  const handlePowerToggle = useCallback(() => {
    if (systemStatus === "offline") {
      setSystemStatus("online")
      console.log("⚡ System powered ON")
    } else {
      setSystemStatus("offline")
      console.log("🔌 System powered OFF")
    }
  }, [systemStatus])

  const handleEmergencyStop = useCallback(() => {
    setSystemStatus("critical")
    console.log("🚨 EMERGENCY STOP ACTIVATED!")
    setTimeout(() => {
      setSystemStatus("offline")
      console.log("🛑 System shutdown complete")
    }, 2000)
  }, [])

  const handleExportData = useCallback(() => {
    try {
      const data = {
        timestamp: new Date().toISOString(),
        metrics,
        status: systemStatus,
        mode: operationMode,
        alerts: alerts.filter((a) => !a.resolved),
        settings,
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `chimera-data-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      console.log("✅ Data exported successfully!")
    } catch (error) {
      console.error("❌ Export failed:", error)
    }
  }, [metrics, systemStatus, operationMode, alerts, settings])

  const handleGenerateReport = useCallback(() => {
    console.log("📊 Generating comprehensive system report...")
    setTimeout(() => {
      console.log("✅ Report generated successfully!")
      console.log("📄 Report includes: System metrics, alerts, performance data")
    }, 2000)
  }, [])

  const handlePerformanceAnalysis = useCallback(() => {
    console.log("🔍 Starting deep performance analysis...")
    setOperationMode("analysis")
    console.log("✅ Performance analysis mode activated!")
    console.log("📈 Analyzing CPU, memory, and network patterns...")
  }, [])

  const handleSystemDiagnostics = useCallback(() => {
    console.log("🔧 Running comprehensive system diagnostics...")
    setOperationMode("maintenance")
    console.log("✅ Diagnostics mode activated!")
    console.log("🛠️ Checking all subsystems and components...")
  }, [])

  const handleSettingsToggle = useCallback(() => {
    setShowSettings(!showSettings)
    setShowMobileMenu(false)
  }, [showSettings])

  const handleSettingChange = useCallback(
    (key: string, value: any) => {
      setSettings((prev) => {
        let newSettings
        if (key === "discordSettings") {
          newSettings = {
            ...prev,
            discordSettings: {
              ...prev.discordSettings,
              ...value,
            },
          }
        } else {
          newSettings = { ...prev, [key]: value }
        }
        localStorage.setItem("chimera-settings", JSON.stringify(newSettings))
        return newSettings
      })
      console.log(`⚙️ Setting changed: ${key} = ${JSON.stringify(value)}`)
    },
    [setSettings],
  )

  const handleSaveSettings = useCallback(() => {
    localStorage.setItem("chimera-settings", JSON.stringify(settings))
    setShowSettings(false)
    console.log("✅ Settings saved successfully!")
  }, [settings, setShowSettings])

  const handleResetSettings = useCallback(() => {
    const defaultSettings = {
      theme: "dark",
      notifications: true,
      autoRefresh: true,
      refreshInterval: 1500,
      soundEffects: false,
      highContrast: false,
      language: "en",
      timezone: "UTC",
      dataRetention: 30,
      alertThreshold: 75,
      discordSettings: {
        botToken: "",
        guildId: "",
        reportChannelId: "",
        dmReportUsers: [],
        monitorChannelCreation: true,
        monitorChannelDeletion: true,
        monitorRoleChanges: false,
        monitorMemberJoin: true,
        monitorMemberLeave: true,
        monitorMessageDeletes: false,
        webhookUrl: "",
        alertKeywords: ["spam", "raid", "hack", "attack"],
      },
    }
    setSettings(defaultSettings)
    localStorage.setItem("chimera-settings", JSON.stringify(defaultSettings))
    console.log("🔄 Settings reset to defaults!")
  }, [setSettings])

  const handleSendDiscordDM = useCallback(async (userId: string, message: string) => {
    try {
      console.log(`📨 Sending DM to user ${userId}: ${message}`)
      // Simulate Discord API call
      setTimeout(() => {
        console.log("✅ Discord DM sent successfully!")
      }, 1000)
    } catch (error) {
      console.error("❌ Failed to send Discord DM:", error)
    }
  }, [])

  const handleDiscordWebhook = useCallback(
    async (event: DiscordEvent) => {
      try {
        console.log("🔗 Sending Discord webhook notification...")
        console.log("Event details:", event)

        // Send DMs to configured users with safety check
        if (settings.discordSettings?.dmReportUsers?.length > 0) {
          settings.discordSettings.dmReportUsers.forEach((userId) => {
            handleSendDiscordDM(userId, `🚨 Discord Alert: ${event.details}`)
          })
        }

        console.log("✅ Discord webhook sent successfully!")
      } catch (error) {
        console.error("❌ Discord webhook failed:", error)
      }
    },
    [settings.discordSettings?.dmReportUsers, handleSendDiscordDM, settings],
  )

  const handleTestDiscordConnection = useCallback(async () => {
    console.log("🔍 Testing Discord bot connection...")
    console.log("Bot Token:", settings.discordSettings?.botToken ? "***CONFIGURED***" : "NOT SET")
    console.log("Guild ID:", settings.discordSettings?.guildId || "NOT SET")

    setTimeout(() => {
      if (settings.discordSettings?.botToken && settings.discordSettings?.guildId) {
        console.log("✅ Discord bot connection successful!")
        console.log("🤖 Bot is online and monitoring events")
      } else {
        console.log("❌ Discord bot connection failed - Missing configuration")
      }
    }, 2000)
  }, [settings.discordSettings])

  const handleAddDMUser = useCallback(
    (userId: string) => {
      if (userId && settings.discordSettings && !settings.discordSettings.dmReportUsers.includes(userId)) {
        handleSettingChange("discordSettings", {
          ...settings.discordSettings,
          dmReportUsers: [...settings.discordSettings.dmReportUsers, userId],
        })
        console.log(`➕ Added user ${userId} to DM report list`)
      }
    },
    [settings.discordSettings, handleSettingChange, settings],
  )

  const handleRemoveDMUser = useCallback(
    (userId: string) => {
      if (settings.discordSettings) {
        handleSettingChange("discordSettings", {
          ...settings.discordSettings,
          dmReportUsers: settings.discordSettings.dmReportUsers.filter((id) => id !== userId),
        })
        console.log(`➖ Removed user ${userId} from DM report list`)
      }
    },
    [settings.discordSettings, handleSettingChange, settings],
  )

  // Update metrics with realistic simulation
  useEffect(() => {
    if (!settings.autoRefresh) return

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 8)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 6)),
        networkThroughput: Math.max(0, Math.min(100, prev.networkThroughput + (Math.random() - 0.5) * 12)),
        diskUsage: Math.max(0, Math.min(100, prev.diskUsage + (Math.random() - 0.5) * 2)),
        activeConnections: Math.max(0, prev.activeConnections + Math.floor((Math.random() - 0.5) * 30)),
        responseTime: Math.max(50, prev.responseTime + (Math.random() - 0.5) * 100),
        powerLevel: Math.max(0, Math.min(100, prev.powerLevel + (Math.random() - 0.5) * 4)),
        threatLevel: Math.max(0, Math.min(100, prev.threatLevel + (Math.random() - 0.5) * 5)),
      }))

      setChartData((prev) => [...prev.slice(1), Math.random() * 60 + 20])
      setMemoryData((prev) => [...prev.slice(1), Math.random() * 70 + 15])
      setNetworkData((prev) => [...prev.slice(1), Math.random() * 80 + 10])
    }, settings.refreshInterval)

    return () => clearInterval(interval)
  }, [settings.autoRefresh, settings.refreshInterval, setMetrics, setChartData, setMemoryData, setNetworkData])

  // Update system status based on metrics
  useEffect(() => {
    if (isRebooting) return

    const avgUsage = (metrics.cpuUsage + metrics.memoryUsage + metrics.networkThroughput) / 3
    const threat = metrics.threatLevel

    if (threat > settings.alertThreshold || avgUsage > 90) {
      setSystemStatus("critical")
    } else if (threat > settings.alertThreshold - 25 || avgUsage > 75) {
      setSystemStatus("warning")
    } else if (avgUsage > 20) {
      setSystemStatus("online")
    }
  }, [metrics, isRebooting, settings.alertThreshold])

  if (!isAuthenticated) {
    return <LoginInterface onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-bg w-full h-full" />
      </div>

      {/* Header */}
      <header className="bg-black/80 border-b border-gold/30 px-4 md:px-6 py-3 md:py-4 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gold to-red rounded-lg flex items-center justify-center shadow-lg shadow-gold/30">
              <Shield className="w-4 h-4 md:w-6 md:h-6 text-black" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gradient-gold glow-gold">CHIMERA SYSTEM</h1>
              <p className="text-xs md:text-sm text-gold/70 hidden sm:block">Enterprise AI Control Platform</p>
            </div>
          </div>

          {/* Desktop Header Actions */}
          <div className="hidden md:flex items-center gap-4">
            <StatusBadge status={systemStatus} />
            <Button
              variant="outline"
              size="sm"
              className="border-gold/50 text-gold hover:bg-gold/10 bg-transparent"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gold/50 text-gold hover:bg-gold/10 bg-transparent"
              onClick={handleSettingsToggle}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Mobile Header Actions */}
          <div className="flex md:hidden items-center gap-2">
            <StatusBadge status={systemStatus} />
            <Button
              variant="outline"
              size="sm"
              className="border-gold/50 text-gold hover:bg-gold/10 bg-transparent p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-gold/20 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start border-gold/50 text-gold hover:bg-gold/10 bg-transparent"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gold/50 text-gold hover:bg-gold/10 bg-transparent"
              onClick={handleSettingsToggle}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        )}
      </header>

      <div className="p-3 md:p-6 relative z-10">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="space-y-4">
            {/* Mobile System Control */}
            <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-gold glow-gold flex items-center gap-2">
                  <Power className="w-4 h-4" />
                  SYSTEM CONTROL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    className="w-full bg-gradient-to-r from-gold to-red hover:from-gold/90 hover:to-red/90 text-black font-bold py-3 transition-all duration-300"
                    onClick={handlePowerToggle}
                    disabled={isRebooting}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {systemStatus === "offline" ? "POWER ON" : "POWER OFF"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-pink-500/50 text-pink-300 hover:bg-pink-500/10 font-bold py-3 bg-transparent"
                    onClick={handleSystemReboot}
                    disabled={isRebooting}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRebooting ? "animate-spin" : ""}`} />
                    {isRebooting ? "REBOOTING..." : "SYSTEM REBOOT"}
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700 font-bold py-3"
                    onClick={handleEmergencyStop}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    EMERGENCY STOP
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mobile 3D Visualization */}
            <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10 h-64">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-gold glow-gold flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  CORE VISUALIZATION
                </CardTitle>
              </CardHeader>
              <CardContent className="h-48 relative">
                <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                  <SystemVisualization status={systemStatus} metrics={metrics} />
                </Canvas>

                {/* Mobile Indicators */}
                <div className="absolute top-2 right-2">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gold glow-gold">{metrics.powerLevel.toFixed(0)}%</div>
                    <div className="text-xs text-gold/70">POWER</div>
                  </div>
                </div>

                <div className="absolute bottom-2 left-2">
                  <div className="text-left">
                    <div
                      className={`text-lg font-bold ${
                        metrics.threatLevel > 75
                          ? "text-red-400 glow-red"
                          : metrics.threatLevel > 50
                            ? "text-pink glow-pink"
                            : "text-gold glow-gold"
                      }`}
                    >
                      {metrics.threatLevel.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gold/70">THREAT</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Metrics */}
            <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-gold glow-gold flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  SYSTEM METRICS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-gradient-to-br from-gold/10 to-red/10 rounded-lg border border-gold/20">
                    <div className="text-lg font-bold text-gold glow-gold">{metrics.activeConnections}</div>
                    <div className="text-xs text-gold/70">CONNECTIONS</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-br from-pink/10 to-red/10 rounded-lg border border-pink/20">
                    <div className="text-lg font-bold text-pink glow-pink">{metrics.responseTime}ms</div>
                    <div className="text-xs text-pink/70">RESPONSE</div>
                  </div>
                </div>

                {[
                  { icon: Cpu, label: "CPU Usage", value: metrics.cpuUsage, color: "gold" },
                  { icon: HardDrive, label: "Memory", value: metrics.memoryUsage, color: "red" },
                  { icon: Database, label: "Disk Usage", value: metrics.diskUsage, color: "pink" },
                  { icon: Wifi, label: "Network", value: metrics.networkThroughput, color: "gold" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3 h-3 text-gold" />
                        <span className="text-gold/90 font-medium text-xs">{label}</span>
                      </div>
                      <span className={`font-bold text-${color} glow-${color} text-sm`}>{value.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2 border border-gold/20">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          value > 80
                            ? "bg-gradient-to-r from-red-500 to-pink-500 glow-red"
                            : value > 60
                              ? "bg-gradient-to-r from-gold to-red glow-gold"
                              : "bg-gradient-to-r from-gold to-gold/70 glow-gold"
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile Charts */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                <CardContent className="p-3">
                  <MetricsChart data={chartData} title="CPU PERFORMANCE" color="#ffd700" />
                </CardContent>
              </Card>
              <Card className="bg-black/80 border-red/30 shadow-xl shadow-red/10">
                <CardContent className="p-3">
                  <MetricsChart data={memoryData} title="MEMORY USAGE" color="#ff6b35" />
                </CardContent>
              </Card>
              <Card className="bg-black/80 border-pink/30 shadow-xl shadow-pink/10">
                <CardContent className="p-3">
                  <MetricsChart data={networkData} title="NETWORK FLOW" color="#ff1493" />
                </CardContent>
              </Card>
            </div>

            {/* Mobile Operation Mode */}
            <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-gold glow-gold flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  OPERATION MODE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(["monitoring", "analysis", "maintenance"] as OperationMode[]).map((mode) => {
                    const icons = { monitoring: Eye, analysis: BarChart3, maintenance: Settings }
                    const Icon = icons[mode]
                    return (
                      <button
                        key={mode}
                        onClick={() => setOperationMode(mode)}
                        className={`w-full p-3 text-left rounded-lg border transition-all duration-300 ${
                          operationMode === mode
                            ? "border-gold bg-gradient-to-r from-gold/20 to-red/20 text-gold shadow-lg shadow-gold/20"
                            : "border-gold/30 bg-black/50 text-gold/70 hover:border-gold/50 hover:bg-gold/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span className="font-bold uppercase text-sm">{mode}</span>
                          </div>
                          {operationMode === mode && (
                            <div className="w-2 h-2 bg-gold rounded-full animate-pulse glow-gold" />
                          )}
                        </div>
                        <div className="text-xs text-gold/60 mt-1">
                          {mode === "monitoring" && "Real-time system surveillance"}
                          {mode === "analysis" && "Deep performance analysis"}
                          {mode === "maintenance" && "System maintenance protocols"}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Mobile Quick Actions */}
            <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-gold glow-gold">QUICK ACTIONS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start bg-gradient-to-r from-gold to-red hover:from-gold/90 hover:to-red/90 text-black font-bold"
                  onClick={handleGenerateReport}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-pink/50 text-pink hover:bg-pink/10"
                  onClick={handlePerformanceAnalysis}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Analysis
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-gold/50 text-gold hover:bg-gold/10"
                  onClick={handleSystemDiagnostics}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  System Diagnostics
                </Button>
              </CardContent>
            </Card>

            {/* Mobile Alerts */}
            <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-gold glow-gold">SYSTEM ALERTS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {alerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-2 rounded-lg border-l-4 transition-all duration-300 ${
                        alert.severity === "critical"
                          ? "border-red-500 bg-red-900/20 shadow-lg shadow-red-500/20"
                          : alert.severity === "high"
                            ? "border-pink bg-pink-900/20 shadow-lg shadow-pink/20"
                            : alert.severity === "medium"
                              ? "border-gold bg-gold-900/20 shadow-lg shadow-gold/20"
                              : "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {alert.resolved ? (
                              <CheckCircle className="w-3 h-3 text-green-400" />
                            ) : (
                              <AlertTriangle
                                className={`w-3 h-3 ${
                                  alert.severity === "critical"
                                    ? "text-red-400"
                                    : alert.severity === "high"
                                      ? "text-pink"
                                      : alert.severity === "medium"
                                        ? "text-gold"
                                        : "text-blue-400"
                                }`}
                              />
                            )}
                            <span className="text-xs font-bold text-gold uppercase tracking-wide">
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-xs text-white/90 mb-1 font-medium">{alert.message}</p>
                          <div className="flex items-center gap-1 text-xs text-gold/70">
                            <Clock className="w-2 h-2" />
                            {alert.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobile Discord Events */}
            <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-gold glow-gold flex items-center gap-2">
                  🤖 DISCORD EVENTS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {discordEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded-lg border-l-4 transition-all duration-300 ${
                        event.severity === "high"
                          ? "border-red-500 bg-red-900/20 shadow-lg shadow-red-500/20"
                          : event.severity === "medium"
                            ? "border-gold bg-gold-900/20 shadow-lg shadow-gold/20"
                            : "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gold uppercase tracking-wide">
                              {event.type.replace("_", " ")}
                            </span>
                          </div>
                          <p className="text-xs text-white/90 mb-1 font-medium">{event.details}</p>
                          <div className="flex items-center gap-1 text-xs text-gold/70">
                            <Clock className="w-2 h-2" />
                            {event.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="grid grid-cols-12 gap-6">
            {/* Left Control Panel */}
            <div className="col-span-3 space-y-6">
              {/* System Control */}
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold glow-gold flex items-center gap-2">
                    <Power className="w-5 h-5" />
                    SYSTEM CONTROL
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-gold to-red hover:from-gold/90 hover:to-red/90 text-black font-bold py-3 transition-all duration-300 hover:scale-105"
                    onClick={handlePowerToggle}
                    disabled={isRebooting}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {systemStatus === "offline" ? "POWER ON" : "POWER OFF"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-pink-500/50 text-pink-300 hover:bg-pink-500/10 font-bold py-3 bg-transparent"
                    onClick={handleSystemReboot}
                    disabled={isRebooting}
                  >
                    <RefreshCw className={`w-5 h-5 mr-2 ${isRebooting ? "animate-spin" : ""}`} />
                    {isRebooting ? "REBOOTING..." : "SYSTEM REBOOT"}
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700 font-bold py-3"
                    onClick={handleEmergencyStop}
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    EMERGENCY STOP
                  </Button>
                </CardContent>
              </Card>

              {/* Operation Mode */}
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold glow-gold flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    OPERATION MODE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(["monitoring", "analysis", "maintenance"] as OperationMode[]).map((mode) => {
                      const icons = { monitoring: Eye, analysis: BarChart3, maintenance: Settings }
                      const Icon = icons[mode]
                      return (
                        <button
                          key={mode}
                          onClick={() => setOperationMode(mode)}
                          className={`w-full p-4 text-left rounded-lg border transition-all duration-300 hover:scale-105 ${
                            operationMode === mode
                              ? "border-gold bg-gradient-to-r from-gold/20 to-red/20 text-gold shadow-lg shadow-gold/20"
                              : "border-gold/30 bg-black/50 text-gold/70 hover:border-gold/50 hover:bg-gold/5"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5" />
                              <span className="font-bold uppercase">{mode}</span>
                            </div>
                            {operationMode === mode && (
                              <div className="w-3 h-3 bg-gold rounded-full animate-pulse glow-gold" />
                            )}
                          </div>
                          <div className="text-xs text-gold/60 mt-2">
                            {mode === "monitoring" && "Real-time system surveillance"}
                            {mode === "analysis" && "Deep performance analysis"}
                            {mode === "maintenance" && "System maintenance protocols"}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* System Metrics */}
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold glow-gold flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    SYSTEM METRICS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gradient-to-br from-gold/10 to-red/10 rounded-lg border border-gold/20">
                      <div className="text-2xl font-bold text-gold glow-gold">{metrics.activeConnections}</div>
                      <div className="text-xs text-gold/70">CONNECTIONS</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-pink/10 to-red/10 rounded-lg border border-pink/20">
                      <div className="text-2xl font-bold text-pink glow-pink">{metrics.responseTime}ms</div>
                      <div className="text-xs text-pink/70">RESPONSE</div>
                    </div>
                  </div>

                  {[
                    { icon: Cpu, label: "CPU Usage", value: metrics.cpuUsage, color: "gold" },
                    { icon: HardDrive, label: "Memory", value: metrics.memoryUsage, color: "red" },
                    { icon: Database, label: "Disk Usage", value: metrics.diskUsage, color: "pink" },
                    { icon: Wifi, label: "Network", value: metrics.networkThroughput, color: "gold" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gold" />
                          <span className="text-gold/90 font-medium">{label}</span>
                        </div>
                        <span className={`font-bold text-${color} glow-${color}`}>{value.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-2 border border-gold/20">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            value > 80
                              ? "bg-gradient-to-r from-red-500 to-pink-500 glow-red"
                              : value > 60
                                ? "bg-gradient-to-r from-gold to-red glow-gold"
                                : "bg-gradient-to-r from-gold to-gold/70 glow-gold"
                          }`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Center - 3D Visualization */}
            <div className="col-span-6">
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10 h-96">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold glow-gold flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    CORE VISUALIZATION
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 relative">
                  <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                    <SystemVisualization status={systemStatus} metrics={metrics} />
                  </Canvas>

                  {/* Power Level Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gold glow-gold">{metrics.powerLevel.toFixed(0)}%</div>
                      <div className="text-sm text-gold/70">POWER LEVEL</div>
                    </div>
                  </div>

                  {/* Threat Level Indicator */}
                  <div className="absolute bottom-4 left-4">
                    <div className="text-left">
                      <div
                        className={`text-2xl font-bold ${
                          metrics.threatLevel > 75
                            ? "text-red-400 glow-red"
                            : metrics.threatLevel > 50
                              ? "text-pink glow-pink"
                              : "text-gold glow-gold"
                        }`}
                      >
                        {metrics.threatLevel.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gold/70">THREAT LEVEL</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Charts */}
              <div className="grid grid-cols-3 gap-6 mt-6">
                <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                  <CardContent className="p-4">
                    <MetricsChart data={chartData} title="CPU PERFORMANCE" color="#ffd700" />
                  </CardContent>
                </Card>
                <Card className="bg-black/80 border-red/30 shadow-xl shadow-red/10">
                  <CardContent className="p-4">
                    <MetricsChart data={memoryData} title="MEMORY USAGE" color="#ff6b35" />
                  </CardContent>
                </Card>
                <Card className="bg-black/80 border-pink/30 shadow-xl shadow-pink/10">
                  <CardContent className="p-4">
                    <MetricsChart data={networkData} title="NETWORK FLOW" color="#ff1493" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Panel - Analytics & Alerts */}
            <div className="col-span-3 space-y-6">
              {/* Quick Actions */}
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold glow-gold">QUICK ACTIONS</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-gold to-red hover:from-gold/90 hover:to-red/90 text-black font-bold"
                    onClick={handleGenerateReport}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-pink/50 text-pink hover:bg-pink/10"
                    onClick={handlePerformanceAnalysis}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Performance Analysis
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-gold/50 text-gold hover:bg-gold/10"
                    onClick={handleSystemDiagnostics}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    System Diagnostics
                  </Button>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold glow-gold">SYSTEM ALERTS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-lg border-l-4 transition-all duration-300 hover:scale-105 ${
                          alert.severity === "critical"
                            ? "border-red-500 bg-red-900/20 shadow-lg shadow-red-500/20"
                            : alert.severity === "high"
                              ? "border-pink bg-pink-900/20 shadow-lg shadow-pink/20"
                              : alert.severity === "medium"
                                ? "border-gold bg-gold-900/20 shadow-lg shadow-gold/20"
                                : "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {alert.resolved ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <AlertTriangle
                                  className={`w-4 h-4 ${
                                    alert.severity === "critical"
                                      ? "text-red-400"
                                      : alert.severity === "high"
                                        ? "text-pink"
                                        : alert.severity === "medium"
                                          ? "text-gold"
                                          : "text-blue-400"
                                  }`}
                                />
                              )}
                              <span className="text-xs font-bold text-gold uppercase tracking-wide">
                                {alert.severity}
                              </span>
                            </div>
                            <p className="text-sm text-white/90 mb-2 font-medium">{alert.message}</p>
                            <div className="flex items-center gap-1 text-xs text-gold/70">
                              <Clock className="w-3 h-3" />
                              {alert.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold glow-gold">SYSTEM HEALTH</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gold/80">Overall Health</span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            systemStatus === "critical"
                              ? "bg-red-500 animate-pulse"
                              : systemStatus === "warning"
                                ? "bg-gold animate-pulse"
                                : systemStatus === "online"
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                          }`}
                        ></div>
                        <span className="text-sm font-bold text-gold">
                          {systemStatus === "critical"
                            ? "CRITICAL"
                            : systemStatus === "warning"
                              ? "WARNING"
                              : systemStatus === "online"
                                ? "EXCELLENT"
                                : "OFFLINE"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gold/80">System Uptime</span>
                      <span className="text-sm font-bold text-gold">99.7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gold/80">Last Backup</span>
                      <span className="text-sm font-bold text-gold">1.2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gold/80">Security Status</span>
                      <span className="text-sm font-bold text-green-400">SECURE</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Discord Events */}
              <Card className="bg-black/80 border-gold/30 shadow-xl shadow-gold/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gold glow-gold flex items-center gap-2">
                    🤖 DISCORD EVENTS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {discordEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg border-l-4 transition-all duration-300 hover:scale-105 ${
                          event.severity === "high"
                            ? "border-red-500 bg-red-900/20 shadow-lg shadow-red-500/20"
                            : event.severity === "medium"
                              ? "border-gold bg-gold-900/20 shadow-lg shadow-gold/20"
                              : "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-gold uppercase tracking-wide">
                                {event.type.replace("_", " ")}
                              </span>
                              {event.userId && <span className="text-xs text-gold/60">ID: {event.userId}</span>}
                            </div>
                            <p className="text-sm text-white/90 mb-2 font-medium">{event.details}</p>
                            <div className="flex items-center gap-1 text-xs text-gold/70">
                              <Clock className="w-3 h-3" />
                              {event.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card
            className={`bg-black/95 border-gold/30 shadow-2xl shadow-gold/20 w-full ${isMobile ? "max-w-sm max-h-[90vh]" : "max-w-4xl max-h-[90vh]"} overflow-y-auto`}
          >
            <CardHeader className="border-b border-gold/20">
              <div className="flex items-center justify-between">
                <CardTitle
                  className={`${isMobile ? "text-lg" : "text-2xl"} text-gold glow-gold flex items-center gap-3`}
                >
                  <Settings className="w-5 h-5 md:w-6 md:h-6" />
                  SYSTEM SETTINGS
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red/50 text-red hover:bg-red/10 bg-transparent"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="w-4 h-4" />
                  {!isMobile && " Close"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className={`${isMobile ? "space-y-6" : "grid grid-cols-2 gap-8"}`}>
                {/* General Settings */}
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-base md:text-lg font-bold text-gold border-b border-gold/20 pb-2">GENERAL</h3>

                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Theme</label>
                      <select
                        value={settings.theme}
                        onChange={(e) => handleSettingChange("theme", e.target.value)}
                        className="bg-black/60 border border-gold/30 text-white rounded px-2 md:px-3 py-1 focus:border-gold text-sm"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange("language", e.target.value)}
                        className="bg-black/60 border border-gold/30 text-white rounded px-2 md:px-3 py-1 focus:border-gold text-sm"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange("timezone", e.target.value)}
                        className="bg-black/60 border border-gold/30 text-white rounded px-2 md:px-3 py-1 focus:border-gold text-sm"
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">EST</option>
                        <option value="PST">PST</option>
                        <option value="GMT">GMT</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-gold/90 font-medium text-sm md:text-base">High Contrast</label>
                      <button
                        onClick={() => handleSettingChange("highContrast", !settings.highContrast)}
                        className={`w-10 h-5 md:w-12 md:h-6 rounded-full transition-all duration-300 ${
                          settings.highContrast ? "bg-gold shadow-lg shadow-gold/30" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-transform duration-300 ${
                            settings.highContrast ? "translate-x-5 md:translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-gold border-b border-gold/20 pb-2 mt-6 md:mt-8">
                    NOTIFICATIONS
                  </h3>

                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Enable Notifications</label>
                      <button
                        onClick={() => handleSettingChange("notifications", !settings.notifications)}
                        className={`w-10 h-5 md:w-12 md:h-6 rounded-full transition-all duration-300 ${
                          settings.notifications ? "bg-gold shadow-lg shadow-gold/30" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-transform duration-300 ${
                            settings.notifications ? "translate-x-5 md:translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Sound Effects</label>
                      <button
                        onClick={() => handleSettingChange("soundEffects", !settings.soundEffects)}
                        className={`w-10 h-5 md:w-12 md:h-6 rounded-full transition-all duration-300 ${
                          settings.soundEffects ? "bg-gold shadow-lg shadow-gold/30" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-transform duration-300 ${
                            settings.soundEffects ? "translate-x-5 md:translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Alert Threshold (%)</label>
                      <div className="flex items-center gap-3 md:gap-4">
                        <input
                          type="range"
                          min="50"
                          max="95"
                          value={settings.alertThreshold}
                          onChange={(e) => handleSettingChange("alertThreshold", Number.parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-gold"
                        />
                        <span className="text-gold font-bold w-10 md:w-12 text-sm md:text-base">
                          {settings.alertThreshold}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Settings */}
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-base md:text-lg font-bold text-gold border-b border-gold/20 pb-2">PERFORMANCE</h3>

                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Auto Refresh</label>
                      <button
                        onClick={() => handleSettingChange("autoRefresh", !settings.autoRefresh)}
                        className={`w-10 h-5 md:w-12 md:h-6 rounded-full transition-all duration-300 ${
                          settings.autoRefresh ? "bg-gold shadow-lg shadow-gold/30" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-transform duration-300 ${
                            settings.autoRefresh ? "translate-x-5 md:translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Refresh Interval (ms)</label>
                      <div className="flex items-center gap-3 md:gap-4">
                        <input
                          type="range"
                          min="500"
                          max="5000"
                          step="100"
                          value={settings.refreshInterval}
                          onChange={(e) => handleSettingChange("refreshInterval", Number.parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-gold"
                          disabled={!settings.autoRefresh}
                        />
                        <span className="text-gold font-bold w-12 md:w-16 text-sm md:text-base">
                          {settings.refreshInterval}ms
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Data Retention (days)</label>
                      <div className="flex items-center gap-3 md:gap-4">
                        <input
                          type="range"
                          min="7"
                          max="90"
                          value={settings.dataRetention}
                          onChange={(e) => handleSettingChange("dataRetention", Number.parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-gold"
                        />
                        <span className="text-gold font-bold w-10 md:w-12 text-sm md:text-base">
                          {settings.dataRetention}d
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-gold border-b border-gold/20 pb-2 mt-6 md:mt-8">
                    SYSTEM INFO
                  </h3>

                  <div className="space-y-2 md:space-y-3 bg-black/40 p-3 md:p-4 rounded-lg border border-gold/20">
                    <div className="flex justify-between">
                      <span className="text-gold/70 text-sm">Version:</span>
                      <span className="text-gold font-mono text-sm">v3.2.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gold/70 text-sm">Build:</span>
                      <span className="text-gold font-mono text-sm">2024.01.15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gold/70 text-sm">License:</span>
                      <span className="text-gold font-mono text-sm">Enterprise</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gold/70 text-sm">Uptime:</span>
                      <span className="text-gold font-mono text-sm">72h 14m</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-gold to-red hover:from-gold/90 hover:to-red/90 text-black font-bold"
                      onClick={handleSaveSettings}
                    >
                      💾 Save Settings
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-pink/50 text-pink hover:bg-pink/10 bg-transparent"
                      onClick={handleResetSettings}
                    >
                      🔄 Reset to Defaults
                    </Button>
                  </div>
                </div>

                {/* Discord Bot Settings */}
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-base md:text-lg font-bold text-gold border-b border-gold/20 pb-2">DISCORD BOT</h3>

                  <div className="space-y-3 md:space-y-4">
                    <div className="space-y-2">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Bot Token</label>
                      <Input
                        type="password"
                        value={settings.discordSettings.botToken}
                        onChange={(e) =>
                          handleSettingChange("discordSettings", {
                            ...settings.discordSettings,
                            botToken: e.target.value,
                          })
                        }
                        className="bg-black/60 border-gold/30 text-white focus:border-gold"
                        placeholder="Enter Discord bot token"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Guild ID</label>
                      <Input
                        type="text"
                        value={settings.discordSettings.guildId}
                        onChange={(e) =>
                          handleSettingChange("discordSettings", {
                            ...settings.discordSettings,
                            guildId: e.target.value,
                          })
                        }
                        className="bg-black/60 border-gold/30 text-white focus:border-gold"
                        placeholder="Enter Discord server ID"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gold/90 font-medium text-sm md:text-base">Report Channel ID</label>
                      <Input
                        type="text"
                        value={settings.discordSettings.reportChannelId}
                        onChange={(e) =>
                          handleSettingChange("discordSettings", {
                            ...settings.discordSettings,
                            reportChannelId: e.target.value,
                          })
                        }
                        className="bg-black/60 border-gold/30 text-white focus:border-gold"
                        placeholder="Channel ID for reports"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gold/90 font-medium text-sm md:text-base">DM Report Users</label>
                      <div className="space-y-2">
                        {settings.discordSettings.dmReportUsers.map((userId, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              type="text"
                              value={userId}
                              readOnly
                              className="bg-black/60 border-gold/30 text-white flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red/50 text-red hover:bg-red/10 bg-transparent"
                              onClick={() => handleRemoveDMUser(userId)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            placeholder="Enter user ID to add"
                            className="bg-black/60 border-gold/30 text-white flex-1"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleAddDMUser((e.target as HTMLInputElement).value)
                                ;(e.target as HTMLInputElement).value = ""
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gold/50 text-gold hover:bg-gold/10 bg-transparent"
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement
                              if (input.value) {
                                handleAddDMUser(input.value)
                                input.value = ""
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-gold to-red hover:from-gold/90 hover:to-red/90 text-black font-bold"
                      onClick={handleTestDiscordConnection}
                    >
                      🔍 Test Discord Connection
                    </Button>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-gold border-b border-gold/20 pb-2 mt-6 md:mt-8">
                    MONITORING OPTIONS
                  </h3>

                  <div className="space-y-3 md:space-y-4">
                    {[
                      { key: "monitorChannelCreation", label: "Channel Creation", icon: "🆕" },
                      { key: "monitorChannelDeletion", label: "Channel Deletion", icon: "🗑️" },
                      { key: "monitorMemberJoin", label: "Member Join", icon: "👋" },
                      { key: "monitorMemberLeave", label: "Member Leave", icon: "👋" },
                      { key: "monitorRoleChanges", label: "Role Changes", icon: "🎭" },
                      { key: "monitorMessageDeletes", label: "Message Deletes", icon: "💬" },
                    ].map(({ key, label, icon }) => (
                      <div key={key} className="flex items-center justify-between">
                        <label className="text-gold/90 font-medium text-sm md:text-base flex items-center gap-2">
                          <span>{icon}</span>
                          {label}
                        </label>
                        <button
                          onClick={() =>
                            handleSettingChange("discordSettings", {
                              ...settings.discordSettings,
                              [key]: !settings.discordSettings[key as keyof typeof settings.discordSettings],
                            })
                          }
                          className={`w-10 h-5 md:w-12 md:h-6 rounded-full transition-all duration-300 ${
                            settings.discordSettings[key as keyof typeof settings.discordSettings]
                              ? "bg-gold shadow-lg shadow-gold/30"
                              : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-transform duration-300 ${
                              settings.discordSettings[key as keyof typeof settings.discordSettings]
                                ? "translate-x-5 md:translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-gold/90 font-medium text-sm md:text-base">Alert Keywords</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {settings.discordSettings.alertKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-gold/20 text-gold px-2 py-1 rounded-lg text-xs flex items-center gap-1"
                        >
                          {keyword}
                          <button
                            onClick={() =>
                              handleSettingChange("discordSettings", {
                                ...settings.discordSettings,
                                alertKeywords: settings.discordSettings.alertKeywords.filter((_, i) => i !== index),
                              })
                            }
                            className="text-red hover:text-red-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <Input
                      type="text"
                      placeholder="Add keyword and press Enter"
                      className="bg-black/60 border-gold/30 text-white"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const value = (e.target as HTMLInputElement).value.trim()
                          if (value && !settings.discordSettings.alertKeywords.includes(value)) {
                            handleSettingChange("discordSettings", {
                              ...settings.discordSettings,
                              alertKeywords: [...settings.discordSettings.alertKeywords, value],
                            })
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .slider-gold::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ffd700, #ff6b35);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
        }

        @media (min-width: 768px) {
          .slider-gold::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
        }

        .slider-gold::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ffd700, #ff6b35);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
        }

        @media (min-width: 768px) {
          .slider-gold::-moz-range-thumb {
            width: 20px;
            height: 20px;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
        }
      `}</style>

      {/* Status Ticker - Hidden on mobile */}
      {!isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/90 border-t border-gold/30 overflow-hidden">
          <div className="flex items-center h-full whitespace-nowrap animate-scroll">
            {systemLogs.map((log) => (
              <span
                key={log.id}
                className={`mx-8 font-mono text-sm ${
                  log.type === "critical"
                    ? "text-red-300 animate-pulse glow-red"
                    : log.type === "error"
                      ? "text-pink glow-pink"
                      : log.type === "warning"
                        ? "text-gold glow-gold"
                        : "text-gold/70"
                }`}
              >
                [{log.timestamp.toLocaleTimeString()}] {log.message}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
