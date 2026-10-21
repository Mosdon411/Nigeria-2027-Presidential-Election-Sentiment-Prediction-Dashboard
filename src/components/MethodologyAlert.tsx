import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, X, ShieldCheck, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

export const MethodologyAlert: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeLegendTab, setActiveLegendTab] = useState<'tiers' | 'audits'>('tiers');
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 sm:p-5 mb-6 text-sm text-slate-800 transition-all shadow-xs">
      {/* Top Banner Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-amber-100 text-amber-700 mt-0.5 shrink-0 border border-amber-200">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="font-semibold text-slate-900">
                Methodological Guardrail: Social Media Sentiment ≠ Votes
              </span>
              <span className="text-xs text-amber-800 font-mono font-medium">
                2023 Precedent Rule Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Online discourse structurally over-indexes on urban, youth, and smartphone-connected demographics (e.g. Lagos and Abuja FCT skew). 
              Kaduna Gov. Uba Sani’s caution is benchmarked: high online polarity does not equal rural precinct ballot mobilization.
            </p>

            {/* Inline Compact Confidence Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono">
              <span className="text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
                Confidence Framework:
              </span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block shadow-[0_0_6px_rgba(5,150,105,0.4)]"></span>
                <span className="text-emerald-700 font-semibold">High:</span>
                <span>Scientific Probability (SBM)</span>
              </div>
              <span className="text-slate-400 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shadow-[0_0_6px_rgba(217,119,6,0.4)]"></span>
                <span className="text-amber-700 font-semibold">Medium:</span>
                <span>Digital Opt-in (Oxford-Metro)</span>
              </div>
              <span className="text-slate-400 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block shadow-[0_0_6px_rgba(225,29,72,0.4)]"></span>
                <span className="text-rose-700 font-semibold">Low / Indicative:</span>
                <span>Activist Polls & Social Feeds (TMG/X)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-amber-800 hover:text-amber-900 font-medium px-2.5 py-1 rounded-md hover:bg-amber-100 transition-colors flex items-center gap-1 font-mono border border-amber-300 bg-white"
          >
            <span>{expanded ? 'Hide Legend' : 'Legend & Audit'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-amber-100 transition-colors"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Deep Legend & Audit Protocols */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-amber-200 space-y-4">
          {/* Segmented Controls for Legend vs Sampling Audits */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 text-xs shadow-2xs">
              <button
                onClick={() => setActiveLegendTab('tiers')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  activeLegendTab === 'tiers'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Visual Confidence Level Legend
              </button>
              <button
                onClick={() => setActiveLegendTab('audits')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  activeLegendTab === 'audits'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sampling Audits & Turnout Shifts
              </button>
            </div>
            <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
              ISO-aligned Polling Reliability Standard
            </span>
          </div>

          {activeLegendTab === 'tiers' ? (
            /* Visual Confidence Level Grid */
            <div className="grid md:grid-cols-3 gap-3.5 pt-1 text-xs font-mono">
              {/* High Confidence Card */}
              <div className="p-3.5 rounded-lg bg-white border border-emerald-300 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]"></span>
                    <span className="font-bold text-emerald-700 text-sm">High Confidence</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Primary Benchmark</span>
                </div>
                <div className="text-slate-900 font-semibold font-sans">
                  Scientific Face-to-Face Probability Sampling
                </div>
                <p className="text-slate-600 font-sans leading-relaxed text-[11.5px]">
                  <strong>Source Standard:</strong> SBM Intelligence Voter Sentiment Tracker (N=1,103). Conducted across 12 representative states and FCT across all 6 geopolitical zones.
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <div>· <strong>Weighting:</strong> Balanced 52% urban / 48% rural</div>
                  <div>· <strong>Predictive Role:</strong> Used for official polling baselines and electoral simulator calculations</div>
                </div>
              </div>

              {/* Medium Confidence Card */}
              <div className="p-3.5 rounded-lg bg-white border border-amber-300 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.4)]"></span>
                    <span className="font-bold text-amber-700 text-sm">Medium Confidence</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Demographic Sub-Set</span>
                </div>
                <div className="text-slate-900 font-semibold font-sans">
                  Digital Opt-In Web & Smartphone Polls
                </div>
                <p className="text-slate-600 font-sans leading-relaxed text-[11.5px]">
                  <strong>Source Standard:</strong> Oxford-Metro Analytics (N=69,110). Very large digital sample but heavily geographically concentrated (54.44% Lagos & Abuja).
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <div>· <strong>Weighting:</strong> ~88% urban, digital smartphone owners</div>
                  <div>· <strong>Predictive Role:</strong> Valid for tracking urban connected sentiment, not representative of rural wards</div>
                </div>
              </div>

              {/* Low / Indicative Confidence Card */}
              <div className="p-3.5 rounded-lg bg-white border border-rose-300 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.4)]"></span>
                    <span className="font-bold text-rose-700 text-sm">Low / Indicative</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Sentiment Tracking Only</span>
                </div>
                <div className="text-slate-900 font-semibold font-sans">
                  Activist Web Polls & Social Feeds
                </div>
                <p className="text-slate-600 font-sans leading-relaxed text-[11.5px]">
                  <strong>Source Standard:</strong> TMG "Tinubu Must Go" Poll (N=109,799; Atiku 73.6%) and raw X/TikTok/Nairaland volumes. High self-selection & algorithmic echo chambers.
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <div>· <strong>Weighting:</strong> Partisan/viral activist networks</div>
                  <div>· <strong>Predictive Role:</strong> Tracks narrative velocity and emotional intensity, NEVER converted to ballot predictions</div>
                </div>
              </div>
            </div>
          ) : (
            /* Sampling Audits & Turnout Dynamics Panel */
            <div className="grid sm:grid-cols-3 gap-3.5 pt-1 text-xs text-slate-600 leading-relaxed">
              <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1 shadow-2xs">
                <span className="font-semibold text-slate-900 font-mono block">1. SBM Scientific Weighting</span>
                <p>
                  Stratified face-to-face sampling across 12 states & FCT covering North-West, North-East, North-Central, South-West, South-East, and South-South. Eliminates digital access bias.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1 shadow-2xs">
                <span className="font-semibold text-slate-900 font-mono block">2. Online Poll Urban Distortion</span>
                <p>
                  Oxford-Metro (69k) has 54.4% of responses in Lagos & Abuja. TMG poll (109k) is self-selected activist advocacy. Neither represents the rural small-town majority.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1 shadow-2xs">
                <span className="font-semibold text-slate-900 font-mono block">3. Turnout Reversal Effect</span>
                <p>
                  September 2026 data shows lower turnout helps NDC urban share; expanding turnout draws in APC rural machines. Two-party margin now moves by only ~6 pts across turnout variations.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

