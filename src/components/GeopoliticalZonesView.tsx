import React, { useState } from 'react';
import { GEOPOLITICAL_ZONES, CANDIDATES } from '../data/electionData';
import { GeopoliticalZoneId, ZoneData } from '../types/election';
import { MapPin, Users, Fuel, CheckCircle, AlertCircle, ArrowUpRight, Compass } from 'lucide-react';

export const GeopoliticalZonesView: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<GeopoliticalZoneId>('SW');

  const selectedZone =
    GEOPOLITICAL_ZONES.find((z) => z.id === selectedZoneId) || GEOPOLITICAL_ZONES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="text-xs uppercase tracking-wider text-emerald-700 font-mono font-semibold mb-1">
          Constitutional Geometry · 36 States + Federal Capital Territory
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          The 6 Geopolitical Zones: Battleground Geography
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Nigeria’s 1999 Constitution (as amended) requires the president-elect to secure the highest nationwide votes AND at least{' '}
          <span className="text-slate-900 font-semibold font-mono">25% of votes in at least 24 of the 36 states plus the FCT</span>.
          Without broad regional cross-appeal, a popular vote lead fails to secure the presidency in round one.
        </p>
      </div>

      {/* 6 Zones Selector Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {GEOPOLITICAL_ZONES.map((zone) => {
          const isSelected = selectedZoneId === zone.id;
          const leaderName =
            zone.sbmLeader === 'peter-obi'
              ? 'Obi (NDC)'
              : zone.sbmLeader === 'bola-tinubu'
              ? 'Tinubu (APC)'
              : 'Atiku (ADC)';

          const leaderColor =
            zone.sbmLeader === 'peter-obi'
              ? 'text-emerald-700'
              : zone.sbmLeader === 'bola-tinubu'
              ? 'text-blue-700'
              : 'text-amber-700';

          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZoneId(zone.id)}
              className={`text-left p-3.5 rounded-lg border transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-white shadow-md ring-1 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">{zone.id}</span>
                <span className="text-slate-500">{zone.statesCount} States</span>
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-1 truncate">
                {zone.name}
              </div>
              <div className="mt-2.5 flex items-center gap-2 text-xs font-mono">
                {(() => {
                  const leadCand = CANDIDATES.find(c => c.id === zone.sbmLeader);
                  return leadCand ? (
                    <img
                      src={leadCand.imageUrl}
                      alt={leadCand.name}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover object-top border shadow-2xs shrink-0"
                      style={{ borderColor: leadCand.color }}
                    />
                  ) : null;
                })()}
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-500 leading-tight">Projected Lead</div>
                  <div className={`font-bold truncate text-[11px] ${leaderColor}`}>{leaderName}</div>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex justify-between font-mono">
                <span>{zone.registeredVotersEstMillion}M Voters</span>
                <span className="text-slate-700 font-bold">+{zone.sbmMargin}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Zone Deep Dive Dossier */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-700">
                {selectedZone.id} REGIONAL BRIEF
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-mono">
                {selectedZone.registeredVotersEstMillion}M Registered Voters (~{((selectedZone.registeredVotersEstMillion / 93.4) * 100).toFixed(1)}% of National Electorate)
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {selectedZone.name} Zone ({selectedZone.statesCount} States)
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 block">Urban Split</span>
              <span className="text-slate-900 font-bold">{selectedZone.urbanPercent}%</span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <span className="text-slate-500 block">Rural Split</span>
              <span className="text-slate-900 font-bold">{selectedZone.ruralPercent}%</span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <span className="text-slate-500 block">Petrol Concern Rank</span>
              <span className="text-rose-700 font-bold">#{selectedZone.petrolConcernRank} ({selectedZone.petrolConcernPercent}%)</span>
            </div>
          </div>
        </div>

        {/* States List in this Zone */}
        <div>
          <span className="text-xs font-semibold text-slate-700 font-mono block mb-2">
            Jurisdictions Included ({selectedZone.statesList.length}):
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {selectedZone.statesList.map((state) => (
              <span
                key={state}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-800"
              >
                {state}
              </span>
            ))}
          </div>
        </div>

        {/* Candidate Projected Vote Shares in Zone */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-700 font-mono block">
            September 2026 Zone Polling Breakdown:
          </span>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Peter Obi */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-2">
                  <img
                    src={CANDIDATES[0].imageUrl}
                    alt="Peter Obi"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg object-cover object-top border border-emerald-500 shadow-2xs"
                  />
                  <div>
                    <span className="text-emerald-700 font-bold block">Peter Obi</span>
                    <span className="text-[10px] text-slate-500">NDC Coalition</span>
                  </div>
                </div>
                <span className="text-slate-900 font-extrabold text-lg tabular-nums">
                  {selectedZone.candidateShares['peter-obi']}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${selectedZone.candidateShares['peter-obi']}%` }}
                ></div>
              </div>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                {selectedZone.candidateShares['peter-obi'] >= 25 ? (
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Exceeds 25% Constitutional threshold
                  </span>
                ) : (
                  <span className="text-slate-500">Below 25% threshold in rural wards</span>
                )}
              </div>
            </div>

            {/* Bola Tinubu */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-2">
                  <img
                    src={CANDIDATES[1].imageUrl}
                    alt="Bola Tinubu"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg object-cover object-top border border-blue-500 shadow-2xs"
                  />
                  <div>
                    <span className="text-blue-700 font-bold block">Bola Tinubu</span>
                    <span className="text-[10px] text-slate-500">APC Incumbent</span>
                  </div>
                </div>
                <span className="text-slate-900 font-extrabold text-lg tabular-nums">
                  {selectedZone.candidateShares['bola-tinubu']}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${selectedZone.candidateShares['bola-tinubu']}%` }}
                ></div>
              </div>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                {selectedZone.candidateShares['bola-tinubu'] >= 25 ? (
                  <span className="text-blue-700 flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Exceeds 25% Constitutional threshold
                  </span>
                ) : (
                  <span className="text-slate-500">Underperforming 25% threshold mark</span>
                )}
              </div>
            </div>

            {/* Atiku Abubakar */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-2">
                  <img
                    src={CANDIDATES[2].imageUrl}
                    alt="Atiku Abubakar"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg object-cover object-top border border-amber-500 shadow-2xs"
                  />
                  <div>
                    <span className="text-amber-700 font-bold block">Atiku Abubakar</span>
                    <span className="text-[10px] text-slate-500">ADC Alliance</span>
                  </div>
                </div>
                <span className="text-slate-900 font-extrabold text-lg tabular-nums">
                  {selectedZone.candidateShares['atiku-abubakar']}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${selectedZone.candidateShares['atiku-abubakar']}%` }}
                ></div>
              </div>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                {selectedZone.candidateShares['atiku-abubakar'] >= 25 ? (
                  <span className="text-amber-700 flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Exceeds 25% Constitutional threshold
                  </span>
                ) : (
                  <span className="text-slate-500">Below 25% threshold mark</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dominant Voter Priorities in Zone */}
        <div className="border-t border-slate-200 pt-4">
          <span className="text-xs font-semibold text-slate-700 font-mono block mb-2">
            Top Dominant Voter Grievances in {selectedZone.name}:
          </span>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            {selectedZone.dominantIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded flex items-center gap-2 text-slate-700 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>{issue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Constitutional 25% in 24 States Explainer Card */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 text-xs text-slate-600 space-y-2 leading-relaxed font-mono shadow-xs">
        <span className="text-slate-900 font-bold text-sm block">
          Section 133 & 134 Electoral Threshold Arithmetic
        </span>
        <p>
          In a three-way race, even if a contender reaches 42% national vote share, failing to cross 25% in 24 distinct states mandates a constitutional run-off. 
          Currently:
        </p>
        <div className="grid sm:grid-cols-3 gap-3 pt-2 text-slate-800">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <span className="text-emerald-700 font-bold block">Peter Obi (NDC)</span>
            <span className="text-slate-900 text-base font-bold">~25 to 27 States</span>
            <p className="text-[11px] text-slate-500 mt-1 font-sans">High threshold safety if Kwankwaso delivers Kano/Kaduna margins.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <span className="text-blue-700 font-bold block">Bola Tinubu (APC)</span>
            <span className="text-slate-900 text-base font-bold">~23 to 26 States</span>
            <p className="text-[11px] text-slate-500 mt-1 font-sans">Strong breadth across South-West and Northern rural governors.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <span className="text-amber-700 font-bold block">Atiku Abubakar (ADC)</span>
            <span className="text-slate-900 text-base font-bold">~12 to 15 States</span>
            <p className="text-[11px] text-slate-500 mt-1 font-sans">Struggles to cross 25% in the South-East and South-West.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
