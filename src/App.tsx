import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { MethodologyAlert } from './components/MethodologyAlert';
import { OverviewView } from './components/OverviewView';
import { SocialStreamView } from './components/SocialStreamView';
import { PollComparisonView } from './components/PollComparisonView';
import { GeopoliticalZonesView } from './components/GeopoliticalZonesView';
import { EconomicIssuesView } from './components/EconomicIssuesView';
import { ForecasterView } from './components/ForecasterView';
import { AddPostModal } from './components/AddPostModal';
import { BriefingModal } from './components/BriefingModal';
import { CandidateModal } from './components/CandidateModal';
import { SimulateRaceModal } from './components/SimulateRaceModal';
import { EnterpriseRateCardModal } from './components/EnterpriseRateCardModal';
import { CandidateId, SocialPost } from './types/election';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
  const [isRateCardModalOpen, setIsRateCardModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<CandidateId | null>(null);

  const handleOpenSimulate = () => {
    setIsSimulateModalOpen(true);
  };

  const handleSelectCandidate = (candidateId: CandidateId) => {
    setSelectedCandidateId(candidateId);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Strict 3-zone Top Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSimulate={handleOpenSimulate}
        onOpenBriefing={() => setIsBriefingModalOpen(true)}
        onOpenRateCard={() => setIsRateCardModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Universal Methodological Alert Banner */}
        <MethodologyAlert />

        {/* Dynamic Tab Switcher */}
        {activeTab === 'overview' && (
          <OverviewView
            onSelectCandidate={handleSelectCandidate}
            onNavigateTab={setActiveTab}
            onOpenRateCard={() => setIsRateCardModalOpen(true)}
          />
        )}

        {activeTab === 'social-stream' && (
          <SocialStreamView onOpenAddPostModal={() => setIsAddPostModalOpen(true)} />
        )}

        {activeTab === 'polls' && <PollComparisonView />}

        {activeTab === 'zones' && <GeopoliticalZonesView />}

        {activeTab === 'petrol' && <EconomicIssuesView />}

        {activeTab === 'forecaster' && <ForecasterView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-slate-700">NaijaPulse 2027 Intelligence Engine</span>
            <span>·</span>
            <span>Independent Electoral Research Syndicate</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>SBM Wave 2 Baseline</span>
            <span>·</span>
            <span>INEC 18-Party Slate</span>
            <span>·</span>
            <span>Transformer Pidgin NLP Pipeline</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <AddPostModal
        isOpen={isAddPostModalOpen}
        onClose={() => setIsAddPostModalOpen(false)}
        onAddPost={(newPost: SocialPost) => {
          // If user injects post, switch to social stream tab so they see it immediately
          setActiveTab('social-stream');
        }}
      />

      <BriefingModal
        isOpen={isBriefingModalOpen}
        onClose={() => setIsBriefingModalOpen(false)}
        onOpenRateCard={() => setIsRateCardModalOpen(true)}
      />

      <EnterpriseRateCardModal
        isOpen={isRateCardModalOpen}
        onClose={() => setIsRateCardModalOpen(false)}
      />

      <CandidateModal
        candidateId={selectedCandidateId}
        onClose={() => setSelectedCandidateId(null)}
      />

      <SimulateRaceModal
        isOpen={isSimulateModalOpen}
        onClose={() => setIsSimulateModalOpen(false)}
        onOpenFullStudio={() => {
          setIsSimulateModalOpen(false);
          setActiveTab('forecaster');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
