export interface GeographicHierarchy {
  country: CountryData;
  states: StateData[];
  cities: CityData[];
  districts?: DistrictData[];
}

export interface CountryData {
  name: string;
  code: string;
  flag: string;
  coordinates: [number, number];
  population: string;
  governmentType: string;
  corruptionRisk: number;
  keyIssues: string[];
  recentActivity: string[];
}

export interface StateData {
  name: string;
  code: string;
  country: string;
  coordinates: [number, number];
  population: string;
  governmentLevel: 'state' | 'province' | 'region';
  corruptionRisk: number;
  keyIssues: string[];
  majorCities: string[];
  governor?: string;
  legislature?: string;
  recentActivity: string[];
}

export interface CityData {
  name: string;
  state: string;
  country: string;
  coordinates: [number, number];
  population: string;
  governmentLevel: 'municipal' | 'metropolitan' | 'county';
  corruptionRisk: number;
  keyIssues: string[];
  localOfficials: LocalOfficial[];
  activePolicies: LocalPolicy[];
  recentActivity: LocalActivity[];
  budgetSize?: string;
  majorIndustries: string[];
}

export interface DistrictData {
  name: string;
  city: string;
  state: string;
  country: string;
  coordinates: [number, number];
  population: string;
  governmentLevel: 'district' | 'ward' | 'borough';
  corruptionRisk: number;
  keyIssues: string[];
  councilMembers: string[];
  recentActivity: string[];
}

export interface LocalOfficial {
  name: string;
  position: string;
  party?: string;
  termStart: string;
  termEnd: string;
  contactInfo?: string;
  recentActions: string[];
}

export interface LocalPolicy {
  id: string;
  title: string;
  description: string;
  status: 'proposed' | 'under_review' | 'passed' | 'rejected';
  dateIntroduced: string;
  sponsor: string;
  riskScore: number;
  publicSupport: number;
  estimatedCost?: number;
}

export interface LocalActivity {
  id: string;
  type: 'zoning' | 'budget' | 'contract' | 'ordinance' | 'permit' | 'meeting';
  title: string;
  description: string;
  date: string;
  amount?: number;
  beneficiary?: string;
  riskScore: number;
  publicMeetingDate?: string;
  votingRecord?: CouncilVote[];
  documents?: string[];
}

export interface CouncilVote {
  member: string;
  vote: 'yes' | 'no' | 'abstain';
  reason?: string;
}

export interface MapLayer {
  level: 'country' | 'state' | 'city' | 'district';
  data: (CountryData | StateData | CityData | DistrictData)[];
  zoomThreshold: number;
  clickHandler: (location: any) => void;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapData {
  countries?: CountryData[];
  states?: StateData[];
  cities?: CityData[];
  districts?: DistrictData[];
}