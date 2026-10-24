import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2 } from 'lucide-react';
import { CANDIDATES, POLL_SOURCES, ECONOMIC_ISSUES } from '../data/electionData';

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRateCard?: () => void;
}

export const BriefingModal: React.FC<BriefingModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenRateCard 
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Executive Electoral Intelligence Briefing (Sept 2026)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable/Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 font-mono leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <div className="text-emerald-700 font-bold text-sm">
              NIGERIA 2027 PRESIDENTIAL RACE: SBM WAVE 2 MEMORANDUM
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5">
              Source: Voter Sentiment Tracker (N=1,103 across 12 States + FCT)
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-xs">1. Executive Summary</h4>
            <p>
              Peter Obi (NDC) maintains a scientific plurality at 42.2%, but his margin over Bola Tinubu (APC, 25.5%) has collapsed from 46.1 points in May 2026 to 16.7 points in September. 
              The race is now defined as competitive, not a landslide.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-xs">2. The Urban-Rural Inversion</h4>
            <p>
              Urban voters favor NDC 49.5% vs APC 20.9%. Conversely, rural voters back the incumbent APC 35.2% vs NDC 27.6%. 
              Because rural wards predominate across the North-West and South-West interior, aggregated national figures over-report opposition strength.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-xs">3. Petrol Deregulation Vulnerability</h4>
            <p>
              Petrol is the administration’s most toxic liability, rated 1.69/4.0 with 67.4% disapproval. 
              It is the primary concern in the South-West (30.5%) and South-South (29.1%), directly threatening traditional APC strongholds.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-xs">4. Polling Methodology Warning</h4>
            <p>
              Digital online surveys (Oxford-Metro 69k / TMG 109k) suffer from structural self-selection and severe Lagos/Abuja urban concentration (54.4%). 
              Online sentiment does not equate to rural precinct ballots (the 2023 Precedent Rule).
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="text-slate-900 font-bold block text-xs uppercase tracking-wider font-mono">
              INEC Certified Candidate Slate (Confirmed Sept 11, 2026):
            </span>
            <div className="grid sm:grid-cols-3 gap-3">
              {CANDIDATES.map((cand) => (
                <div
                  key={cand.id}
                  className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2.5 shadow-2xs"
                >
                  <img
                    src={cand.imageUrl}
                    alt={cand.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover object-top border shrink-0"
                    style={{ borderColor: cand.color }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900 truncate text-[11px]">{cand.name}</span>
                      <span
                        className="px-1 py-0.2 rounded text-[9px] font-bold text-white shrink-0"
                        style={{ backgroundColor: cand.color }}
                      >
                        {cand.party}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      VP: {cand.runningMate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <span>Verified with INEC Form EC8B filings</span>
              <div className="flex items-center gap-3">
                {onOpenRateCard && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenRateCard();
                    }}
                    className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Enterprise Rate Card (PDF) →</span>
                  </button>
                )}
                <a
                  href="mailto:mosesakaaza@gmail.com?subject=Enterprise%20Election%20Intel%20Briefing%20Inquiry"
                  className="text-slate-700 hover:underline font-semibold"
                >
                  Contact Moses Akaaza →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">Classification: Unrestricted Strategic Brief</span>
          <div className="flex items-center gap-2">
            {onOpenRateCard && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRateCard();
                }}
                className="px-3.5 py-1.5 rounded bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center gap-1.5 transition-colors font-semibold"
              >
                <span>Enterprise Rate Card</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
