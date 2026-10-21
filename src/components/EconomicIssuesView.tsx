import React, { useState } from 'react';
import { ECONOMIC_ISSUES, CANDIDATES } from '../data/electionData';
import { Fuel, TrendingUp, AlertTriangle, CheckCircle, Zap, Shield, ShoppingCart, DollarSign } from 'lucide-react';

export const EconomicIssuesView: React.FC = () => {
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(0);
  const activeIssue = ECONOMIC_ISSUES[selectedIssueIndex];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="text-xs uppercase tracking-wider text-rose-700 font-mono font-semibold mb-1">
          Electoral Referendum Drivers · Citizen Sentiment Audit
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Petrol Prices & Economic Salience Barometer
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          The 2027 presidential election is fundamentally shaped as a referendum on macroeconomic survival.
          Petrol pricing has emerged as the single most corrosive issue for the incumbent administration, 
          scoring <span className="text-rose-700 font-bold font-mono">1.69 out of 4.0</span> in citizen approval, with <span className="text-rose-700 font-bold font-mono">67.4%</span> outright rejection.
        </p>
      </div>

      {/* Issues Selection Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ECONOMIC_ISSUES.map((issue, idx) => {
          const isSelected = selectedIssueIndex === idx;
          const isPetrol = issue.issueName.includes('Petrol');

          return (
            <button
              key={issue.issueName}
              onClick={() => setSelectedIssueIndex(idx)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-white shadow-md ring-1 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Priority #{idx + 1}</span>
                <span className="text-rose-700 font-bold">{issue.rejectionPercent}% Reject</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mt-1.5 leading-snug">
                {issue.issueName}
              </h3>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Gov. Score:</span>
                <span className={`font-bold ${issue.governmentRatingScore < 2 ? 'text-rose-700' : 'text-amber-700'}`}>
                  {issue.governmentRatingScore} / 4.0
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive into Selected Issue */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-mono text-emerald-700 font-semibold">ISSUE AUDIT DOSSIER</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {activeIssue.issueName}
            </h2>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Peak Vulnerability Hub: <span className="text-slate-800 font-medium">{activeIssue.highestConcernRegion}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 block">Public Rejection</span>
              <span className="text-rose-700 font-bold text-base">{activeIssue.rejectionPercent}%</span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <span className="text-slate-500 block">Public Support</span>
              <span className="text-emerald-700 font-bold text-base">{activeIssue.approvalPercent}%</span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <span className="text-slate-500 block">Salience Weight</span>
              <span className="text-slate-900 font-bold text-base">{activeIssue.priorityPercent}%</span>
            </div>
          </div>
        </div>

        {/* Petrol Focus Spotlight (if petrol selected) */}
        {activeIssue.issueName.includes('Petrol') && (
          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-lg space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-rose-800 font-bold">
              <Fuel className="w-4 h-4 text-rose-600" />
              <span>THE SOUTH-WEST & SOUTH-SOUTH SWING CRISIS</span>
            </div>
            <p className="text-slate-700 leading-relaxed font-sans">
              Crucially, petrol was the leading concern in regions not traditionally hostile to the ruling APC: 
              <span className="text-slate-900 font-semibold"> South-West (30.5%)</span> and{' '}
              <span className="text-slate-900 font-semibold">South-South (29.1%)</span>. 
              This proves the petrol crisis transcends ethnic, regional, and religious divides. 
              Recent modest pump price softening (e.g. MRS Abuja reducing prices from ₦1,395 to ₦1,370/L) has produced marginal relief, but structural anxiety remains acute.
            </p>
          </div>
        )}

        {/* Candidate Policy Proposals Comparison */}
        <div>
          <span className="text-xs font-semibold text-slate-800 font-mono block mb-3">
            Contender Economic Solutions & Policy Battlelines:
          </span>

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {activeIssue.candidateProposals.map((prop) => {
              const cand = CANDIDATES.find((c) => c.id === prop.candidateId)!;
              return (
                <div
                  key={prop.candidateId}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold" style={{ color: cand.color }}>
                      {cand.name}
                    </span>
                    <span className="text-slate-500 font-semibold">{cand.party}</span>
                  </div>

                  <p className="text-slate-700 leading-relaxed font-sans">
                    {prop.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                    {cand.id === 'peter-obi' && 'Focus: Governance transparency & anti-leakage'}
                    {cand.id === 'bola-tinubu' && 'Focus: PIA deregulation & domestic refining'}
                    {cand.id === 'atiku-abubakar' && 'Focus: Production caps & National Assembly oversight'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Policy Friction Point Note */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed font-mono">
          <span className="text-amber-950 font-bold">Policy Feasibility Friction: </span>
          The APC has publicly attacked Atiku’s "capped local refining subsidy" plan, arguing that reinstating discretionary fuel price pegs conflicts with the Petroleum Industry Act (PIA) and would discourage private investment in modular refineries.
        </div>
      </div>
    </div>
  );
};
