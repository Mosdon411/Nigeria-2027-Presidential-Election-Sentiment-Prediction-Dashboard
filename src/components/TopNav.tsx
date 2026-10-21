import React from 'react';
import { Download, Sliders, ShieldAlert } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSimulate: () => void;
  onOpenBriefing: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSimulate,
  onOpenBriefing,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'social-stream', label: 'Live Social & Pidgin NLP' },
    { id: 'polls', label: 'Scientific vs Online Polls' },
    { id: 'zones', label: '6 Geopolitical Zones' },
    { id: 'petrol', label: 'Petrol & Economy Watch' },
    { id: 'forecaster', label: '2027 Scenario Forecaster' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single wordmark in display style */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
            }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 hover:text-emerald-700 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block shadow-[0_0_8px_rgba(5,150,105,0.4)]"></span>
            <span>NaijaPulse 2027</span>
          </a>
          <span className="hidden sm:inline-block text-xs text-slate-500 font-mono">
            v2.6·SEPT
          </span>
        </div>

        {/* Zone 2: 4-6 text navigation items with single-line controls */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSimulate}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulate Race</span>
          </button>
          <button
            onClick={onOpenBriefing}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Intel Brief</span>
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pt-3 pb-1 border-t border-slate-200 mt-2.5 no-scrollbar text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === item.id
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-medium'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
