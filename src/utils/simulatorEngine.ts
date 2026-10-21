import { GEOPOLITICAL_ZONES } from '../data/electionData';
import { CandidateId, SimulationState } from '../types/election';

export interface SimulationResult {
  candidateResults: {
    id: CandidateId;
    name: string;
    party: string;
    projectedVoteShare: number; // e.g. 39.4%
    projectedTotalVotesMillion: number;
    statesMeeting25PercentThreshold: number; // needed >= 24/36 + FCT
    qualifiesForFirstRoundWin: boolean;
    color: string;
  }[];
  totalElectorateEstMillion: number;
  totalVotesCastMillion: number;
  effectiveTurnoutPercent: number;
  outcomeType: 'FIRST_ROUND_VICTORY' | 'MANDATORY_RUNOFF';
  projectedWinner?: string;
  runOffCandidates?: [string, string];
  keyDynamicsNotes: string[];
}

export function runElectoralSimulation(params: SimulationState): SimulationResult {
  const registeredVotersMillion = 93.4; // INEC national voter register
  const turnout = params.nationalTurnoutPercent / 100;
  const totalVotesCast = registeredVotersMillion * turnout;

  // Baseline vote shares based on September 2026 SBM + Geopolitical weights
  // Obi ~ 40.5%, Tinubu ~ 26.5%, Atiku ~ 21.0%, Others ~ 12.0%
  let obiBase = 40.5;
  let tinubuBase = 26.5;
  let atikuBase = 20.5;
  let othersBase = 12.5;

  const dynamicNotes: string[] = [];

  // 1. Turnout dynamic reversal (as discovered in SBM Sept wave)
  // Higher turnout brings in rural conservative interior which shifts votes toward APC
  // Lower turnout concentrates urban motivated votes which helps NDC
  const turnoutDelta = params.nationalTurnoutPercent - 34; // 34% is reference baseline
  if (turnoutDelta > 0) {
    const shift = (turnoutDelta * 0.28);
    tinubuBase += shift;
    obiBase -= shift * 0.65;
    atikuBase -= shift * 0.35;
    dynamicNotes.push(`High Turnout (${params.nationalTurnoutPercent}%): Rural mobilization adds +${shift.toFixed(1)}% to APC incumbent machine.`);
  } else if (turnoutDelta < 0) {
    const shift = Math.abs(turnoutDelta * 0.25);
    obiBase += shift * 0.7;
    tinubuBase -= shift * 0.6;
    dynamicNotes.push(`Low Turnout (${params.nationalTurnoutPercent}%): Concentrates urban educated core, boosting NDC resilience.`);
  }

  // 2. Urban vs Rural Mobilization Shift
  if (params.urbanMobilizationShift !== 0) {
    const urbanImpact = params.urbanMobilizationShift * 0.32;
    obiBase += urbanImpact;
    tinubuBase -= urbanImpact * 0.45;
    atikuBase -= urbanImpact * 0.35;
    dynamicNotes.push(`Urban Surge: NDC captures higher share of urban surge (+${urbanImpact.toFixed(1)}%).`);
  }

  if (params.ruralMobilizationShift !== 0) {
    const ruralImpact = params.ruralMobilizationShift * 0.35;
    tinubuBase += ruralImpact;
    atikuBase += ruralImpact * 0.2;
    obiBase -= ruralImpact * 0.6;
    dynamicNotes.push(`Rural Surge: APC leverages 22 state governor machines (+${ruralImpact.toFixed(1)}%).`);
  }

  // 3. Petrol Price Sensitivity
  // Base price reference: N1,370/L
  const petrolDiff = params.petrolPumpPrice - 1370;
  if (petrolDiff > 50) {
    // Petrol hiked
    const penalty = (petrolDiff / 100) * 1.8;
    tinubuBase -= penalty;
    obiBase += penalty * 0.55;
    atikuBase += penalty * 0.45;
    dynamicNotes.push(`Petrol Hike (N${params.petrolPumpPrice}/L): Deepens backlash across SW and SS; incumbent penalised -${penalty.toFixed(1)}%.`);
  } else if (petrolDiff < -50) {
    // Petrol softened
    const relief = (Math.abs(petrolDiff) / 100) * 1.5;
    tinubuBase += relief;
    obiBase -= relief * 0.5;
    dynamicNotes.push(`Petrol Price Easing (N${params.petrolPumpPrice}/L): Relieves urban cost pressures; incumbent rebounds +${relief.toFixed(1)}%.`);
  }

  // 4. Opposition Alliance Dynamics
  if (params.oppositionAlliance === 'merger_ndc_adc') {
    // Joint ticket Obi + Atiku / Kwankwaso
    const coalitionBonus = atikuBase * 0.78;
    obiBase += coalitionBonus;
    atikuBase = atikuBase * 0.22; // residual protest vote
    dynamicNotes.push(`Opposition Coalition: 78% of ADC voter pool consolidates behind NDC unified ticket, creating overwhelming lead.`);
  } else if (params.oppositionAlliance === 'pact_adc_steps_down') {
    const stepDownBonus = atikuBase * 0.65;
    obiBase += stepDownBonus;
    tinubuBase += atikuBase * 0.20; // some Northern conservative votes shift to APC
    atikuBase = atikuBase * 0.15;
    dynamicNotes.push(`ADC Step-Down Pact: Northern non-APC votes consolidate primarily into NDC with secondary APC spillage.`);
  } else {
    dynamicNotes.push(`Divided Opposition: NDC and ADC split anti-incumbent sentiment, particularly in the North-East and North-Central.`);
  }

  // Normalize shares to 100%
  const currentTotal = Math.max(1, obiBase + tinubuBase + atikuBase + othersBase);
  const normObi = Number(((obiBase / currentTotal) * 100).toFixed(1));
  const normTinubu = Number(((tinubuBase / currentTotal) * 100).toFixed(1));
  const normAtiku = Number(((atikuBase / currentTotal) * 100).toFixed(1));
  const normOthers = Number((100 - (normObi + normTinubu + normAtiku)).toFixed(1));

  // 5. Calculate 25% threshold across 36 states + FCT (37 entities total)
  // SE (5 states): Obi > 25% in all 5; Tinubu in 0-1; Atiku in 0
  // SS (6 states): Obi in all 6; Tinubu in 3-4; Atiku in 2
  // SW (6 states): Tinubu in all 6; Obi in 4-5 (Lagos, Oyo, Ogun, Ondo); Atiku in 1-2
  // NC (7 entities): Obi in 5-6 (Plateau, Benue, Nasarawa, FCT); Tinubu in 5-6; Atiku in 3-4
  // NW (7 states): Tinubu in all 7; Atiku in 5-6; Obi in 3-4 (with Kwankwaso boost in Kano/Kaduna)
  // NE (6 states): Atiku in 5-6; Tinubu in 5; Obi in 1-2
  
  let obiThresholdCount = 0;
  let tinubuThresholdCount = 0;
  let atikuThresholdCount = 0;

  // Dynamic state threshold simulation based on zone shares
  GEOPOLITICAL_ZONES.forEach(zone => {
    const states = zone.statesCount;
    // Calculate candidate performance in this zone adjusted by macro shifts
    const zoneObiShare = zone.candidateShares['peter-obi'] * (normObi / 40.5);
    const zoneTinubuShare = zone.candidateShares['bola-tinubu'] * (normTinubu / 26.5);
    const zoneAtikuShare = zone.candidateShares['atiku-abubakar'] * (normAtiku / 20.5);

    if (zoneObiShare >= 24) {
      obiThresholdCount += Math.min(states, Math.max(1, Math.round(states * (zoneObiShare >= 30 ? 1 : 0.7))));
    }
    if (zoneTinubuShare >= 24) {
      tinubuThresholdCount += Math.min(states, Math.max(1, Math.round(states * (zoneTinubuShare >= 30 ? 1 : 0.7))));
    }
    if (zoneAtikuShare >= 24) {
      atikuThresholdCount += Math.min(states, Math.max(1, Math.round(states * (zoneAtikuShare >= 30 ? 1 : 0.7))));
    }
  });

  // Clamp thresholds to realistic bounds (max 37)
  obiThresholdCount = Math.min(37, Math.max(14, obiThresholdCount));
  tinubuThresholdCount = Math.min(37, Math.max(16, tinubuThresholdCount));
  atikuThresholdCount = Math.min(37, Math.max(8, atikuThresholdCount));

  const candidateResults = [
    {
      id: 'peter-obi' as CandidateId,
      name: 'Peter Obi',
      party: 'NDC',
      projectedVoteShare: normObi,
      projectedTotalVotesMillion: Number(((totalVotesCast * normObi) / 100).toFixed(2)),
      statesMeeting25PercentThreshold: obiThresholdCount,
      qualifiesForFirstRoundWin: normObi > normTinubu && normObi > normAtiku && obiThresholdCount >= 24,
      color: '#10B981',
    },
    {
      id: 'bola-tinubu' as CandidateId,
      name: 'Bola Ahmed Tinubu',
      party: 'APC',
      projectedVoteShare: normTinubu,
      projectedTotalVotesMillion: Number(((totalVotesCast * normTinubu) / 100).toFixed(2)),
      statesMeeting25PercentThreshold: tinubuThresholdCount,
      qualifiesForFirstRoundWin: normTinubu > normObi && normTinubu > normAtiku && tinubuThresholdCount >= 24,
      color: '#3B82F6',
    },
    {
      id: 'atiku-abubakar' as CandidateId,
      name: 'Atiku Abubakar',
      party: 'ADC',
      projectedVoteShare: normAtiku,
      projectedTotalVotesMillion: Number(((totalVotesCast * normAtiku) / 100).toFixed(2)),
      statesMeeting25PercentThreshold: atikuThresholdCount,
      qualifiesForFirstRoundWin: normAtiku > normObi && normAtiku > normTinubu && atikuThresholdCount >= 24,
      color: '#F59E0B',
    },
    {
      id: 'other' as CandidateId,
      name: 'Other 15 Parties',
      party: 'OTH',
      projectedVoteShare: normOthers,
      projectedTotalVotesMillion: Number(((totalVotesCast * normOthers) / 100).toFixed(2)),
      statesMeeting25PercentThreshold: 0,
      qualifiesForFirstRoundWin: false,
      color: '#94A3B8',
    },
  ];

  // Sort by share descending
  const sorted = [...candidateResults].sort((a, b) => b.projectedVoteShare - a.projectedVoteShare);
  const leader = sorted[0];

  let outcomeType: 'FIRST_ROUND_VICTORY' | 'MANDATORY_RUNOFF' = 'MANDATORY_RUNOFF';
  let projectedWinner: string | undefined = undefined;
  let runOffCandidates: [string, string] | undefined = undefined;

  if (leader.qualifiesForFirstRoundWin) {
    outcomeType = 'FIRST_ROUND_VICTORY';
    projectedWinner = `${leader.name} (${leader.party})`;
  } else {
    outcomeType = 'MANDATORY_RUNOFF';
    runOffCandidates = [`${sorted[0].name} (${sorted[0].party})`, `${sorted[1].name} (${sorted[1].party})`];
  }

  return {
    candidateResults,
    totalElectorateEstMillion: registeredVotersMillion,
    totalVotesCastMillion: Number(totalVotesCast.toFixed(2)),
    effectiveTurnoutPercent: params.nationalTurnoutPercent,
    outcomeType,
    projectedWinner,
    runOffCandidates,
    keyDynamicsNotes: dynamicNotes,
  };
}
