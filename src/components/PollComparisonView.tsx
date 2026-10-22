import React, { useState } from 'react';
import { POLL_SOURCES, CANDIDATES } from '../data/electionData';
import { PollMethodology } from '../types/election';
import { ShieldCheck, AlertTriangle, HelpCircle, BarChart2, TrendingDown, Users2, FileText, ArrowRight } from 'lucide-react';

export const PollComparisonView: React.FC = () => {
  const [selectedPollIndex, setSelectedPollIndex] = useState(0);
  const activePoll = POLL_SOURCES[selectedPollIndex];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="text-xs uppercase tracking-wider text-emerald-700 font-mono font-semibold mb-1">
          Methodological Verification & Confidence Rating
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Scientific Polling vs. Online Digital Polls
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          National political perception has been warped by competing polling methodologies. 
          SBM Intelligence’s scientific face-to-face tracker (1,103 respondents) shows a decisive but narrowing Obi lead (42.2%), 
          while Oxford-Metro’s digital survey (69,110 responses) reports a dead heat (Tinubu 35.41% vs Obi 33.86%) due to severe Lagos/Abuja urban concentration (54.44%).
        </p>
      </div>

      {/* Side-by-Side Poll Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {POLL_SOURCES.map((poll, idx) => {
          const isSelected = selectedPollIndex === idx;
          const isHigh = poll.confidence === 'High';
          const isMedium = poll.confidence === 'Medium';
          const isLow = poll.confidence === 'Low';

          return (
            <div
              key={poll.sourceName}
              onClick={() => setSelectedPollIndex(idx)}
              className={`border rounded-xl p-5 cursor-pointer transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-white shadow-md ring-1 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Top row with confidence */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 font-mono block">
                    {poll.conductedDate}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                    {poll.sourceName}
                  </h3>
                </div>

                {/* Confidence indicator (clean text + dot, no static pill capsule) */}
                <div className="flex items-center gap-1.5 font-mono text-xs shrink-0">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isHigh
                        ? 'bg-emerald-600'
                        : isMedium
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                  ></span>
                  <span
                    className={
                      isHigh
                        ? 'text-emerald-700 font-semibold'
                        : isMedium
                        ? 'text-amber-700 font-semibold'
                        : 'text-rose-700 font-semibold'
                    }
                  >
                    {poll.confidence} Conf.
                  </span>
                </div>
              </div>

              {/* Sample Size & Sampling Type */}
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1 font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Sample Size:</span>
                  <span className="text-slate-900 font-bold tabular-nums">
                    {poll.sampleSize.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Sampling Frame:</span>
                  <span className="text-slate-800 truncate max-w-[160px]" title={poll.methodologyType}>
                    {poll.methodologyType.split(' ')[0]} {poll.methodologyType.split(' ')[1]}
                  </span>
                </div>
              </div>

              {/* Candidate Scores Bar with Photos */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5 text-xs font-mono">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={CANDIDATES[0].imageUrl}
                        alt="Peter Obi"
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full object-cover object-top border border-emerald-500"
                      />
                      <span className="text-emerald-700 font-semibold">Peter Obi (NDC)</span>
                    </div>
                    <span className="text-slate-900 font-bold tabular-nums">{poll.obiScore}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${poll.obiScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={CANDIDATES[1].imageUrl}
                        alt="Bola Tinubu"
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full object-cover object-top border border-blue-500"
                      />
                      <span className="text-blue-700 font-semibold">Bola Tinubu (APC)</span>
                    </div>
                    <span className="text-slate-900 font-bold tabular-nums">{poll.tinubuScore}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${poll.tinubuScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={CANDIDATES[2].imageUrl}
                        alt="Atiku Abubakar"
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full object-cover object-top border border-amber-500"
                      />
                      <span className="text-amber-700 font-semibold">Atiku Abubakar (ADC)</span>
                    </div>
                    <span className="text-slate-900 font-bold tabular-nums">{poll.atikuScore}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${poll.atikuScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Critical warning snippet */}
              <div className="mt-4 text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-2 line-clamp-2 font-sans">
                {poll.criticalBiasWarning}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Poll In-Depth Audit Panel */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-700 font-semibold">
              AUDIT DOSSIER · {activePoll.confidence.toUpperCase()} CONFIDENCE
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {activePoll.sourceName}
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Conducted: {activePoll.conductedDate} · N={activePoll.sampleSize.toLocaleString()}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Methodology Class</span>
            <span className="text-slate-900 font-semibold mt-1 block">{activePoll.methodologyType}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Urban / Rural Demographic Split</span>
            <span className="text-slate-900 font-semibold mt-1 block">{activePoll.urbanRuralSplit}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Geographic Spread & Weights</span>
            <span className="text-slate-900 font-semibold mt-1 block">{activePoll.geographicSpread}</span>
          </div>
        </div>

        {/* Diagnostic Bias Warning */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs leading-relaxed space-y-1.5 font-sans">
          <div className="flex items-center gap-2 text-amber-800 font-bold font-mono">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>CRITICAL METHODOLOGICAL TAKEAWAY</span>
          </div>
          <p className="text-slate-700">
            {activePoll.criticalBiasWarning}
          </p>
        </div>

        {/* Turnout Sensitivity Note */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-xs text-slate-600 space-y-2 leading-relaxed font-sans">
          <span className="font-semibold text-slate-900 font-mono block">
            Electoral Dynamics: The Turnout Shift (May 2026 vs. September 2026)
          </span>
          <p>
            In SBM’s May 2026 baseline wave, higher voter turnout dramatically boosted NDC support (from 31.7% to 64.9%). 
            By the September wave, that structural relationship reversed: expanding the electorate now mobilizes rural voters from zones that have shifted toward the incumbent APC. 
            Across the entire plausible turnout spectrum (28% to 60%), the two-party margin moves by merely ~6 percentage points today, compared to 30 points previously.
          </p>
        </div>
      </div>

      {/* Candidate Age & Field Structure Matrix */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 shadow-xs">
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          INEC Final List Field Structure (September 11, 2026 Confirmation)
        </h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed font-sans">
          The election structure features 18 certified parties. The opposition remains split between the NDC and ADC platforms, granting the APC a unified incumbency advantage.
        </p>

        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs bg-white">
          <table className="w-full text-left font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-3">Candidate</th>
                <th className="p-3">Party</th>
                <th className="p-3">Age</th>
                <th className="p-3">Running Mate</th>
                <th className="p-3">Mate Age</th>
                <th className="p-3">Net Favorability</th>
                <th className="p-3">Primary Bastion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <img
                      src={CANDIDATES[0].imageUrl}
                      alt="Peter Obi"
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover object-top border border-emerald-500 shadow-2xs"
                    />
                    <span>Peter Obi</span>
                  </div>
                </td>
                <td className="p-3 text-emerald-700 font-bold">NDC</td>
                <td className="p-3 text-slate-700">65</td>
                <td className="p-3 text-slate-700">Rabiu Musa Kwankwaso</td>
                <td className="p-3 text-slate-500">69</td>
                <td className="p-3 text-emerald-700 font-bold">+52.8</td>
                <td className="p-3 text-slate-600">South-East, South-South, Urban Youths</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <img
                      src={CANDIDATES[1].imageUrl}
                      alt="Bola Tinubu"
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover object-top border border-blue-500 shadow-2xs"
                    />
                    <span>Bola Ahmed Tinubu</span>
                  </div>
                </td>
                <td className="p-3 text-blue-700 font-bold">APC</td>
                <td className="p-3 text-slate-700">74</td>
                <td className="p-3 text-slate-700">Kashim Shettima</td>
                <td className="p-3 text-slate-500">59</td>
                <td className="p-3 text-rose-700 font-bold">-3.3</td>
                <td className="p-3 text-slate-600">South-West, Rural North, 22 Governors</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <img
                      src={CANDIDATES[2].imageUrl}
                      alt="Atiku Abubakar"
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover object-top border border-amber-500 shadow-2xs"
                    />
                    <span>Atiku Abubakar</span>
                  </div>
                </td>
                <td className="p-3 text-amber-700 font-bold">ADC</td>
                <td className="p-3 text-slate-700">79</td>
                <td className="p-3 text-slate-700">Rotimi Amaechi</td>
                <td className="p-3 text-slate-500">61</td>
                <td className="p-3 text-emerald-700 font-bold">+12.4</td>
                <td className="p-3 text-slate-600">North-East, Northern Commercial Elite</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
