import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface GovernmentStructure {
  country: string;
  displayName: string;
  governmentType: string;
  legislativeBodies: string[];
  currentLeaders: {
    head_of_state: string;
    head_of_government: string;
    legislature_leader: string;
  };
  recentActivity: string[];
  corruptionRisk: number;
  politicalContext: string;
  upcomingElections: string;
  keyIssues: string[];
  activeBills: Bill[];
  alerts: Alert[];
  corruptionPatterns: CorruptionPattern[];
  regionalData: RegionalData[];
}

export interface Bill {
  id: string;
  title: string;
  status: 'suspicious' | 'monitoring' | 'clear';
  stage: string;
  riskScore: number;
  issues: string[];
  description: string;
  dateIntroduced: string;
  sponsor: string;
  summary: string;
  redFlags: string[];
  publicSupport: number;
  lobbyingSpending: number;
}

export interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  confidence: number;
  source: string;
  actionRequired: boolean;
  relatedBills: string[];
}

export interface CorruptionPattern {
  type: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  instances: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  examples: string[];
}

export interface RegionalData {
  name: string;
  risk: number;
  alerts: number;
  trend: 'up' | 'down' | 'stable';
  population: string;
  keyIssues: string[];
}

export interface LocationSearchResult {
  name: string;
  country: string;
  region?: string;
  flag: string;
  governmentLevel: 'national' | 'state' | 'local';
  confidence: number;
}

export class OpenAIService {
  async searchLocations(query: string): Promise<LocationSearchResult[]> {
    if (!query || query.length < 2) return [];

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a location search assistant. Given a search query, return relevant locations (countries, states, cities) that have democratic governments worth monitoring.

Return results as a JSON array with this exact structure:
[
  {
    "name": "Location Name",
    "country": "Country Name", 
    "region": "State/Province (if applicable)",
    "flag": "🇺🇸",
    "governmentLevel": "national|state|local",
    "confidence": 0.95
  }
]

Prioritize:
1. Countries with active democracies
2. Major states/provinces with significant legislative activity
3. Major cities with important local governments
4. Locations currently in political news

Always include the flag emoji. Confidence should be 0-1 based on relevance to query.`
          },
          {
            role: "user",
            content: `Search for locations matching: "${query}"`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) return [];

      try {
        const results = JSON.parse(content);
        return Array.isArray(results) ? results.slice(0, 8) : [];
      } catch (parseError) {
        console.error('Failed to parse OpenAI response:', parseError);
        return [];
      }
    } catch (error) {
      console.error('OpenAI search error:', error);
      return [];
    }
  }

  async analyzeGovernment(location: string): Promise<GovernmentStructure> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert government analyst and corruption investigator. Conduct a COMPREHENSIVE analysis of the specified government, including deep research into current legislation, political patterns, and corruption risks.

THINK STEP BY STEP and provide detailed, realistic analysis:

1. Research the current government structure thoroughly
2. Identify specific recent bills and legislation (with real-sounding names and details)
3. Analyze corruption patterns and political controversies
4. Generate realistic alerts based on actual political dynamics
5. Assess regional variations and local government issues
6. Provide specific, actionable intelligence

  "legislativeBodies": ["Body 1", "Body 2"],
  "currentLeaders": {
    "head_of_state": "Specific name and title",
    "head_of_government": "Specific name and title", 
    "legislature_leader": "Specific name and title"
  },
  "recentActivity": ["Specific recent bill 1", "Specific recent bill 2", "Specific recent bill 3"],
  "corruptionRisk": 65,
  "politicalContext": "Detailed current political situation with specific issues",
  "upcomingElections": "Specific election information with dates",
  "keyIssues": ["Specific Issue 1", "Specific Issue 2", "Specific Issue 3"],
  "activeBills": [
    {
      "id": "HR-2024-001",
      "title": "Specific Bill Title",
      "status": "suspicious|monitoring|clear",
      "stage": "Committee Review|Floor Vote|Signed",
      "riskScore": 85,
      "issues": ["Midnight introduction", "Corporate benefits"],
      "description": "Detailed description of what the bill does",
      "dateIntroduced": "2024-01-15",
      "sponsor": "Specific politician name",
      "summary": "Brief summary of bill contents",
      "redFlags": ["Specific red flag 1", "Specific red flag 2"],
      "publicSupport": 23,
      "lobbyingSpending": 2400000
    }
  ],
  "alerts": [
    {
      "id": 1,
      "type": "critical|warning|info",
      "title": "Specific Alert Title",
      "description": "Detailed description of the concern",
      "time": "2 hours ago",
      "confidence": 89,
      "source": "Legislative tracking|News analysis|Pattern detection",
      "actionRequired": true,
      "relatedBills": ["HR-2024-001"]
    }
  ],
  "corruptionPatterns": [
    {
      "type": "Midnight Legislation",
      "description": "Detailed pattern description",
      "severity": "high|medium|low",
      "instances": 5,
      "trend": "increasing|stable|decreasing",
      "examples": ["Specific example 1", "Specific example 2"]
    }
  ],
  "regionalData": [
    {
      "name": "Region Name",
      "risk": 67,
      "alerts": 3,
      "trend": "up|down|stable",
      "population": "2.1M",
      "keyIssues": ["Issue 1", "Issue 2"]
    }
  ]
}

Make everything SPECIFIC and REALISTIC. Use actual political dynamics, real-sounding bill names, and genuine corruption patterns. Corruption risk should be 0-100 (higher = more risk).`
          },
          {
            role: "user",
            content: `Conduct a COMPREHENSIVE government analysis for: ${location}

DEEP RESEARCH REQUIRED:
1. Current government structure, officials, and political dynamics
2. Specific recent legislation with detailed analysis
3. Active corruption concerns and patterns
4. Regional political variations and local issues
5. Current political controversies and scandals
6. Lobbying activities and corporate influence
7. Upcoming elections and political calendar
8. Citizen concerns and protest movements
9. Media freedom and transparency issues
10. International relations affecting domestic policy

Provide SPECIFIC, DETAILED, and REALISTIC analysis with actual political intelligence.`
          }
        ],
        temperature: 0.4,
        max_tokens: 8192
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      try {
        return JSON.parse(content);
      } catch (parseError) {
        console.error('Failed to parse government analysis:', parseError);
        throw new Error('Failed to parse analysis results');
      }
    } catch (error) {
      console.error('Government analysis error:', error);
      throw error;
    }
  }

  async analyzeBill(billText: string, country: string): Promise<{
    riskScore: number;
    redFlags: string[];
    summary: string;
    recommendations: string[];
  }> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a legislative analysis expert specializing in corruption detection. Analyze bills for potential corruption, conflicts of interest, and democratic concerns.

Return JSON with this structure:
{
  "riskScore": 75,
  "redFlags": ["Red flag 1", "Red flag 2"],
  "summary": "Brief summary of the bill and main concerns",
  "recommendations": ["Action 1", "Action 2"]
}

Risk score: 0-100 (higher = more concerning)
Focus on: unusual timing, beneficiaries, procedural irregularities, language patterns, transparency issues.`
          },
          {
            role: "user",
            content: `Analyze this ${country} legislation for corruption risks and democratic concerns:

${billText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      return JSON.parse(content);
    } catch (error) {
      console.error('Bill analysis error:', error);
      throw error;
    }
  }
}

export const openaiService = new OpenAIService();