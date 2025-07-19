import OpenAI from 'openai';
import { CountryData, StateData, CityData, DistrictData, GeographicHierarchy } from '../types/geographic';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class GeographicAnalysisService {
  async analyzeCountry(countryName: string): Promise<CountryData> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a geopolitical analyst specializing in country-level government analysis. Provide comprehensive country analysis with focus on corruption risks and political dynamics.

Return JSON with this exact structure:
{
  "name": "Country Name",
  "code": "ISO code",
  "flag": "🇺🇸",
  "coordinates": [latitude, longitude],
  "population": "330M",
  "governmentType": "Federal Democratic Republic",
  "corruptionRisk": 67,
  "keyIssues": ["Issue 1", "Issue 2", "Issue 3"],
  "recentActivity": ["Activity 1", "Activity 2", "Activity 3"]
}

Focus on current political climate, corruption patterns, and democratic health.`
          },
          {
            role: "user",
            content: `Analyze country: ${countryName}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 1000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Country analysis error:', error);
      throw error;
    }
  }

  async analyzeState(countryName: string, stateName: string): Promise<StateData> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a regional political analyst specializing in state/provincial government analysis. Analyze state-level political dynamics, corruption risks, and governance issues.

Return JSON with this exact structure:
{
  "name": "State Name",
  "code": "State Code",
  "country": "Country Name",
  "coordinates": [latitude, longitude],
  "population": "39M",
  "governmentLevel": "state|province|region",
  "corruptionRisk": 45,
  "keyIssues": ["Housing", "Climate", "Economy"],
  "majorCities": ["City 1", "City 2", "City 3"],
  "governor": "Governor Name",
  "legislature": "State Legislature Name",
  "recentActivity": ["Recent bill 1", "Recent policy 2", "Recent controversy 3"]
}

Focus on state-specific political issues, local corruption patterns, and regional governance challenges.`
          },
          {
            role: "user",
            content: `Analyze state/region: ${stateName} in ${countryName}. Include:
