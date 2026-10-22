import React, { useState } from 'react';
import { CANDIDATES, GEOPOLITICAL_ZONES, ECONOMIC_ISSUES, HERO_BANNER_URL } from '../data/electionData';
import { Candidate, CandidateId } from '../types/election';
import { ArrowUpRight, ArrowDownRight, Fuel, MapPin, Users, Activity, ExternalLink, BarChart3, Radio, Sparkles, Sliders } from 'lucide-react';

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
      {/* Bold Editorial Hero Intelligence Showcase */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-white shadow-xl">
        <div className="absolute inset-0">
          <img
            src={HERO_BANNER_URL}
            alt="Nigeria 2027 Presidential Election Intelligence Map"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>INEC 2027 ELECTION CYCLE · SEPTEMBER 2026 INTELLIGENCE WAVE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Nigeria Decides 2027: Three-Way Race Tightens as Grassroots Dynamics Shift
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed font-normal">
            Independent multi-source intelligence synthesizing <span className="text-emerald-400 font-semibold">14,200+ hourly social signals</span>, 
            the SBM Intelligence scientific probability baseline ($N=1,103$), and Oxford-Metro digital audits.
          </p>

          <div className="mt-6 pt-5 border-t border-slate-700/60 flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Scientific Plurality</span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">Peter Obi (42.2%)</span>
              <span className="text-slate-400 block text-[10px] mt-0.5">Narrowed from 57.4% in May</span>
            </div>

            <div className="hidden sm:block h-10 w-px bg-slate-700"></div>

            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Incumbent Rebound</span>
              <span className="text-xl sm:text-2xl font-extrabold text-blue-400">Bola Tinubu (25.5%)</span>
              <span className="text-slate-400 block text-[10px] mt-0.5">Up from 11.0% in May</span>
            </div>

            <div className="hidden sm:block h-10 w-px bg-slate-700"></div>

            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Current Fuel Pump Rate</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">₦1,370<span className="text-xs font-normal text-slate-400">/L</span></span>
              <span className="text-slate-400 block text-[10px] mt-0.5">MRS Abuja benchmark</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contender Cards with Bold Editorial Portraits */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              The Presidential Contenders: Certified Slate & Polling Standings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any candidate card to view certified INEC credentials, running mate profiles, and policy stances.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => onNavigateTab('forecaster')}
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 font-mono shadow-xs transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulate Race</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Click card for dossier</span>
            </div>
          </div>
        </div>

        {/* Top 3 Contenders Grid with Prominent Photos */}
        <div className="grid md:grid-cols-3 gap-5 pt-5">
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
                className="group relative bg-white border-2 border-slate-200 hover:border-slate-400 rounded-xl p-5 transition-all cursor-pointer hover:shadow-lg shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Top Candidate Identity with Editorial Photo */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={cand.imageUrl}
                        alt={cand.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-top border-2 shadow-sm transition-transform duration-300 group-hover:scale-105"
                        style={{ borderColor: cand.color }}
                      />
                      <span
                        className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[10px] font-bold font-mono text-white shadow-xs"
                        style={{ backgroundColor: cand.color }}
                      >
                        {cand.party}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tracking-wider text-slate-700 font-mono">
                          {cand.party}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">· Age {cand.age}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5 group-hover:text-emerald-700 transition-colors truncate">
                        {cand.name}
                      </h3>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        Running mate: <span className="font-semibold text-slate-700">{cand.runningMate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Poll Metric Spotlight */}
                  <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block font-mono">{pollLabel}</span>
                      <span className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
                        {displayedPoll.toFixed(1)}%
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block font-mono">Net Favorability</span>
                      <span
                        className={`text-base font-bold font-mono tabular-nums ${
                          cand.netFavorabilitySept > 0 ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {cand.netFavorabilitySept > 0 ? '+' : ''}
                        {cand.netFavorabilitySept}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar visual */}
                  <div className="mt-3">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${displayedPoll}%`,
                          backgroundColor: cand.color,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Urban vs Rural breakdown preview */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
                    <span>Urban: <strong className="text-slate-900">{cand.urbanShare}%</strong></span>
                    <span>·</span>
                    <span>Rural: <strong className="text-slate-900">{cand.ruralShare}%</strong></span>
                  </div>

                  {/* Key takeaway */}
                  <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                    {cand.keyStrengths}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500 truncate max-w-[150px]">{cand.primaryBases[0]}</span>
                  <span className="text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Open Dossier <ArrowUpRight className="w-3.5 h-3.5" />
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
                <div className="flex items-center gap-2">
                  <img
                    src={CANDIDATES[0].imageUrl}
                    alt={CANDIDATES[0].name}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover object-top border border-emerald-500 shadow-2xs"
                  />
                  <span className="text-slate-900 font-semibold">NDC (Peter Obi)</span>
                </div>
                <span className="text-center font-bold text-emerald-700 tabular-nums">49.5%</span>
                <span className="text-center text-slate-700 tabular-nums">27.6%</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={CANDIDATES[1].imageUrl}
                    alt={CANDIDATES[1].name}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover object-top border border-blue-500 shadow-2xs"
                  />
                  <span className="text-slate-900 font-semibold">APC (Bola Tinubu)</span>
                </div>
                <span className="text-center text-slate-700 tabular-nums">20.9%</span>
                <span className="text-center font-bold text-blue-700 tabular-nums">35.2%</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={CANDIDATES[2].imageUrl}
                    alt={CANDIDATES[2].name}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover object-top border border-amber-500 shadow-2xs"
                  />
                  <span className="text-slate-900 font-semibold">ADC (Atiku Abubakar)</span>
                </div>
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

          {/* Candidate Policy Stances Summary with Photos */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-800 font-semibold font-mono">Contender Stances on Petrol:</div>
            <div className="space-y-2">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5">
                <img
                  src={CANDIDATES[0].imageUrl}
                  alt={CANDIDATES[0].name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover object-top border border-emerald-500 shrink-0 mt-0.5"
                />
                <div>
                  <span className="font-bold text-emerald-700 font-mono">Peter Obi (NDC): </span>
                  <span className="text-slate-700">Transparent subsidy regime with end-to-end crude & import auditing.</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5">
                <img
                  src={CANDIDATES[2].imageUrl}
                  alt={CANDIDATES[2].name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover object-top border border-amber-500 shrink-0 mt-0.5"
                />
                <div>
                  <span className="font-bold text-amber-700 font-mono">Atiku Abubakar (ADC): </span>
                  <span className="text-slate-700">Capped production subsidy for local refiners; excludes imported fuel.</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5">
                <img
                  src={CANDIDATES[1].imageUrl}
                  alt={CANDIDATES[1].name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover object-top border border-blue-500 shrink-0 mt-0.5"
                />
                <div>
                  <span className="font-bold text-blue-700 font-mono">Bola Tinubu (APC): </span>
                  <span className="text-slate-700">Complete PIA deregulation; expects Dangote output to organically ease prices.</span>
                </div>
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
