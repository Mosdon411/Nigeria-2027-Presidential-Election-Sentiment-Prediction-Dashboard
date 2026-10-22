import React, { useState, useMemo } from 'react';
import { SimulationState } from '../types/election';
import { runElectoralSimulation } from '../utils/simulatorEngine';
import { CANDIDATES } from '../data/electionData';
import { Sliders, RefreshCw, Award, AlertTriangle, CheckCircle, Scale, ChevronRight, Play, Sparkles } from 'lucide-react';

export const ForecasterView: React.FC = () => {
  const [params, setParams] = useState<SimulationState>({
    nationalTurnoutPercent: 34,
    urbanMobilizationShift: 0,
    ruralMobilizationShift: 0,
    petrolPumpPrice: 1370,
    inflationRate: 16.9,
    oppositionAlliance: 'divided',
    inecCredibilityFactor: 1.0,
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [runCount, setRunCount] = useState(1);

  // Dynamic reactive simulation on any param change
  const result = useMemo(() => runElectoralSimulation(params), [params]);

  const handleRunMonteCarlo = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setRunCount((prev) => prev + 1);
    }, 400);
  };

  const handleApplyPreset = (preset: Partial<SimulationState>) => {
    setParams(prev => ({ ...prev, ...preset }));
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setRunCount((prev) => prev + 1);
    }, 300);
  };

  const handleReset = () => {
    setParams({
      nationalTurnoutPercent: 34,
      urbanMobilizationShift: 0,
      ruralMobilizationShift: 0,
      petrolPumpPrice: 1370,
      inflationRate: 16.9,
      oppositionAlliance: 'divided',
      inecCredibilityFactor: 1.0,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-emerald-700 font-mono font-semibold">
                Interactive Scenario Forecaster & Monte Carlo Engine
              </span>
              <span className="text-[11px] font-mono text-slate-500">· Iteration #{runCount}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
              2027 Presidential Electoral Simulator
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Model how the <span className="text-slate-900 font-medium">Turnout Dynamics Reversal</span>,{' '}
              <span className="text-slate-900 font-medium">Urban vs Rural Mobilization</span>,{' '}
              <span className="text-slate-900 font-medium">Petrol Price Fluctuations</span>, and{' '}
              <span className="text-slate-900 font-medium">Opposition Coalition Structure</span> impact 2027 outcomes and the constitutional 25% state threshold rule.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-auto font-mono">
            <button
              onClick={handleRunMonteCarlo}
              disabled={isSimulating}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-md transition-colors flex items-center gap-2 shadow-xs"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Simulating 10k Runs...' : 'Simulate Race'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-md border border-slate-300 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Quick presets ribbon */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-500 font-semibold mr-1">Scenario Presets:</span>
          <button
            onClick={() =>
              handleApplyPreset({
                nationalTurnoutPercent: 34,
                urbanMobilizationShift: 0,
                ruralMobilizationShift: 0,
                petrolPumpPrice: 1370,
                oppositionAlliance: 'divided',
              })
            }
            className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
          >
            Baseline 2026
          </button>
          <button
            onClick={() =>
              handleApplyPreset({
                nationalTurnoutPercent: 42,
                urbanMobilizationShift: 12,
                ruralMobilizationShift: -4,
                petrolPumpPrice: 1450,
                oppositionAlliance: 'divided',
              })
            }
            className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
          >
            Youth Urban Surge (+12%)
          </button>
          <button
            onClick={() =>
              handleApplyPreset({
                nationalTurnoutPercent: 50,
                urbanMobilizationShift: -5,
                ruralMobilizationShift: 12,
                petrolPumpPrice: 1250,
                oppositionAlliance: 'divided',
              })
            }
            className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
          >
            Rural Machine Dominance (50% Turnout)
          </button>
          <button
            onClick={() =>
              handleApplyPreset({
                nationalTurnoutPercent: 38,
                urbanMobilizationShift: 5,
                ruralMobilizationShift: 2,
                petrolPumpPrice: 1370,
                oppositionAlliance: 'merger_ndc_adc',
              })
            }
            className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
          >
            Grand Opposition Merger
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Simulation Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-slate-200 bg-white rounded-xl p-5 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Electoral Variables & Inputs
              </h2>
            </div>

            {/* Variable 1: National Turnout Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">National Voter Turnout:</span>
                <span className="text-emerald-700 font-bold">{params.nationalTurnoutPercent}%</span>
              </div>
              <input
                type="range"
                min="25"
                max="65"
                step="1"
                value={params.nationalTurnoutPercent}
                onChange={(e) =>
                  setParams({ ...params, nationalTurnoutPercent: Number(e.target.value) })
                }
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>25% (Apathy)</span>
                <span>34% (Baseline)</span>
                <span>65% (Mass Mobilization)</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal pt-1 font-sans">
                *SBM finding: Higher turnout mobilizes rural interior wards favoring the incumbent APC machine.
              </p>
            </div>

            {/* Variable 2: Urban vs Rural Mobilization Shift */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">Urban Voter Surge:</span>
                <span className="text-emerald-700 font-bold">
                  {params.urbanMobilizationShift > 0 ? '+' : ''}
                  {params.urbanMobilizationShift}%
                </span>
              </div>
              <input
                type="range"
                min="-15"
                max="15"
                step="1"
                value={params.urbanMobilizationShift}
                onChange={(e) =>
                  setParams({ ...params, urbanMobilizationShift: Number(e.target.value) })
                }
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>-15% (Urban slump)</span>
                <span>0% (Neutral)</span>
                <span>+15% (Youth surge)</span>
              </div>
            </div>

            {/* Variable 3: Rural Mobilization Shift */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">Rural Ward Mobilization:</span>
                <span className="text-blue-700 font-bold">
                  {params.ruralMobilizationShift > 0 ? '+' : ''}
                  {params.ruralMobilizationShift}%
                </span>
              </div>
              <input
                type="range"
                min="-15"
                max="15"
                step="1"
                value={params.ruralMobilizationShift}
                onChange={(e) =>
                  setParams({ ...params, ruralMobilizationShift: Number(e.target.value) })
                }
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>-15%</span>
                <span>0% (Neutral)</span>
                <span>+15% (APC Governors deploy)</span>
              </div>
            </div>

            {/* Variable 4: Petrol Pump Price */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium">Petrol Pump Price:</span>
                <span className="text-rose-700 font-bold">₦{params.petrolPumpPrice}/L</span>
              </div>
              <input
                type="range"
                min="1100"
                max="1850"
                step="25"
                value={params.petrolPumpPrice}
                onChange={(e) =>
                  setParams({ ...params, petrolPumpPrice: Number(e.target.value) })
                }
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₦1,100 (Relief)</span>
                <span>₦1,370 (Current)</span>
                <span>₦1,850 (Severe shock)</span>
              </div>
            </div>

            {/* Variable 5: Opposition Coalition Structure */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <label className="text-slate-700 font-medium block font-mono">
                Opposition Structural Status:
              </label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300">
                  <input
                    type="radio"
                    name="alliance"
                    checked={params.oppositionAlliance === 'divided'}
                    onChange={() =>
                      setParams({ ...params, oppositionAlliance: 'divided' })
                    }
                    className="accent-emerald-600"
                  />
                  <span className="text-slate-700">
                    <strong className="text-slate-900 font-semibold">Divided Opposition:</strong> NDC & ADC run separately (Splits Northern votes)
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300">
                  <input
                    type="radio"
                    name="alliance"
                    checked={params.oppositionAlliance === 'merger_ndc_adc'}
                    onChange={() =>
                      setParams({ ...params, oppositionAlliance: 'merger_ndc_adc' })
                    }
                    className="accent-emerald-600"
                  />
                  <span className="text-slate-700">
                    <strong className="text-emerald-700 font-semibold">Grand Coalition Ticket:</strong> Obi + Atiku joint alliance
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-300">
                  <input
                    type="radio"
                    name="alliance"
                    checked={params.oppositionAlliance === 'pact_adc_steps_down'}
                    onChange={() =>
                      setParams({ ...params, oppositionAlliance: 'pact_adc_steps_down' })
                    }
                    className="accent-emerald-600"
                  />
                  <span className="text-slate-700">
                    <strong className="text-amber-700 font-semibold">Step-Down Pact:</strong> ADC endorses NDC in key battlegrounds
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Simulation Outcomes & Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Outcome Verdict Card */}
          <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Projected Electoral Verdict
              </span>
              <span className="text-xs font-mono text-slate-500">
                Turnout: {result.effectiveTurnoutPercent}% ({result.totalVotesCastMillion}M Votes Cast)
              </span>
            </div>

            {result.outcomeType === 'FIRST_ROUND_VICTORY' ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3.5">
                <div className="relative shrink-0">
                  {(() => {
                    const winnerCandidate = result.projectedWinner
                      ? CANDIDATES.find(c => result.projectedWinner!.includes(c.name) || result.projectedWinner!.includes(c.party))
                      : undefined;
                    return winnerCandidate ? (
                      <img
                        src={winnerCandidate.imageUrl}
                        alt={winnerCandidate.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover object-top border-2 border-emerald-600 shadow-sm"
                      />
                    ) : (
                      <Award className="w-8 h-8 text-emerald-600" />
                    );
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 uppercase">
                    <Award className="w-3.5 h-3.5" />
                    <span>Outright First-Round Victory Projected</span>
                  </div>
                  <h3 className="text-base font-bold text-emerald-950 mt-0.5">
                    {result.projectedWinner} Wins 2027 Election
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1 font-sans">
                    Meets both constitutional criteria: simple nationwide plurality AND &gt;25% in at least 24 states + FCT.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3.5">
                <div className="flex -space-x-2 shrink-0">
                  {result.runOffCandidates?.map((candName) => {
                    const candObj = CANDIDATES.find(c => candName.includes(c.name) || candName.includes(c.party));
                    return candObj ? (
                      <img
                        key={candObj.id}
                        src={candObj.imageUrl}
                        alt={candObj.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-xl object-cover object-top border-2 border-amber-500 shadow-sm"
                      />
                    ) : null;
                  })}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 uppercase">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Mandatory Constitutional Run-Off Projected</span>
                  </div>
                  <h3 className="text-base font-bold text-amber-950 mt-0.5">
                    Run-Off Triggered
                  </h3>
                  <p className="text-xs text-amber-800 mt-1 font-sans">
                    No candidate simultaneously met the 25% threshold across 24 states and national plurality. 
                    Run-off contest between <strong className="text-slate-900">{result.runOffCandidates?.[0]}</strong> and <strong className="text-slate-900">{result.runOffCandidates?.[1]}</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Candidate Projected Tally */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-800 font-mono block">
                Simulated Candidate Vote Shares:
              </span>

              {result.candidateResults.map((cand) => {
                const candObj = CANDIDATES.find(c => c.id === cand.id);
                return (
                  <div key={cand.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {candObj && (
                          <img
                            src={candObj.imageUrl}
                            alt={cand.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-lg object-cover object-top border shadow-2xs"
                            style={{ borderColor: cand.color }}
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm">{cand.name}</span>
                            <span className="text-slate-500 font-medium">({cand.party})</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block font-sans">
                            {cand.party === 'NDC' ? 'Opposition Coalition' : cand.party === 'APC' ? 'Incumbent Ruling Party' : 'Northern Alliance'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                          {cand.projectedVoteShare}%
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {cand.projectedTotalVotesMillion}M votes
                        </span>
                      </div>
                    </div>

                    {/* Bar */}
                    <div className="h-2 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, cand.projectedVoteShare)}%`,
                          backgroundColor: cand.color,
                        }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1 border-t border-slate-200/60">
                      <span>
                        25% Threshold in States: <strong className="text-slate-900">{cand.statesMeeting25PercentThreshold}</strong> / 37
                      </span>
                      <span className={cand.statesMeeting25PercentThreshold >= 24 ? 'text-emerald-700 font-bold' : 'text-slate-500 font-medium'}>
                        {cand.statesMeeting25PercentThreshold >= 24 ? 'Passed (≥24 states)' : 'Short of 24 states'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Notes from Simulator */}
            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600 font-mono">
              <span className="text-slate-900 font-bold block">Simulation Mechanics Triggered:</span>
              {result.keyDynamicsNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-700 mt-0.5">·</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
