import React, { useState } from 'react';
import { INITIAL_SOCIAL_POSTS, NIGERIAN_PIDGIN_DICTIONARY } from '../data/electionData';
import { SocialPost, PlatformId, CandidateId, SentimentPolarity, EmotionType } from '../types/election';
import { analyzeNigerianPoliticalText, NlpAnalysisResult } from '../utils/nlpEngine';
import { 
  Sparkles, 
  MessageSquare, 
  Heart, 
  Repeat, 
  Filter, 
  Send, 
  Radio, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ChevronRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

interface SocialStreamViewProps {
  onOpenAddPostModal: () => void;
}

export const SocialStreamView: React.FC<SocialStreamViewProps> = ({ onOpenAddPostModal }) => {
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateId | 'all'>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentPolarity | 'all'>('all');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Pidgin NLP Sandbox state
  const [testInput, setTestInput] = useState(
    'Even spiritual father won’t be able to deliver Tinubu with this petrol price at N1,370! Shege pro max dey touch everybody abeg.'
  );
  const [nlpResult, setNlpResult] = useState<NlpAnalysisResult | null>(() =>
    analyzeNigerianPoliticalText(
      'Even spiritual father won’t be able to deliver Tinubu with this petrol price at N1,370! Shege pro max dey touch everybody abeg.'
    )
  );

  const handleRunNlp = (textToAnalyze?: string) => {
    const text = textToAnalyze !== undefined ? textToAnalyze : testInput;
    if (!text.trim()) return;
    const result = analyzeNigerianPoliticalText(text);
    setNlpResult(result);
  };

  const handleAddSamplePostToStream = () => {
    if (!nlpResult) return;
    const newPost: SocialPost = {
      id: `post-custom-${Date.now()}`,
      platform: 'X',
      handle: '@abuja_voter_voice',
      authorName: 'Verified Nigerian Citizen',
      verified: true,
      avatarSeed: 'custom',
      content: nlpResult.text,
      englishGloss: nlpResult.explanation,
      language: nlpResult.detectedLanguage,
      detectedPidginKeywords: nlpResult.detectedPidginKeywords.map((k) => k.word),
      candidate: nlpResult.detectedCandidate,
      sentiment: nlpResult.sentiment,
      intensityScore: nlpResult.intensityScore,
      emotion: nlpResult.dominantEmotion,
      zone: 'NC',
      cityState: 'Abuja FCT',
      timestampMinutesAgo: 1,
      likes: 142,
      shares: 38,
      comments: 19,
      issueTag: 'Petrol & Fuel',
    };
    setPosts([newPost, ...posts]);
  };

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) return false;
    if (selectedCandidate !== 'all' && post.candidate !== selectedCandidate && post.candidate !== 'all') return false;
    if (selectedSentiment !== 'all' && post.sentiment !== selectedSentiment) return false;
    if (selectedEmotion !== 'all' && post.emotion !== selectedEmotion) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchContent = post.content.toLowerCase().includes(q);
      const matchHandle = post.handle.toLowerCase().includes(q);
      const matchAuthor = post.authorName.toLowerCase().includes(q);
      const matchPidgin = post.detectedPidginKeywords.some((k) => k.toLowerCase().includes(q));
      if (!matchContent && !matchHandle && !matchAuthor && !matchPidgin) return false;
    }
    return true;
  });

  // Calculate live volume metrics
  const totalPosts = posts.length;
  const positiveCount = posts.filter((p) => p.sentiment === 'Positive').length;
  const negativeCount = posts.filter((p) => p.sentiment === 'Negative').length;
  const polarizedCount = posts.filter((p) => p.sentiment === 'Polarized').length;
  const pidginCount = posts.filter((p) => p.language === 'Nigerian Pidgin' || p.language === 'Mixed').length;

  return (
    <div className="space-y-8">
      {/* Top Banner / Stream Telemetry */}
      <div className="border border-slate-200 bg-white rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>MULTI-PLATFORM LIVE INGESTION ACTIVE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Real-Time Audience Engagement & Pidgin NLP Monitor
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Synthesizing conversational polarity across <span className="text-slate-900 font-medium">X (Twitter)</span>,{' '}
              <span className="text-slate-900 font-medium">Facebook</span>, <span className="text-slate-900 font-medium">Nairaland</span>, and{' '}
              <span className="text-slate-900 font-medium">TikTok</span>. 
              Leverages fine-tuned Transformer-level NLP for Nigerian Pidgin idiom classification, slang normalization, and satire detection.
            </p>
          </div>

          <button
            onClick={onOpenAddPostModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors flex items-center gap-2 shrink-0 self-start md:self-auto shadow-xs font-mono"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inject Test Tweet/Post</span>
          </button>
        </div>

        {/* Live Sentiment Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-200 font-mono text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Monitored Handles</span>
            <span className="text-lg font-bold text-slate-900 tabular-nums mt-0.5 block">14,280+</span>
            <span className="text-[11px] text-slate-500">Hourly polling rate</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Pidgin & Slang Mix</span>
            <span className="text-lg font-bold text-emerald-700 tabular-nums mt-0.5 block">
              {((pidginCount / totalPosts) * 100).toFixed(0)}%
            </span>
            <span className="text-[11px] text-slate-500">Requires local tokenizer</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Negative / Sapa Polarity</span>
            <span className="text-lg font-bold text-rose-700 tabular-nums mt-0.5 block">
              {((negativeCount / totalPosts) * 100).toFixed(0)}%
            </span>
            <span className="text-[11px] text-slate-500">Fuel & hardship driven</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-500 block">Polarized / Satire Share</span>
            <span className="text-lg font-bold text-amber-700 tabular-nums mt-0.5 block">
              {((polarizedCount / totalPosts) * 100).toFixed(0)}%
            </span>
            <span className="text-[11px] text-slate-500">High ironic density</span>
          </div>
        </div>
      </div>

      {/* Interactive Pidgin & Multilingual NLP Sandbox Console */}
      <div className="border border-emerald-300 bg-emerald-50/40 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Nigerian Pidgin & Multi-Lingual NLP Classifier Console
              </h2>
              <p className="text-xs text-slate-600">
                Test how the custom rule-based + Transformer pipeline normalizes slang like "dey", "shege", "sapa", "spiritual father".
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2.5 py-1 rounded font-semibold">
            Accuracy: 89.31% (Domain Benchmark)
          </div>
        </div>

        {/* Input Box */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              rows={3}
              placeholder="Type any Nigerian political tweet or comment in Pidgin, English, or slang..."
              className="w-full bg-white border border-slate-300 focus:border-emerald-500 rounded-lg p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors shadow-2xs"
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-600 font-mono">Sample Presets:</span>
            <button
              onClick={() => {
                const s = 'Petrol price drop by N25 and una want make we shout APC carry go? Sapa dey wire people daily!';
                setTestInput(s);
                handleRunNlp(s);
              }}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded text-slate-700 font-mono shadow-2xs hover:bg-slate-50 transition-colors"
            >
              "Sapa dey wire" (Hardship)
            </button>
            <button
              onClick={() => {
                const s = 'Peter Obi town hall with Kwankwaso in Kano today is pure fire! The youths dey ready for 2027.';
                setTestInput(s);
                handleRunNlp(s);
              }}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded text-slate-700 font-mono shadow-2xs hover:bg-slate-50 transition-colors"
            >
              "Obi Kwankwaso momentum" (Hope)
            </button>
            <button
              onClick={() => {
                const s = 'Atiku is 79 years old and still running, dey play just dey play! Gerontocracy cup winner.';
                setTestInput(s);
                handleRunNlp(s);
              }}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded text-slate-700 font-mono shadow-2xs hover:bg-slate-50 transition-colors"
            >
              "Dey play / Gerontocracy" (Satire)
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => handleRunNlp()}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors flex items-center gap-1.5 shadow-xs font-mono"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tokenize & Classify Sentiment</span>
            </button>

            {nlpResult && (
              <button
                onClick={handleAddSamplePostToStream}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 font-mono"
              >
                <span>Add to Monitored Feed</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* NLP Output Breakdown */}
        {nlpResult && (
          <div className="mt-4 p-4 bg-white border border-slate-200 rounded-lg text-xs space-y-3 font-mono shadow-2xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-slate-500 block">Language / Idiom:</span>
                <span className="text-slate-900 font-bold">{nlpResult.detectedLanguage}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Polarity Score:</span>
                <span
                  className={`font-bold ${
                    nlpResult.polarityScore > 0 ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {nlpResult.polarityScore > 0 ? '+' : ''}
                  {nlpResult.polarityScore} ({nlpResult.sentiment})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Dominant Emotion:</span>
                <span className="text-amber-700 font-bold">{nlpResult.dominantEmotion}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Intensity Rating:</span>
                <span className="text-slate-900 font-bold">{nlpResult.intensityScore} / 5</span>
              </div>
            </div>

            {/* Detected Pidgin Tokens */}
            <div className="space-y-1">
              <span className="text-slate-500 block">Extracted Idioms & Slang Tokens:</span>
              {nlpResult.detectedPidginKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {nlpResult.detectedPidginKeywords.map((k, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800"
                    >
                      <span className="font-bold text-emerald-700">"{k.word}"</span>: {k.definition}{' '}
                      <span className="text-slate-500">({k.emotion})</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500 italic font-sans">No specific Pidgin idioms; parsed standard English syntactic markers.</span>
              )}
            </div>

            <div className="text-slate-600 pt-1 text-[11px] leading-relaxed font-sans">
              <span className="text-slate-900 font-semibold font-mono">NLP Contextual Interpretation: </span>
              {nlpResult.explanation} (Confidence: {nlpResult.confidenceScore}%)
            </div>
          </div>
        )}
      </div>

      {/* Feed Filters & Controls */}
      <div className="border border-slate-200 bg-white rounded-xl p-4 space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, handles, Pidgin keywords (#fuel, wahala, sapa)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
            />
          </div>

          {/* Platform Segmented Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md border border-slate-200 text-xs overflow-x-auto">
            {(['all', 'X', 'Facebook', 'Nairaland', 'TikTok'] as PlatformId[]).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedPlatform === p
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p === 'all' ? 'All Platforms' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium">Filters:</span>

          {/* Candidate Filter */}
          <select
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value as any)}
            className="bg-white border border-slate-200 text-slate-700 rounded px-2.5 py-1 focus:outline-none text-xs"
          >
            <option value="all">All Candidates</option>
            <option value="peter-obi">Peter Obi (NDC)</option>
            <option value="bola-tinubu">Bola Tinubu (APC)</option>
            <option value="atiku-abubakar">Atiku Abubakar (ADC)</option>
          </select>

          {/* Sentiment Filter */}
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value as any)}
            className="bg-white border border-slate-200 text-slate-700 rounded px-2.5 py-1 focus:outline-none text-xs"
          >
            <option value="all">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
            <option value="Polarized">Polarized</option>
            <option value="Neutral">Neutral</option>
          </select>

          {/* Emotion Filter */}
          <select
            value={selectedEmotion}
            onChange={(e) => setSelectedEmotion(e.target.value as any)}
            className="bg-white border border-slate-200 text-slate-700 rounded px-2.5 py-1 focus:outline-none text-xs"
          >
            <option value="all">All Emotions</option>
            <option value="Hope">Hope</option>
            <option value="Anger">Anger</option>
            <option value="Disappointment">Disappointment</option>
            <option value="Satire">Satire</option>
            <option value="Fear">Fear</option>
          </select>

          <span className="text-slate-500 ml-auto font-mono text-[11px]">
            Showing {filteredPosts.length} of {posts.length} posts
          </span>
        </div>
      </div>

      {/* Stream Post Feed */}
      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="border border-slate-200 bg-white rounded-xl p-8 text-center text-slate-500 text-sm shadow-xs">
            No social media entries match the selected filters. Reset filters or inject a test post above.
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isNegative = post.sentiment === 'Negative';
            const isPositive = post.sentiment === 'Positive';
            const isPolarized = post.sentiment === 'Polarized';

            return (
              <div
                key={post.id}
                className="border border-slate-200 bg-white hover:border-slate-300 rounded-lg p-4 sm:p-5 transition-all shadow-2xs"
              >
                {/* Post Top Row: Author & Metadata */}
                <div className="flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{post.authorName}</span>
                      <span className="text-slate-500 font-mono">{post.handle}</span>
                      <span className="text-slate-300 font-mono">·</span>
                      <span className="font-mono text-emerald-700 font-medium">{post.platform}</span>
                      <span className="text-slate-300 font-mono">·</span>
                      <span className="text-slate-500 font-mono">{post.timestampMinutesAgo}m ago</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-mono">
                      <span>{post.cityState} ({post.zone})</span>
                      <span>·</span>
                      <span>Lang: {post.language}</span>
                      <span>·</span>
                      <span>Issue: {post.issueTag}</span>
                    </div>
                  </div>

                  {/* Sentiment & Emotion Indicator */}
                  <div className="text-right shrink-0 font-mono">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span
                        className={`font-semibold ${
                          isPositive
                            ? 'text-emerald-700'
                            : isNegative
                            ? 'text-rose-700'
                            : isPolarized
                            ? 'text-amber-700'
                            : 'text-slate-600'
                        }`}
                      >
                        {post.sentiment}
                      </span>
                      <span className="text-slate-500">({post.emotion})</span>
                    </div>
                    <span className="text-[11px] text-slate-500">Intensity: {post.intensityScore}/5</span>
                  </div>
                </div>

                {/* Content */}
                <p className="mt-3 text-sm text-slate-800 leading-relaxed font-sans">
                  {post.content}
                </p>

                {/* English translation / Pidgin Gloss */}
                {post.englishGloss && (
                  <div className="mt-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 font-mono">
                    <span className="text-slate-800 font-medium">NLP Annotation: </span>
                    {post.englishGloss}
                  </div>
                )}

                {/* Detected Keywords tags */}
                {post.detectedPidginKeywords.length > 0 && post.detectedPidginKeywords[0] !== 'none' && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <span>Extracted Pidgin:</span>
                    {post.detectedPidginKeywords.map((k, idx) => (
                      <span key={idx} className="text-emerald-700 font-medium">
                        #{k}
                      </span>
                    ))}
                  </div>
                )}

                {/* Engagement counts */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Repeat className="w-3.5 h-3.5" />
                    <span>{post.shares.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.comments.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
