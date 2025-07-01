import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface DeepDiveResult {
  topic: string;
  location: string;
  analysis: string;
  keyFindings: string[];
  sources: Source[];
  followUpPrompts: string[];
  riskAssessment: {
    level: 'low' | 'medium' | 'high' | 'critical';
    score: number;
    factors: string[];
  };
  actionableInsights: string[];
  relatedTopics: string[];
}

export interface Source {
  id: string;
  title: string;
  url: string;
  type: 'news' | 'official' | 'analysis' | 'document' | 'social';
  credibility: number;
  date: string;
  summary: string;
  relevance: number;
}

export class DeepDiveService {
  async conductDeepDive(
    location: string,
    topic: string,
    governmentLevel: 'country' | 'state' | 'city',
    previousContext?: string
  ): Promise<DeepDiveResult> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an investigative journalist and political analyst specializing in deep-dive government investigations. Conduct thorough research and analysis on specific political topics.

Your task is to:
1. Provide comprehensive analysis of the specified topic
2. Generate realistic, credible sources with actual-sounding URLs
3. Identify key findings and patterns
4. Assess corruption/democratic risks
5. Suggest actionable insights for citizens
6. Recommend follow-up investigation topics

Return JSON with this exact structure:
{
  "topic": "Topic being investigated",
  "location": "Location name",
  "analysis": "Detailed analysis (2-3 paragraphs)",
  "keyFindings": ["Finding 1", "Finding 2", "Finding 3"],
  "sources": [
    {
      "id": "source-1",
      "title": "Realistic article title",
      "url": "https://realistic-news-site.com/article-url",
      "type": "news|official|analysis|document|social",
      "credibility": 85,
      "date": "2024-01-15",
      "summary": "Brief summary of the source content",
      "relevance": 92
    }
  ],
  "followUpPrompts": ["Follow-up question 1", "Follow-up question 2"],
  "riskAssessment": {
    "level": "medium",
    "score": 65,
    "factors": ["Risk factor 1", "Risk factor 2"]
  },
  "actionableInsights": ["Action 1", "Action 2"],
  "relatedTopics": ["Related topic 1", "Related topic 2"]
}

Make everything realistic and specific to the location and government level.`
          },
          {
            role: "user",
            content: `Conduct a deep-dive investigation on: "${topic}" in ${location} (${governmentLevel} level).

${previousContext ? `Previous context: ${previousContext}` : ''}

Focus on:
1. Current political dynamics and recent developments
2. Key players and their motivations
3. Financial interests and lobbying influences
4. Potential corruption or transparency issues
5. Citizen impact and democratic implications
6. Specific, actionable findings

Provide realistic sources that citizens could actually follow up on, including:
- News articles from credible outlets
- Official government documents and websites
- Analysis from think tanks or academic institutions
- Social media or public statements from officials
- Financial disclosure documents

Make the analysis specific, detailed, and actionable for concerned citizens.`
          }
        ],
        temperature: 0.4,
        max_tokens: 3000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Deep dive analysis error:', error);
      throw error;
    }
  }

  async generateFollowUpSources(
    location: string,
    topic: string,
    currentFindings: string[]
  ): Promise<Source[]> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Generate realistic follow-up sources for continued investigation. Create credible-sounding news articles, official documents, and analysis pieces that would logically exist for this topic.

Return JSON array of sources:
[
  {
    "id": "unique-id",
    "title": "Realistic title",
    "url": "https://credible-site.com/article",
    "type": "news|official|analysis|document|social",
    "credibility": 75,
    "date": "2024-01-15",
    "summary": "What this source reveals",
    "relevance": 88
  }
]

Make URLs realistic but don't use real existing URLs. Create plausible news sites, government domains, and organization websites.`
          },
          {
            role: "user",
            content: `Generate 5-8 follow-up sources for investigating "${topic}" in ${location}.

Current findings: ${currentFindings.join(', ')}

Include a mix of:
- Recent news coverage
- Official government documents
- Expert analysis
- Financial disclosures
- Public records`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Follow-up sources error:', error);
      throw error;
    }
  }

  // Demo data for when API key is not available
  generateDemoDeepDive(location: string, topic: string): DeepDiveResult {
    return {
      topic,
      location,
      analysis: `Our investigation into ${topic} in ${location} reveals several concerning patterns. Recent legislative activity shows increased corporate influence in policy-making, with lobbying spending up 45% this quarter. Key officials have been meeting privately with industry representatives before major votes. The timing of certain policy announcements coincides suspiciously with campaign contribution cycles, suggesting potential quid pro quo arrangements.`,
      keyFindings: [
        `${location} officials received $2.3M in campaign contributions from affected industries`,
        'Three major policy reversals occurred within 30 days of private industry meetings',
        'Public comment periods were shortened for controversial legislation',
        'Voting patterns show unusual alignment with corporate interests'
      ],
      sources: [
        {
          id: 'demo-1',
          title: `${location} Officials Meet Privately with Industry Leaders Before Key Vote`,
          url: `https://local-news-${location.toLowerCase()}.com/politics/private-meetings-investigation`,
          type: 'news',
          credibility: 87,
          date: '2024-01-20',
          summary: 'Investigation reveals undisclosed meetings between city officials and development companies',
          relevance: 94
        },
        {
          id: 'demo-2',
          title: `Campaign Finance Report: ${location} Q4 2023`,
          url: `https://ethics.${location.toLowerCase()}.gov/reports/campaign-finance-q4-2023`,
          type: 'official',
          credibility: 95,
          date: '2024-01-15',
          summary: 'Official campaign finance disclosures showing contribution patterns',
          relevance: 89
        },
        {
          id: 'demo-3',
          title: `Policy Analysis: Corporate Influence in ${location} Government`,
          url: `https://transparency-institute.org/analysis/${location.toLowerCase()}-corporate-influence`,
          type: 'analysis',
          credibility: 82,
          date: '2024-01-18',
          summary: 'Academic analysis of corporate lobbying effectiveness in local government',
          relevance: 91
        }
      ],
      followUpPrompts: [
        'Who are the specific lobbyists involved and what other clients do they represent?',
        'What other cities have similar patterns of corporate influence?',
        'How do voting records correlate with campaign contribution timing?'
      ],
      riskAssessment: {
        level: 'medium',
        score: 67,
        factors: [
          'Undisclosed private meetings with industry',
          'Shortened public comment periods',
          'Correlation between contributions and votes'
        ]
      },
      actionableInsights: [
        'Attend upcoming city council meetings to demand transparency',
        'File public records requests for meeting schedules and attendees',
        'Organize citizen oversight committee for campaign finance monitoring'
      ],
      relatedTopics: [
        'Development project approvals',
        'Zoning law changes',
        'Public contract awards',
        'Environmental regulation rollbacks'
      ]
    };
  }
}

export const deepDiveService = new DeepDiveService();