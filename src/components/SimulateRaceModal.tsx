import React, { useState } from 'react';
import { X, Sliders, RefreshCw, Award, Scale, Play, CheckCircle, ArrowRight, Sparkles, Fuel, Users } from 'lucide-react';
import { SimulationState, CandidateId } from '../types/election';
import { runElectoralSimulation, SimulationResult } from '../utils/simulatorEngine';
import { CANDIDATES } from '../data/electionData';

interface SimulateRaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullStudio: () => void;
}

export const SimulateRaceModal: React.FC<SimulateRaceModalProps> = ({
  isOpen,
  onClose,
  onOpenFullStudio,
}) => {
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
  const [simulationCount, setSimulationCount] = useState(1);
  const [result, setResult] = useState<SimulationResult>(() => runElectoralSimulation(params));

  if (!isOpen) return null;

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const res = runElectoralSimulation(params);
      setResult(res);
      setIsSimulating(false);
      setSimulationCount((prev) => prev + 1);
    }, 450);
  };

  const applyPreset = (presetParams: Partial<SimulationState>) => {
    const updated = { ...params, ...presetParams };
    setParams(updated);
    setIsSimulating(true);
    setTimeout(() => {
      const res = runElectoralSimulation(updated);
      setResult(res);
      setIsSimulating(false);
      setSimulationCount((prev) => prev + 1);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Sliders className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                  Interactive Simulator
                </span>
                <span className="text-xs font-mono text-slate-500">Run #{simulationCount}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                Simulate 2027 Presidential Race
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
          {/* Quick Scenario Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Quick Scenario Presets:
              </span>
              <span className="text-slate-500 text-[11px] font-mono">Instant test cases</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() =>
                  applyPreset({
                    nationalTurnoutPercent: 34,
                    urbanMobilizationShift: 0,
                    ruralMobilizationShift: 0,
                    petrolPumpPrice: 1370,
                    oppositionAlliance: 'divided',
                  })
                }
                className="p-2.5 text-left rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 bg-white transition-all shadow-2xs group"
              >
                <div className="font-bold text-slate-900 group-hover:text-emerald-700">Baseline 2026</div>
                <div className="text-[10px] text-slate-500 mt-0.5">34% turnout · ₦1,370/L</div>
              </button>

              <button
                onClick={() =>
                  applyPreset({
                    nationalTurnoutPercent: 42,
                    urbanMobilizationShift: 12,
                    ruralMobilizationShift: -4,
                    petrolPumpPrice: 1450,
                    oppositionAlliance: 'divided',
                  })
                }
                className="p-2.5 text-left rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 bg-white transition-all shadow-2xs group"
              >
                <div className="font-bold text-slate-900 group-hover:text-emerald-700">Youth Urban Surge</div>
                <div className="text-[10px] text-slate-500 mt-0.5">+12% Urban · NDC surge</div>
              </button>

              <button
                onClick={() =>
                  applyPreset({
                    nationalTurnoutPercent: 50,
                    urbanMobilizationShift: -5,
                    ruralMobilizationShift: 12,
                    petrolPumpPrice: 1250,
                    oppositionAlliance: 'divided',
                  })
                }
                className="p-2.5 text-left rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 bg-white transition-all shadow-2xs group"
              >
                <div className="font-bold text-slate-900 group-hover:text-emerald-700">Rural Machine Dominance</div>
                <div className="text-[10px] text-slate-500 mt-0.5">50% turnout · APC machine</div>
              </button>

              <button
                onClick={() =>
                  applyPreset({
                    nationalTurnoutPercent: 38,
                    urbanMobilizationShift: 5,
                    ruralMobilizationShift: 3,
                    petrolPumpPrice: 1370,
                    oppositionAlliance: 'merger_ndc_adc',
                  })
                }
                className="p-2.5 text-left rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 bg-white transition-all shadow-2xs group"
              >
                <div className="font-bold text-slate-900 group-hover:text-emerald-700">Grand Merger</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Obi + Atiku joint ticket</div>
              </button>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            {/* Turnout Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-slate-700 font-semibold">National Voter Turnout:</span>
                <span className="text-emerald-700 font-bold text-sm">{params.nationalTurnoutPercent}%</span>
              </div>
              <input
                type="range"
                min="25"
                max="60"
                step="1"
                value={params.nationalTurnoutPercent}
                onChange={(e) => setParams({ ...params, nationalTurnoutPercent: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>25% (Apathy)</span>
                <span>34% (Baseline)</span>
                <span>60% (Mass)</span>
              </div>
            </div>

            {/* Petrol Pump Price Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-slate-700 font-semibold">Petrol Pump Price:</span>
                <span className="text-rose-700 font-bold text-sm">₦{params.petrolPumpPrice}/L</span>
              </div>
              <input
                type="range"
                min="1100"
                max="1800"
                step="25"
                value={params.petrolPumpPrice}
                onChange={(e) => setParams({ ...params, petrolPumpPrice: Number(e.target.value) })}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₦1,100 (Subsidized)</span>
                <span>₦1,370 (Now)</span>
                <span>₦1,800 (Crisis)</span>
              </div>
            </div>

            {/* Urban Shift */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-slate-700 font-semibold">Urban Youth Shift:</span>
                <span className="text-emerald-700 font-bold text-sm">
                  {params.urbanMobilizationShift > 0 ? '+' : ''}{params.urbanMobilizationShift}%
                </span>
              </div>
              <input
                type="range"
                min="-15"
                max="15"
                step="1"
                value={params.urbanMobilizationShift}
                onChange={(e) => setParams({ ...params, urbanMobilizationShift: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>-15% (Slump)</span>
                <span>0% (Neutral)</span>
                <span>+15% (Surge)</span>
              </div>
            </div>

            {/* Rural Shift */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-slate-700 font-semibold">Rural Ward Shift:</span>
                <span className="text-blue-700 font-bold text-sm">
                  {params.ruralMobilizationShift > 0 ? '+' : ''}{params.ruralMobilizationShift}%
                </span>
              </div>
              <input
                type="range"
                min="-15"
                max="15"
                step="1"
                value={params.ruralMobilizationShift}
                onChange={(e) => setParams({ ...params, ruralMobilizationShift: Number(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>-15% (Decline)</span>
                <span>0% (Neutral)</span>
                <span>+15% (Machine)</span>
              </div>
            </div>
          </div>

          {/* Coalition Selector Buttons */}
          <div className="space-y-1.5">
            <span className="font-mono font-semibold text-slate-700 text-[11px]">
              Opposition Coalition Configuration:
            </span>
            <div className="grid sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setParams({ ...params, oppositionAlliance: 'divided' })}
                className={`p-2 rounded-lg border text-left font-mono transition-colors ${
                  params.oppositionAlliance === 'divided'
                    ? 'border-emerald-600 bg-white font-bold text-slate-900 shadow-2xs ring-1 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div>Divided Opposition</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">NDC & ADC compete</div>
              </button>

              <button
                type="button"
                onClick={() => setParams({ ...params, oppositionAlliance: 'merger_ndc_adc' })}
                className={`p-2 rounded-lg border text-left font-mono transition-colors ${
                  params.oppositionAlliance === 'merger_ndc_adc'
                    ? 'border-emerald-600 bg-white font-bold text-slate-900 shadow-2xs ring-1 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div>Grand Merger Ticket</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">Joint Obi-Atiku ticket</div>
              </button>

              <button
                type="button"
                onClick={() => setParams({ ...params, oppositionAlliance: 'pact_adc_steps_down' })}
                className={`p-2 rounded-lg border text-left font-mono transition-colors ${
                  params.oppositionAlliance === 'pact_adc_steps_down'
                    ? 'border-emerald-600 bg-white font-bold text-slate-900 shadow-2xs ring-1 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div>Endorsement Pact</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">ADC steps down</div>
              </button>
            </div>
          </div>

          {/* Run Action Trigger */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className={`w-4 h-4 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Simulating 10,000 Iterations...' : 'Re-Run Race Simulation'}</span>
            </button>

            <span className="hidden sm:inline text-[11px] text-slate-500 font-mono">
              Constitutional 25% across 24 States + FCT verified
            </span>
          </div>

          {/* Simulation Outcome Card */}
          <div className="border border-slate-200 bg-slate-50/80 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-mono font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Simulation Result
              </span>
              <span className="font-mono text-slate-500">
                Votes Cast: {result.totalVotesCastMillion}M ({result.effectiveTurnoutPercent}% turnout)
              </span>
            </div>

            {result.outcomeType === 'FIRST_ROUND_VICTORY' ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                {(() => {
                  const winner = result.projectedWinner
                    ? CANDIDATES.find(c => result.projectedWinner!.includes(c.name) || result.projectedWinner!.includes(c.party))
                    : undefined;
                  return winner ? (
                    <img
                      src={winner.imageUrl}
                      alt={winner.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover object-top border-2 border-emerald-600 shadow-sm shrink-0"
                    />
                  ) : (
                    <Award className="w-8 h-8 text-emerald-600 shrink-0" />
                  );
                })()}
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 uppercase">
                    <Award className="w-3.5 h-3.5" />
                    <span>Outright First-Round Victory Projected</span>
                  </div>
                  <h3 className="text-base font-extrabold text-emerald-950">
                    {result.projectedWinner} Wins 2027 Election
                  </h3>
                  <p className="text-[11px] text-emerald-800 font-sans mt-0.5">
                    Secures both simple national plurality and 25%+ in over 24 states.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                <div className="flex -space-x-2 shrink-0">
                  {result.runOffCandidates?.map((candName) => {
                    const c = CANDIDATES.find(cand => candName.includes(cand.name) || candName.includes(cand.party));
                    return c ? (
                      <img
                        key={c.id}
                        src={c.imageUrl}
                        alt={c.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover object-top border-2 border-amber-500 shadow-sm"
                      />
                    ) : null;
                  })}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-800 uppercase">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Mandatory Constitutional Run-Off Projected</span>
                  </div>
                  <h3 className="text-base font-extrabold text-amber-950">
                    Two-Man Run-Off Triggered
                  </h3>
                  <p className="text-[11px] text-amber-800 font-sans mt-0.5">
                    Contest between <strong>{result.runOffCandidates?.[0]}</strong> and <strong>{result.runOffCandidates?.[1]}</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Candidate Standings Progress Rows */}
            <div className="space-y-2.5 pt-1">
              {result.candidateResults.map((cand) => {
                const candObj = CANDIDATES.find(c => c.id === cand.id);
                return (
                  <div key={cand.id} className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {candObj && (
                          <img
                            src={candObj.imageUrl}
                            alt={cand.name}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full object-cover object-top border"
                            style={{ borderColor: cand.color }}
                          />
                        )}
                        <span className="font-bold text-slate-900">{cand.name}</span>
                        <span className="text-slate-500">({cand.party})</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-900 text-sm">{cand.projectedVoteShare}%</span>
                        <span className="text-slate-500 text-[11px] ml-2 font-normal">({cand.projectedTotalVotesMillion}M)</span>
                      </div>
                    </div>

                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, cand.projectedVoteShare)}%`,
                          backgroundColor: cand.color,
                        }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
                      <span>25% Threshold in States: <strong>{cand.statesMeeting25PercentThreshold}</strong> / 37</span>
                      <span className={cand.statesMeeting25PercentThreshold >= 24 ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
                        {cand.statesMeeting25PercentThreshold >= 24 ? 'Constitutional threshold met' : 'Below 24 state mark'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between font-mono text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>

          <button
            onClick={onOpenFullStudio}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Open Full Scenario Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
