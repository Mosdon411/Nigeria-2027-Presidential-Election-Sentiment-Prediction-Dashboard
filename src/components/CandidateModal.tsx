import React from 'react';
import { Candidate, CandidateId } from '../types/election';
import { CANDIDATES } from '../data/electionData';
import { X, ArrowUpRight, CheckCircle, AlertTriangle, ShieldCheck, MapPin, Fuel } from 'lucide-react';

interface CandidateModalProps {
  candidateId: CandidateId | null;
  onClose: () => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({ candidateId, onClose }) => {
  if (!candidateId) return null;

  const candidate = CANDIDATES.find((c) => c.id === candidateId);
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: candidate.color }}
              ></span>
              <span className="text-xs font-mono font-bold text-slate-600">
                {candidate.party} · Age {candidate.age}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{candidate.name}</h2>
            <div className="text-xs text-slate-500 mt-0.5">{candidate.partyFullName}</div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Running Mate Lockup */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1 font-mono">
          <div className="text-slate-500">Vice Presidential Running Mate (INEC Certified):</div>
          <div className="text-slate-900 font-bold text-sm">
            {candidate.runningMate} (Age {candidate.runningMateAge})
          </div>
        </div>

        {/* Polling Statistics Grid */}
        <div className="grid grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">SBM Scientific (Sept)</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">
              {candidate.scientificPollSept2026}%
            </span>
            <span className="text-[11px] text-slate-500">May: {candidate.scientificPollMay2026}%</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Oxford-Metro Online</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">
              {candidate.onlinePollOxfordSept2026}%
            </span>
            <span className="text-[11px] text-slate-500">Urban digital sample</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Net Favorability</span>
            <span
              className={`text-xl font-bold mt-1 block ${
                candidate.netFavorabilitySept > 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {candidate.netFavorabilitySept > 0 ? '+' : ''}
              {candidate.netFavorabilitySept}
            </span>
            <span className="text-[11px] text-slate-500">May: {candidate.netFavorabilityMay > 0 ? '+' : ''}{candidate.netFavorabilityMay}</span>
          </div>
        </div>

        {/* Urban vs Rural Split */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-xs font-mono space-y-2">
          <div className="flex justify-between text-slate-600">
            <span>Urban Centers Preference:</span>
            <span className="font-bold text-slate-900">{candidate.urbanShare}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${candidate.urbanShare}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-slate-600 pt-2">
            <span>Rural & Small-Town Preference:</span>
            <span className="font-bold text-slate-900">{candidate.ruralShare}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${candidate.ruralShare}%` }}
            ></div>
          </div>
        </div>

        {/* Stance on Petrol */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-rose-700 font-bold font-mono">
            <Fuel className="w-3.5 h-3.5" />
            <span>Policy Stance on Petrol & Subsidies:</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-sans">
            {candidate.petrolPolicyStance}
          </p>
        </div>

        {/* Key Strengths & Vulnerabilities */}
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 leading-relaxed">
            <strong className="text-emerald-800 block mb-0.5 font-mono font-bold">Strategic Strengths:</strong>
            {candidate.keyStrengths}
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 leading-relaxed">
            <strong className="text-rose-800 block mb-0.5 font-mono font-bold">Core Vulnerabilities:</strong>
            {candidate.vulnerability}
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold text-xs font-mono transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
