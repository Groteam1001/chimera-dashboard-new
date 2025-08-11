// API client for communicating with the Chimera Bot Backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface BotStatus {
  status: 'offline' | 'online' | 'paused';
  last_updated: string;
  monitoring_channels: string[];
  ai_features: {
    sentiment_analysis: boolean;
    anomaly_detection: boolean;
    auto_reports: boolean;
  };
}

export interface ChannelEvent {
  id: number;
  channel_id: string;
  channel_name: string;
  category: string;
  event_type: string;
  created_at: string;
  ai_analysis: any;
}

export interface MessageEvent {
  id: number;
  message_id: string;
  channel_id: string;
  channel_name: string;
  author: string;
  content: string;
  timestamp: string;
  ai_analysis: any;
}

export interface Alert {
  id: number;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  source_type?: string;
  source_id?: string;
  created_at: string;
  resolved: boolean;
  resolved_at?: string;
}

export interface AIReport {
  generated_at: string;
  timeframe: string;
  summary: string;
  statistics: any;
  insights: string[];
  recommendations: string[];
  risk_level: string;
}

class ChimeraAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Bot Control APIs
  async getBotStatus(): Promise<{ success: boolean; data: BotStatus }> {
    return this.request('/bot/status');
  }

  async controlBot(action: 'start' | 'pause' | 'stop'): Promise<{ success: boolean; message: string; data: BotStatus }> {
    return this.request('/bot/control', {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  }

  async getMonitoringChannels(): Promise<{ success: boolean; data: string[] }> {
    return this.request('/bot/monitoring/channels');
  }

  async updateMonitoringChannels(channels: string[]): Promise<{ success: boolean; message: string; data: string[] }> {
    return this.request('/bot/monitoring/channels', {
      method: 'POST',
      body: JSON.stringify({ channels }),
    });
  }

  async getAISettings(): Promise<{ success: boolean; data: any }> {
    return this.request('/bot/ai/settings');
  }

  async updateAISettings(ai_features: any): Promise<{ success: boolean; message: string; data: any }> {
    return this.request('/bot/ai/settings', {
      method: 'POST',
      body: JSON.stringify({ ai_features }),
    });
  }

  async getMonitoringData(): Promise<{ success: boolean; data: any }> {
    return this.request('/bot/monitoring/data');
  }

  async checkHealth(): Promise<{ success: boolean; status: string; timestamp: string; bot_status: string }> {
    return this.request('/bot/health');
  }

  // AI Service APIs
  async analyzeText(text: string): Promise<{ success: boolean; data: any }> {
    return this.request('/ai/analyze-text', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  async detectAnomalies(metrics: any): Promise<{ success: boolean; data: any }> {
    return this.request('/ai/anomaly-detection', {
      method: 'POST',
      body: JSON.stringify({ metrics }),
    });
  }

  async generateAIReport(monitoring_data: any, timeframe: string = '24h'): Promise<{ success: boolean; data: AIReport }> {
    return this.request('/ai/generate-report', {
      method: 'POST',
      body: JSON.stringify({ monitoring_data, timeframe }),
    });
  }

  async generateSmartAlerts(recent_activity: any[]): Promise<{ success: boolean; data: any }> {
    return this.request('/ai/smart-alerts', {
      method: 'POST',
      body: JSON.stringify({ recent_activity }),
    });
  }

  // Legacy sentiment analysis (for backward compatibility)
  async analyzeSentiment(text: string): Promise<{ success: boolean; data: any }> {
    return this.request('/bot/ai/analyze-sentiment', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  async generateReport(timeframe: string = '24h'): Promise<{ success: boolean; data: any }> {
    return this.request('/bot/ai/generate-report', {
      method: 'POST',
      body: JSON.stringify({ timeframe }),
    });
  }
}

// Create and export a singleton instance
export const chimeraAPI = new ChimeraAPI();

// Export the class for custom instances
export default ChimeraAPI;

