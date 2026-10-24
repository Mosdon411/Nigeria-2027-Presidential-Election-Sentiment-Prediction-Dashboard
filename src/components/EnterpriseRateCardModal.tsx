import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Database, 
  Layers, 
  Copy, 
  Check, 
  ExternalLink,
  Award,
  Zap,
  Globe2,
  PhoneCall
} from 'lucide-react';

interface EnterpriseRateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterpriseRateCardModal: React.FC<EnterpriseRateCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('mosesakaaza@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rates = {
    tier1: {
      usd: '$3,500',
      ngn: '₦5,250,000',
      period: '/ month',
    },
    tier2: {
      usd: '$9,500',
      ngn: '₦14,250,000',
      period: '/ month',
    },
    tier3: {
      usd: '$24,000',
      ngn: '₦36,000,000',
      period: '/ quarter',
    },
    addons: {
      flashPoll: { usd: '$2,800', ngn: '₦4,200,000' },
      stateAudit: { usd: '$4,500', ngn: '₦6,750,000' },
      focusGroup: { usd: '$3,200', ngn: '₦4,800,000' },
      nlpFeed: { usd: '$1,900/mo', ngn: '₦2,850,000/mo' },
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      {/* Modal Wrapper */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-4 print:my-0 print:border-none print:shadow-none print:rounded-none print:bg-white print:max-w-none">
        
        {/* Top Control Bar (Screen only, hidden in print) */}
        <div className="no-print bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-white tracking-wide">
              Executive Briefing • Commercial Rate Card 2026/2027
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/80">
              STRICT 1-PAGE A4 FORMAT
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  currency === 'USD'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('NGN')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  currency === 'NGN'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                NGN (₦)
              </button>
            </div>

            {/* Email Contact */}
            <button
              type="button"
              onClick={copyEmail}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Copy Moses Akaaza direct email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">mosesakaaza@gmail.com</span>
              <span className="sm:hidden">{copied ? 'Copied' : 'Email'}</span>
            </button>

            {/* Print / Save PDF Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF (A4)</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable 1-Page A4 Sheet Canvas */}
        <div className="bg-slate-900/60 p-2 sm:p-6 flex justify-center print:p-0 print:bg-white overflow-x-auto">
          <div 
            id="enterprise-rate-card-print-target"
            className="w-full max-w-[210mm] bg-white text-slate-900 shadow-2xl print:shadow-none print:w-full print:max-w-none p-5 sm:p-6 print:p-4 text-[10.5px] leading-tight flex flex-col justify-between border border-slate-200 print:border-none"
            style={{ minHeight: '290mm' }}
          >
            {/* 1. DOCUMENT HEADER */}
            <div className="border-b-2 border-slate-900 pb-3 mb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-sm bg-emerald-700 inline-block shadow-xs"></span>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase font-sans">
                      NaijaPulse 2027
                    </h1>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      INTELLIGENCE SYNDICATE
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                    COMMERCIAL RATE CARD & ENTERPRISE ADVISORY ONE-PAGER
                  </p>
                  <p className="text-[9.5px] text-slate-600 font-mono">
                    Empirical Ground Sampling (774 LGAs) • Transformer Pidgin NLP • Constitutional 25% Rule Forecaster
                  </p>
                </div>

                <div className="text-right font-mono text-[9px] text-slate-600 space-y-0.5 shrink-0 bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="font-bold text-slate-900">DOC ID: NP-ENT-2027-RC</div>
                  <div>ISSUE DATE: OCT 2026 – Q1 2027</div>
                  <div className="text-emerald-700 font-semibold">SECURITY: CONFIDENTIAL / COMMERCIAL</div>
                  <div className="text-slate-800 font-semibold">DIRECT CONTACT: MOSES AKAAZA</div>
                </div>
              </div>
            </div>

            {/* 2. THE NAIJAPULSE COMPETITIVE EDGE (CORE CAPABILITIES) */}
            <div className="mb-3">
              <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>1. Core Intelligence Advantage: The Empirical Ground Truth</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 text-[10.5px] flex items-center gap-1">
                    <Database className="w-3 h-3 text-emerald-700 shrink-0" />
                    774 LGA Stratification
                  </div>
                  <p className="text-[8.5px] text-slate-600 mt-1 leading-snug">
                    Probability-proportional-to-size (PPS) sampling across all 36 States + FCT. Eliminates urban Lagos/Abuja internet bias.
                  </p>
                </div>

                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 text-[10.5px] flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-700 shrink-0" />
                    Pidgin NLP Transformer
                  </div>
                  <p className="text-[8.5px] text-slate-600 mt-1 leading-snug">
                    Real-time conversational sentiment audits across Nigerian Pidgin, Hausa, Yoruba, and street slang across 25,000+ daily signals.
                  </p>
                </div>

                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 text-[10.5px] flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-emerald-700 shrink-0" />
                    25% Constitutional Rule
                  </div>
                  <p className="text-[8.5px] text-slate-600 mt-1 leading-snug">
                    Monte Carlo engine simulating the Section 134(2) threshold: 24 of 36 States + FCT viability with 50,000 iteration runs.
                  </p>
                </div>

                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 text-[10.5px] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-700 shrink-0" />
                    The 2023 Precedent Rule
                  </div>
                  <p className="text-[8.5px] text-slate-600 mt-1 leading-snug">
                    Corrects for the Urban-Rural Inversion (Urban NDC 49.5% vs. Rural APC 35.2%), protecting campaigns from hollow digital echoes.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. COMMERCIAL RATE CARD (3 TIERED PACKAGES) */}
            <div className="mb-3">
              <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider font-mono mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  2. Enterprise Subscription Tiers & Deliverables Matrix
                </span>
                <span className="text-[9px] text-slate-500 font-normal">
                  Active Currency: <strong className="text-slate-800">{currency}</strong>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                
                {/* TIER 1: DIPLOMATIC & INSTITUTIONAL */}
                <div className="border border-slate-200 rounded-lg p-2.5 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        TIER 1 • MONITORING
                      </span>
                      <span className="text-[8.5px] font-mono text-slate-500">1 Seat</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs">Diplomatic & Institutional</h3>
                    <p className="text-[8.5px] text-slate-500 mb-2">For Embassies, Sovereign Funds, Risk Desks</p>
                    
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-200 mb-2">
                      <div className="text-base font-black text-slate-900">
                        {currency === 'USD' ? rates.tier1.usd : rates.tier1.ngn}
                        <span className="text-[9px] font-normal text-slate-500 font-mono ml-1">{rates.tier1.period}</span>
                      </div>
                      <div className="text-[8px] text-slate-500 font-mono">Billed monthly or annually (15% disc)</div>
                    </div>

                    <ul className="space-y-1 text-[8.5px] text-slate-700">
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span>Monthly Geopolitical Stability Index & Zone Risk Maps</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span>SBM Wave Raw Microdata Extracts (CSV/JSON API feed)</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span>Petrol & Inflation Vulnerability Barometer by Zone</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span>Bi-weekly Executive PDF Intelligence Briefings</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[8px] text-slate-500 font-mono">
                    SLA: Standard 48-hr research inquiry response
                  </div>
                </div>

                {/* TIER 2: PRESIDENTIAL WAR ROOM (FLAGSHIP) */}
                <div className="border-2 border-emerald-700 rounded-lg p-2.5 bg-emerald-50/30 flex flex-col justify-between relative shadow-xs">
                  <div className="absolute -top-2 right-3 bg-emerald-700 text-white text-[8px] font-bold font-mono px-1.5 py-0.2 rounded-sm shadow-xs uppercase">
                    Most Popular
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        TIER 2 • WAR ROOM
                      </span>
                      <span className="text-[8.5px] font-mono text-emerald-800 font-bold">5 Seats</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs">Presidential War Room</h3>
                    <p className="text-[8.5px] text-slate-600 mb-2">For Front-Runner Campaigns & National Parties</p>
                    
                    <div className="bg-white p-1.5 rounded border border-emerald-300 mb-2">
                      <div className="text-base font-black text-emerald-900">
                        {currency === 'USD' ? rates.tier2.usd : rates.tier2.ngn}
                        <span className="text-[9px] font-normal text-slate-600 font-mono ml-1">{rates.tier2.period}</span>
                      </div>
                      <div className="text-[8px] text-emerald-700 font-mono">Full interactive portal + live sandbox</div>
                    </div>

                    <ul className="space-y-1 text-[8.5px] text-slate-800">
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span><strong>Weekly 774-LGA Trend Tracking:</strong> Battleground swing tracker</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span><strong>Real-time Pidgin NLP Feed:</strong> 25k daily conversational signals</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span><strong>Scenario Forecaster Sandbox:</strong> Turnout shocks & coalition models</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span><strong>One (1) Emergency Flash Poll / Quarter:</strong> 48-hr crisis readout</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span>Dedicated direct WhatsApp / Signal bridge with Moses Akaaza</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2 pt-2 border-t border-emerald-200 text-[8px] text-emerald-800 font-mono font-medium">
                    SLA: Priority 6-hr analyst turnaround • 24/7 War Room hotline
                  </div>
                </div>

                {/* TIER 3: SOVEREIGN BESPOKE MASTER PLAN */}
                <div className="border border-slate-200 rounded-lg p-2.5 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        TIER 3 • SOVEREIGN BESPOKE
                      </span>
                      <span className="text-[8.5px] font-mono text-slate-500">Unlimited</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs">Sovereign Master Campaign</h3>
                    <p className="text-[8.5px] text-slate-500 mb-2">For Candidate Principals & State Governors</p>
                    
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-200 mb-2">
                      <div className="text-base font-black text-slate-900">
                        {currency === 'USD' ? rates.tier3.usd : rates.tier3.ngn}
                        <span className="text-[9px] font-normal text-slate-500 font-mono ml-1">{rates.tier3.period}</span>
                      </div>
                      <div className="text-[8px] text-slate-500 font-mono">Comprehensive advisory & custom field operations</div>
                    </div>

                    <ul className="space-y-1 text-[8.5px] text-slate-700">
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span><strong>Full CAPI/CATI Ground Survey:</strong> N=5,000 stratified sample</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span><strong>Ward Micro-Targeting Playbooks:</strong> Tailored for all 6 Zones</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span><strong>Opponent Vulnerability Playbook:</strong> Policy & counter-narrative ops</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span>In-person War Room Briefings in Abuja & Lagos by Lead Analysts</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[8px] text-slate-500 font-mono">
                    SLA: Immediate 1-hr principal line • Dedicated intelligence cell
                  </div>
                </div>

              </div>
            </div>

            {/* 4. AD-HOC FIELD ENGAGEMENTS & SPECIAL AUDITS */}
            <div className="mb-3">
              <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                <span>3. Ad-Hoc Deployments & Tactical Add-Ons</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[9.5px] text-slate-900">48-Hr Crisis Flash Poll</span>
                    <span className="font-mono font-bold text-[9px] text-emerald-800">
                      {currency === 'USD' ? rates.addons.flashPoll.usd : rates.addons.flashPoll.ngn}
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-600 mt-1 leading-snug">
                    Rapid N=1,000 telephone audit across battleground zones within 48h of major gaffes, scandals, or policy changes.
                  </p>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[9.5px] text-slate-900">Single-State LGA Audit</span>
                    <span className="font-mono font-bold text-[9px] text-emerald-800">
                      {currency === 'USD' ? rates.addons.stateAudit.usd : rates.addons.stateAudit.ngn}
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-600 mt-1 leading-snug">
                    Deep-dive ward-by-ward field census in any critical swing state (e.g. Kano, Rivers, Lagos, Kaduna, Plateau).
                  </p>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[9.5px] text-slate-900">Message Testing Lab</span>
                    <span className="font-mono font-bold text-[9px] text-emerald-800">
                      {currency === 'USD' ? rates.addons.focusGroup.usd : rates.addons.focusGroup.ngn}
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-600 mt-1 leading-snug">
                    Qualitative voter focus groups (hybrid virtual & field) to pre-test campaign slogans, speeches, and ad scripts.
                  </p>
                </div>

                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[9.5px] text-slate-900">Dedicated NLP Stream</span>
                    <span className="font-mono font-bold text-[9px] text-emerald-800">
                      {currency === 'USD' ? rates.addons.nlpFeed.usd : rates.addons.nlpFeed.ngn}
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-600 mt-1 leading-snug">
                    Custom webhooks feeding real-time localized dialect sentiments into your campaign’s internal dashboards.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. METHODOLOGICAL STANDARDS & COMPLIANCE BADGE */}
            <div className="bg-slate-900 text-white p-2.5 rounded-lg mb-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-[10px] tracking-wide text-white">
                    METHODOLOGICAL INTEGRITY & COMPLIANCE PROTOCOLS
                  </div>
                  <div className="text-[8.5px] text-slate-300">
                    Fully compliant with ESOMAR & WAPOR electoral research ethics • Encrypted multi-tenant data isolation • NDPR compliant.
                  </div>
                </div>
              </div>
              <div className="text-right font-mono text-[8px] text-slate-300 border-l border-slate-700 pl-3 shrink-0">
                <div>PRECEDENT: 2023 RECALIBRATION RULE</div>
                <div className="text-emerald-400 font-bold">100% INDEPENDENT SYNDICATE</div>
              </div>
            </div>

            {/* 6. AUTHORIZATION, LEAD CONTACT & RFP SUBMISSION */}
            <div className="border-t-2 border-slate-900 pt-2.5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                    Commercial Director & Principal Analyst:
                  </div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>Moses Akaaza</span>
                    <span className="text-[9px] font-mono font-normal text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                      Lead Intelligence Specialist
                    </span>
                  </div>
                  <div className="text-[9.5px] text-slate-700 font-mono flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-emerald-700">
                      <Mail className="w-3 h-3 text-emerald-700" />
                      mosesakaaza@gmail.com
                    </span>
                    <span>•</span>
                    <span>Abuja (FCT) & Lagos, Nigeria</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <a
                    href="mailto:mosesakaaza@gmail.com?subject=Enterprise%20NaijaPulse%202027%20Intelligence%20Engagement%20RFP&body=Dear%20Moses%20Akaaza,%0A%0AWe%20are%20reviewing%20the%20NaijaPulse%202027%20Commercial%20Rate%20Card.%20Please%20schedule%20a%20confidential%20executive%20briefing%20regarding%20the%20following%20tier/services:%0A%0A-%20Desired%20Tier:%20[Diplomatic%20/%20War%20Room%20/%20Sovereign%20Master%20Plan]%0A-%20Organization%20/%20Campaign:%0A-%20Timeline:%0A%0ABest%20regards,"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors no-print"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Initiate Campaign Engagement →</span>
                  </a>
                  <div className="text-[8px] font-mono text-slate-500 mt-1">
                    Confidential onboarding within 24 hours of retainer execution.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Note (Screen only) */}
        <div className="no-print bg-slate-950 px-6 py-2.5 text-center text-xs text-slate-400 font-mono border-t border-slate-800 flex items-center justify-between">
          <span>Tip: Click "Print / Save PDF (A4)" and choose "Save as PDF" for the executive 1-page presentation.</span>
          <span className="text-emerald-400">Strict Single-Page Fit Guaranteed</span>
        </div>

      </div>
    </div>
  );
};
