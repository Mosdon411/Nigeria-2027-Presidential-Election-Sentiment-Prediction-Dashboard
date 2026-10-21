export type CandidateId = 'peter-obi' | 'bola-tinubu' | 'atiku-abubakar' | 'other';

export type PartyId = 'NDC' | 'APC' | 'ADC' | 'LP' | 'PDP' | 'NNPP';

export type PlatformId = 'all' | 'X' | 'Facebook' | 'Nairaland' | 'TikTok' | 'Instagram';

export type GeopoliticalZoneId = 'NW' | 'NE' | 'NC' | 'SW' | 'SE' | 'SS';

export type SentimentPolarity = 'Positive' | 'Neutral' | 'Negative' | 'Polarized';

export type EmotionType = 'Hope' | 'Anger' | 'Disappointment' | 'Satire' | 'Fear';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface Candidate {
  id: CandidateId;
  name: string;
  party: PartyId;
  partyFullName: string;
  runningMate: string;
  runningMateAge: number;
  age: number;
  color: string;
  accentBg: string;
  borderColor: string;
  scientificPollSept2026: number; // SBM 42.2%, 25.5%, etc.
  scientificPollMay2026: number;  // SBM 57.4%, 11.0%, etc.
  onlinePollOxfordSept2026: number; // Oxford-Metro 33.86%, 35.41%, 26.67%
  onlinePollTmgSept2026: number; // TMG 14.1%, 12.3%, 73.6%
  netFavorabilitySept: number; // Obi +52.8, Tinubu -3.3, Atiku +12.4
  netFavorabilityMay: number;  // Obi strong positive, Tinubu -58.5
  urbanShare: number;          // SBM: Obi 49.5%, Tinubu 20.9%
  ruralShare: number;          // SBM: Obi 27.6%, Tinubu 35.2%
  primaryBases: string[];
  petrolPolicyStance: string;
  keyStrengths: string;
  vulnerability: string;
}

export interface ZoneData {
  id: GeopoliticalZoneId;
  name: string;
  statesCount: number;
  statesList: string[];
  registeredVotersEstMillion: number;
  urbanPercent: number;
  ruralPercent: number;
  sbmLeader: CandidateId;
  sbmMargin: number;
  petrolConcernRank: number;
  petrolConcernPercent: number; // e.g. SW 30.5%, SS 29.1%
  candidateShares: {
    'peter-obi': number;
    'bola-tinubu': number;
    'atiku-abubakar': number;
    other: number;
  };
  dominantIssues: string[];
}

export interface SocialPost {
  id: string;
  platform: 'X' | 'Facebook' | 'Nairaland' | 'TikTok' | 'Instagram';
  handle: string;
  authorName: string;
  verified: boolean;
  avatarSeed: string;
  content: string;
  englishGloss?: string;
  language: 'English' | 'Nigerian Pidgin' | 'Yoruba' | 'Hausa' | 'Igbo' | 'Mixed';
  detectedPidginKeywords: string[];
  candidate: CandidateId | 'all';
  sentiment: SentimentPolarity;
  intensityScore: number; // 1 to 5
  emotion: EmotionType;
  zone: GeopoliticalZoneId;
  cityState: string;
  timestampMinutesAgo: number;
  likes: number;
  shares: number;
  comments: number;
  issueTag: 'Petrol & Fuel' | 'Inflation & Food' | 'INEC Credibility' | 'Alliances & Age' | 'Security' | 'General';
}

export interface PollMethodology {
  sourceName: string;
  conductedDate: string;
  sampleSize: number;
  methodologyType: string;
  confidence: ConfidenceLevel;
  urbanRuralSplit: string;
  geographicSpread: string;
  criticalBiasWarning: string;
  obiScore: number;
  tinubuScore: number;
  atikuScore: number;
  otherScore: number;
}

export interface EconomicIssueMetric {
  issueName: string;
  priorityPercent: number;
  governmentRatingScore: number; // out of 4.0
  rejectionPercent: number;
  approvalPercent: number;
  highestConcernRegion: string;
  candidateProposals: {
    candidateId: CandidateId;
    summary: string;
  }[];
}

export interface SimulationState {
  nationalTurnoutPercent: number;
  urbanMobilizationShift: number; // -15 to +15%
  ruralMobilizationShift: number; // -15 to +15%
  petrolPumpPrice: number; // N1,200 to N1,850
  inflationRate: number; // 12% to 24%
  oppositionAlliance: 'divided' | 'merger_ndc_adc' | 'pact_adc_steps_down';
  inecCredibilityFactor: number; // 0.8 to 1.2
}
