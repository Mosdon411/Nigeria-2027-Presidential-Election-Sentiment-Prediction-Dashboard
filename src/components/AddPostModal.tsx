import React, { useState } from 'react';
import { analyzeNigerianPoliticalText } from '../utils/nlpEngine';
import { SocialPost, PlatformId, GeopoliticalZoneId } from '../types/election';
import { X, Sparkles, MessageSquare } from 'lucide-react';

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: SocialPost) => void;
}

export const AddPostModal: React.FC<AddPostModalProps> = ({ isOpen, onClose, onAddPost }) => {
  const [platform, setPlatform] = useState<'X' | 'Facebook' | 'Nairaland' | 'TikTok'>('X');
  const [handle, setHandle] = useState('@lagosian_voter');
  const [authorName, setAuthorName] = useState('Abiola Johnson');
  const [zone, setZone] = useState<GeopoliticalZoneId>('SW');
  const [cityState, setCityState] = useState('Ikeja, Lagos');
  const [content, setContent] = useState(
    'This petrol price at N1,370 is still giving us serious shege. Government say e drop by N25, but food prices still dey sky! Obi Kwankwaso need to tell us realistic plans.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const nlp = analyzeNigerianPoliticalText(content);

    const newPost: SocialPost = {
      id: `post-user-${Date.now()}`,
      platform,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      authorName,
      verified: true,
      avatarSeed: handle,
      content,
      englishGloss: nlp.explanation,
      language: nlp.detectedLanguage,
      detectedPidginKeywords: nlp.detectedPidginKeywords.map((k) => k.word),
      candidate: nlp.detectedCandidate,
      sentiment: nlp.sentiment,
      intensityScore: nlp.intensityScore,
      emotion: nlp.dominantEmotion,
      zone,
      cityState,
      timestampMinutesAgo: 1,
      likes: Math.floor(Math.random() * 400) + 50,
      shares: Math.floor(Math.random() * 120) + 10,
      comments: Math.floor(Math.random() * 80) + 5,
      issueTag: content.toLowerCase().includes('petrol') || content.toLowerCase().includes('fuel') ? 'Petrol & Fuel' : 'General',
    };

    onAddPost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Inject Social Media Post</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-600 block mb-1 font-mono font-medium">Platform:</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="X">X (Twitter)</option>
                <option value="Facebook">Facebook</option>
                <option value="Nairaland">Nairaland</option>
                <option value="TikTok">TikTok Comment</option>
              </select>
            </div>

            <div>
              <label className="text-slate-600 block mb-1 font-mono font-medium">Zone / City:</label>
              <select
                value={zone}
                onChange={(e) => {
                  const z = e.target.value as GeopoliticalZoneId;
                  setZone(z);
                  if (z === 'SW') setCityState('Lagos');
                  if (z === 'SE') setCityState('Enugu');
                  if (z === 'SS') setCityState('Port Harcourt');
                  if (z === 'NC') setCityState('Abuja FCT');
                  if (z === 'NW') setCityState('Kano');
                  if (z === 'NE') setCityState('Maiduguri');
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="SW">South-West (SW)</option>
                <option value="SE">South-East (SE)</option>
                <option value="SS">South-South (SS)</option>
                <option value="NC">North-Central (NC)</option>
                <option value="NW">North-West (NW)</option>
                <option value="NE">North-East (NE)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-600 block mb-1 font-mono font-medium">Author Name:</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1 font-mono font-medium">Handle:</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-600 block mb-1 font-mono font-medium">
              Post Content (Test English, Pidgin, or Slang):
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tokenize & Publish to Stream</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