1. Current state government structure and leadership
2. Recent state legislation and policies
3. State-specific corruption risks and patterns
4. Major cities and their political significance
5. Regional economic interests and lobbying
6. Interstate political relationships and influences`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 1200
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('State analysis error:', error);
      throw error;
    }
  }

  async analyzeCity(countryName: string, stateName: string, cityName: string): Promise<CityData> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a municipal government analyst specializing in city-level political analysis. Analyze local government structure, corruption risks, and civic issues.

Return JSON with this exact structure:
{
  "name": "City Name",
  "state": "State Name",
  "country": "Country Name",
  "coordinates": [latitude, longitude],
  "population": "2.1M",
  "governmentLevel": "municipal|metropolitan|county",
  "corruptionRisk": 52,
  "keyIssues": ["Housing", "Transportation", "Development"],
  "localOfficials": [
    {
      "name": "Mayor Name",
      "position": "Mayor",
      "party": "Party",
      "termStart": "2022-01-01",
      "termEnd": "2026-01-01",
      "contactInfo": "mayor@city.gov",
      "recentActions": ["Action 1", "Action 2"]
    }
  ],
  "activePolicies": [
    {
      "id": "POLICY-001",
      "title": "Policy Title",
      "description": "Policy description",
      "status": "proposed|under_review|passed|rejected",
      "dateIntroduced": "2024-01-15",
      "sponsor": "Council Member Name",
      "riskScore": 25,
      "publicSupport": 67,
      "estimatedCost": 5000000
    }
  ],
  "recentActivity": [
    {
      "id": "ACT-001",
      "type": "zoning|budget|contract|ordinance|permit|meeting",
      "title": "Activity Title",
      "description": "Activity description",
      "date": "2024-01-15",
      "amount": 1000000,
      "beneficiary": "Company Name",
      "riskScore": 45,
      "publicMeetingDate": "2024-01-20",
      "votingRecord": [
        {
          "member": "Council Member",
          "vote": "yes|no|abstain",
          "reason": "Voting reason"
        }
      ],
      "documents": ["Document 1", "Document 2"]
    }
  ],
  "budgetSize": "$2.5B",
  "majorIndustries": ["Tech", "Finance", "Tourism"]
}

Focus on municipal governance, local corruption patterns, development projects, and citizen concerns.`
          },
          {
            role: "user",
            content: `Conduct comprehensive municipal analysis for ${cityName}, ${stateName}, ${countryName}:

1. Municipal government structure (mayor, city council, departments)
2. Current local officials and their backgrounds
3. Active municipal policies and ordinances
4. Recent city council activities and voting patterns
5. Local development projects and zoning decisions
6. Municipal budget allocation and spending patterns
7. Local business influence and permit processes
8. Community issues and citizen concerns
9. Corruption risks specific to local government
10. Major industries and economic interests

Provide specific, realistic details about local governance and political dynamics.`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4,
        max_tokens: 3000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('City analysis error:', error);
      throw error;
    }
  }

  async getStatesForCountry(countryName: string): Promise<StateData[]> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `List major states/provinces/regions for a country with basic political information.

Return JSON array with this structure:
[
  {
    "name": "State Name",
    "code": "ST",
    "country": "Country Name",
    "coordinates": [lat, lng],
    "population": "Population",
    "governmentLevel": "state|province|region",
    "corruptionRisk": 45,
    "keyIssues": ["Issue 1", "Issue 2"],
    "majorCities": ["City 1", "City 2"],
    "governor": "Governor Name",
    "legislature": "Legislature Name",
    "recentActivity": ["Activity 1", "Activity 2"]
  }
]

Include 5-15 major states/provinces depending on country size.`
          },
          {
            role: "user",
            content: `List major states/provinces/regions for: ${countryName}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 2000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('States listing error:', error);
      throw error;
    }
  }

  async getCitiesForState(countryName: string, stateName: string): Promise<CityData[]> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `List major cities for a state/province with basic municipal information.

Return JSON array with simplified city structure:
[
  {
    "name": "City Name",
    "state": "State Name",
    "country": "Country Name",
    "coordinates": [lat, lng],
    "population": "Population",
    "governmentLevel": "municipal|metropolitan|county",
    "corruptionRisk": 35,
    "keyIssues": ["Issue 1", "Issue 2"],
    "localOfficials": [],
    "activePolicies": [],
    "recentActivity": [],
    "budgetSize": "$500M",
    "majorIndustries": ["Industry 1", "Industry 2"]
  }
]

Include 5-20 major cities depending on state size.`
          },
          {
            role: "user",
            content: `List major cities for: ${stateName}, ${countryName}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 2000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content);
    } catch (error) {
      console.error('Cities listing error:', error);
      throw error;
    }
  }

  // Demo data generators for when API key is not available
  generateDemoCountryData(countryName: string): CountryData {
    return {
      name: countryName,
      code: 'XX',
      flag: '🌍',
      coordinates: [40.7128, -74.0060],
      population: '50M',
      governmentType: 'Democratic Republic',
      corruptionRisk: 55,
      keyIssues: ['Economic Policy', 'Healthcare', 'Education'],
      recentActivity: [
        'New healthcare reform bill introduced',
        'Infrastructure spending package approved',
        'Anti-corruption task force established'
      ]
    };
  }

  generateDemoStateData(countryName: string, stateName: string): StateData {
    return {
      name: stateName,
      code: 'ST',
      country: countryName,
      coordinates: [40.0, -75.0],
      population: '5M',
      governmentLevel: 'state',
      corruptionRisk: 42,
      keyIssues: ['Housing', 'Transportation', 'Environment'],
      majorCities: ['Capital City', 'Metro City', 'Port City'],
      governor: 'Governor Smith (Demo)',
      legislature: 'State Assembly',
      recentActivity: [
        'State budget approved with infrastructure focus',
        'New environmental regulations proposed',
        'Education funding increase passed'
      ]
    };
  }

  generateDemoCityData(countryName: string, stateName: string, cityName: string): CityData {
    return {
      name: cityName,
      state: stateName,
      country: countryName,
      coordinates: [40.7589, -73.9851],
      population: '500K',
      governmentLevel: 'municipal',
      corruptionRisk: 38,
      keyIssues: ['Housing Affordability', 'Traffic Congestion', 'Public Safety'],
      localOfficials: [
        {
          name: 'Mayor Johnson (Demo)',
          position: 'Mayor',
          party: 'Democratic',
          termStart: '2022-01-01',
          termEnd: '2026-01-01',
          contactInfo: 'mayor@city.gov',
          recentActions: [
            'Proposed affordable housing initiative',
            'Launched green transportation program'
          ]
        }
      ],
      activePolicies: [
        {
          id: 'POLICY-001',
          title: 'Affordable Housing Development Act',
          description: 'Incentivizes development of affordable housing units',
          status: 'under_review',
          dateIntroduced: '2024-01-15',
          sponsor: 'Council Member Davis',
          riskScore: 15,
          publicSupport: 72,
          estimatedCost: 25000000
        }
      ],
      recentActivity: [
        {
          id: 'ACT-001',
          type: 'zoning',
          title: 'Downtown Rezoning Proposal',
          description: 'Proposal to rezone downtown area for mixed-use development',
          date: '2024-01-20',
          amount: 50000000,
          beneficiary: 'Metro Development Corp',
          riskScore: 25,
          publicMeetingDate: '2024-02-01',
          votingRecord: [
            {
              member: 'Council Member Davis',
              vote: 'yes',
              reason: 'Supports affordable housing goals'
            }
          ],
          documents: ['Zoning Proposal PDF', 'Environmental Impact Study']
        }
      ],
      budgetSize: '$1.2B',
      majorIndustries: ['Technology', 'Healthcare', 'Education']
    };
  }
}

export const geographicAnalysisService = new GeographicAnalysisService();