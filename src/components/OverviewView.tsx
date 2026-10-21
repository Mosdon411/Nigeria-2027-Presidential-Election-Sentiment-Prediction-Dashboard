import React, { useState } from 'react';
import { CANDIDATES, GEOPOLITICAL_ZONES, ECONOMIC_ISSUES } from '../data/electionData';
import { Candidate, CandidateId } from '../types/election';
import { ArrowUpRight, ArrowDownRight, Fuel, MapPin, Users, Activity, ExternalLink, BarChart3, Radio } from 'lucide-react';

interface OverviewViewProps {
  onSelectCandidate: (candidateId: CandidateId) => void;
  onNavigateTab: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectCandidate,
  onNavigateTab,
}) => {
  const [activeGeoFilter, setActiveGeoFilter] = useState<'all' | 'urban' | 'rural'>('all');

  const petrolIssue = ECONOMIC_ISSUES.find((i) => i.issueName.includes('Petrol')) || ECONOMIC_ISSUES[0];

  return (
    <div className="space-y-8">
      {/* Executive Intelligence Headline */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-700 font-mono font-semibold mb-1">
              INEC 2027 Election Cycle · September 2026 Intelligence Wave
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Three-Way Race: Opposition Lead Narrows as Incumbent Rebounds
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Peter Obi (NDC) retains plurality in scientific polling (42.2%), but the landslide has vanished (margin over Tinubu contracted from 46.1 to 16.7 pts). 
              A stark <span className="text-slate-900 font-medium">Urban vs Rural divergence</span> and <span className="text-slate-900 font-medium">petrol prices</span> govern the swing dynamics.
            </p>
          </div>

          {/* National mood stat */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg shrink-0">
            <div>
              <div className="text-xs text-slate-500 font-medium">National Pessimism Rate</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl font-bold font-mono text-amber-700 tabular-nums">56.8%</span>
                <span className="text-xs text-emerald-700 flex items-center font-mono font-semibold">
                  <ArrowDownRight className="w-3.5 h-3.5" /> -22.7%
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Down from 79.5% in May 2026</div>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Current Fuel Baseline</div>
              <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                ₦1,370<span className="text-xs font-normal text-slate-500">/L</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">MRS Abuja pump rate</div>
            </div>
          </div>
        </div>

        {/* Top 3 Contenders Grid */}
        <div className="grid md:grid-cols-3 gap-4 pt-5">
          {CANDIDATES.map((cand) => {
            const isObi = cand.id === 'peter-obi';
            const isTinubu = cand.id === 'bola-tinubu';
            const isAtiku = cand.id === 'atiku-abubakar';

            const displayedPoll =
              activeGeoFilter === 'urban'
                ? cand.urbanShare
                : activeGeoFilter === 'rural'
                ? cand.ruralShare
                : cand.scientificPollSept2026;

            const pollLabel =
              activeGeoFilter === 'urban'
                ? 'Urban Preference'
                : activeGeoFilter === 'rural'
                ? 'Rural Preference'
                : 'SBM Scientific Poll (Sept)';

            return (
              <div
                key={cand.id}
                onClick={() => onSelectCandidate(cand.id)}
                className="group relative bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 transition-all cursor-pointer hover:shadow-md shadow-xs"
              >
                {/* Top header row */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cand.color }}
                      ></span>
                      <span className="text-xs font-bold tracking-wider text-slate-700 font-mono">
                        {cand.party}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">· Age {cand.age}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors">
                      {cand.name}
                    </h2>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">{pollLabel}</span>
                    <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                      {displayedPoll.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Running Mate & Net Favorability */}
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Running Mate:</span>
                    <span className="text-slate-900 font-medium">
                      {cand.runningMate} ({cand.runningMateAge})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Net Favorability:</span>
                    <div className="flex items-center gap-1 font-mono font-semibold">
                      <span
                        className={
                          cand.netFavorabilitySept > 0 ? 'text-emerald-700' : 'text-rose-700'
                        }
                      >
                        {cand.netFavorabilitySept > 0 ? '+' : ''}
                        {cand.netFavorabilitySept}
                      </span>
                      <span className="text-slate-500 font-normal text-[11px]">
                        (was {cand.netFavorabilityMay > 0 ? '+' : ''}
                        {cand.netFavorabilityMay})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Urban vs Rural:</span>
                    <span className="text-slate-900 font-mono">
                      {cand.urbanShare}% <span className="text-slate-500">U</span> / {cand.ruralShare}% <span className="text-slate-500">R</span>
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="mt-4">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${displayedPoll}%`,
                        backgroundColor: cand.color,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Key takeaway */}
                <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                  {cand.keyStrengths}
                </p>

                <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{cand.primaryBases[0]}</span>
                  <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View Dossier <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Geographic Lens Filter Controls */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Electoral Lens Toggle:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-md border border-slate-200">
              <button
                onClick={() => setActiveGeoFilter('all')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeGeoFilter === 'all'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                National Aggregate (SBM)
              </button>
              <button
                onClick={() => setActiveGeoFilter('urban')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeGeoFilter === 'urban'
                    ? 'bg-white text-emerald-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Urban Only (NDC +28.6% lead)
              </button>
              <button
                onClick={() => setActiveGeoFilter('rural')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeGeoFilter === 'rural'
                    ? 'bg-white text-blue-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rural Only (APC +7.6% lead)
              </button>
            </div>
          </div>

          <div className="text-slate-500 font-mono">
            {activeGeoFilter === 'all' && 'Representative sample of 1,103 respondents across 12 states + FCT'}
            {activeGeoFilter === 'urban' && 'Exposes urban opposition concentration (Lagos, Abuja, Enugu, Port Harcourt)'}
            {activeGeoFilter === 'rural' && 'Exposes incumbent grassroots advantage in rural Northern & South-Western wards'}
          </div>
        </div>
      </div>

      {/* Two-Column Deep Insights: Urban-Rural Divide vs Petrol Issue */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Urban vs Rural Detailed Panel */}
        <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-slate-900">
                The Urban-Rural Divide: The "National Average" Trap
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('zones')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 font-mono"
            >
              Zone Details <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            SBM Intelligence’s September 2026 Voter Sentiment Tracker revealed that aggregated national numbers mask an acute geographic inversion.
            Urban voters are significantly more pessimistic about Nigeria’s direction, more skeptical of INEC, and favor NDC by nearly 30 points. In rural towns, the incumbent APC holds a solid lead.
          </p>

          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white text-xs">
            <div className="grid grid-cols-3 bg-slate-50 p-2.5 font-semibold text-slate-700 border-b border-slate-200 font-mono">
              <div>Metric / Stance</div>
              <div className="text-center text-emerald-700">Urban Respondents</div>
              <div className="text-center text-blue-700">Rural & Small-Town</div>
            </div>

            <div className="divide-y divide-slate-100 font-mono">
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-slate-800">NDC (Peter Obi)</span>
                <span className="text-center font-bold text-emerald-700 tabular-nums">49.5%</span>
                <span className="text-center text-slate-700 tabular-nums">27.6%</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-slate-800">APC (Bola Tinubu)</span>
                <span className="text-center text-slate-700 tabular-nums">20.9%</span>
                <span className="text-center font-bold text-blue-700 tabular-nums">35.2%</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-slate-800">ADC (Atiku Abubakar)</span>
                <span className="text-center text-slate-700 tabular-nums">22.1%</span>
                <span className="text-center text-amber-700 tabular-nums">29.8%</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-slate-800">National Pessimism</span>
                <span className="text-center text-rose-700 font-semibold">Substantially Higher</span>
                <span className="text-center text-slate-500">Lower / Moderate</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-slate-800">INEC BVAS Trust</span>
                <span className="text-center text-rose-700 font-semibold">Critical / Low</span>
                <span className="text-center text-emerald-700">Moderate / Resilient</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed font-sans">
            <span className="font-semibold text-amber-950">Forecasting Implication: </span>
            A national poll average suggesting an Obi runaway victory is structurally misleading if rural turnout remains high, because rural wards outnumber urban centers in 24 of Nigeria’s 36 states.
          </div>
        </div>

        {/* Petrol & Economic Issues Panel */}
        <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-rose-600" />
              <h3 className="text-base font-semibold text-slate-900">
                Petrol Prices: The Defining Economic Issue
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('petrol')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 font-mono"
            >
              Explore Matrix <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Petrol remains the federal government's worst-rated policy area, scoring a catastrophic{' '}
            <span className="text-rose-700 font-bold font-mono">1.69 / 4.0</span>. 
            Government policy is rejected by <span className="text-rose-700 font-semibold font-mono">67.4%</span> of citizens, with only 19.2% support.
          </p>

          {/* Regional Concern Breakdown */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-800 font-mono">
              Leading Problem in Core Geographic Zones:
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between text-slate-600 font-mono">
                  <span>South-West (Incumbent base)</span>
                  <span className="font-bold text-rose-700">30.5%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-rose-600 rounded-full" style={{ width: '30.5%' }}></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Cuts across traditional party loyalty</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between text-slate-600 font-mono">
                  <span>South-South (Oil Producing)</span>
                  <span className="font-bold text-rose-700">29.1%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-rose-600 rounded-full" style={{ width: '29.1%' }}></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Massive friction over pump rates</span>
              </div>
            </div>
          </div>

          {/* Candidate Policy Stances Summary */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-800 font-semibold font-mono">Contender Stances on Petrol:</div>
            <div className="space-y-1.5">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="font-bold text-emerald-700 font-mono">Peter Obi (NDC): </span>
                <span className="text-slate-700">Transparent subsidy regime with end-to-end crude & import auditing.</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="font-bold text-amber-700 font-mono">Atiku (ADC): </span>
                <span className="text-slate-700">Capped production subsidy for local refiners; excludes imported fuel.</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="font-bold text-blue-700 font-mono">Tinubu (APC): </span>
                <span className="text-slate-700">Complete PIA deregulation; expects Dangote output to organically ease prices.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Geopolitical Zones Quick Summary Bar */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              The 6 Geopolitical Zones: Battleground State Overview
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Constitutional rule: Winner must secure 25% of votes in at least 24 of 36 States + FCT.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('zones')}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 font-mono"
          >
            All 36 States Grid <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {GEOPOLITICAL_ZONES.map((zone) => {
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
              <div
                key={zone.id}
                onClick={() => onNavigateTab('zones')}
                className="bg-slate-50 border border-slate-200 hover:border-slate-300 p-3 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-mono">{zone.id}</span>
                  <span className="text-slate-500 font-mono">{zone.statesCount} States</span>
                </div>
                <div className="text-xs text-slate-700 font-medium mt-1 truncate">
                  {zone.name}
                </div>
                <div className="mt-2 text-xs">
                  <div className="text-[11px] text-slate-500 font-mono">Projected Lead:</div>
                  <div className={`font-semibold font-mono ${leaderColor}`}>
                    {leaderName}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Margin: +{zone.sbmMargin}%
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between font-mono">
                  <span>U: {zone.urbanPercent}%</span>
                  <span>R: {zone.ruralPercent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
