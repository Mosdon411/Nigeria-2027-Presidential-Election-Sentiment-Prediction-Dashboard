import { NIGERIAN_PIDGIN_DICTIONARY } from '../data/electionData';
import { CandidateId, EmotionType, SentimentPolarity } from '../types/election';

export interface NlpAnalysisResult {
  text: string;
  detectedLanguage: 'English' | 'Nigerian Pidgin' | 'Mixed';
  detectedPidginKeywords: {
    word: string;
    definition: string;
    weight: number;
    emotion: string;
  }[];
  polarityScore: number; // -1.0 (very negative) to +1.0 (very positive)
  sentiment: SentimentPolarity;
  intensityScore: number; // 1 to 5
  dominantEmotion: EmotionType;
  detectedCandidate: CandidateId | 'all';
  isSatirical: boolean;
  confidenceScore: number; // 0 to 100%
  explanation: string;
}

export function analyzeNigerianPoliticalText(rawText: string): NlpAnalysisResult {
  const lowerText = rawText.toLowerCase();

  // 1. Detect candidate mentions
  let detectedCandidate: CandidateId | 'all' = 'all';
  const obiMatches = lowerText.match(/\b(peter\s*obi|obi|kwankwaso|ndc|labour|obidient|datti)\b/g);
  const tinubuMatches = lowerText.match(/\b(tinubu|asiwaju|shettima|apc|jagaban|bat|emilokan)\b/g);
  const atikuMatches = lowerText.match(/\b(atiku|abubakar|amaechi|adc|waziri|turaki)\b/g);

  const obiCount = obiMatches ? obiMatches.length : 0;
  const tinubuCount = tinubuMatches ? tinubuMatches.length : 0;
  const atikuCount = atikuMatches ? atikuMatches.length : 0;

  if (obiCount > tinubuCount && obiCount > atikuCount) {
    detectedCandidate = 'peter-obi';
  } else if (tinubuCount > obiCount && tinubuCount > atikuCount) {
    detectedCandidate = 'bola-tinubu';
  } else if (atikuCount > obiCount && atikuCount > tinubuCount) {
    detectedCandidate = 'atiku-abubakar';
  } else {
    detectedCandidate = 'all';
  }

  // 2. Pidgin and Slang keyword matching
  const detectedPidginKeywords: {
    word: string;
    definition: string;
    weight: number;
    emotion: string;
  }[] = [];

  let pidginCount = 0;
  let pidginSentimentSum = 0;

  for (const [phrase, info] of Object.entries(NIGERIAN_PIDGIN_DICTIONARY)) {
    if (lowerText.includes(phrase)) {
      detectedPidginKeywords.push({
        word: phrase,
        definition: info.definition,
        weight: info.sentimentWeight,
        emotion: info.emotion,
      });
      pidginCount++;
      pidginSentimentSum += info.sentimentWeight;
    }
  }

  // Check common grammatical markers of Nigerian Pidgin
  const pidginMarkers = ['dey', 'na', 'abeg', 'una', 'wetin', 'sef', 'sha', 'fit', 'am', 'dem', 'abi', 'don'];
  let markerCount = 0;
  for (const marker of pidginMarkers) {
    const regex = new RegExp(`\\b${marker}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) {
      markerCount += matches.length;
    }
  }

  let detectedLanguage: 'English' | 'Nigerian Pidgin' | 'Mixed' = 'English';
  if (pidginCount >= 2 || markerCount >= 3) {
    detectedLanguage = 'Nigerian Pidgin';
  } else if (pidginCount >= 1 || markerCount >= 1) {
    detectedLanguage = 'Mixed';
  }

  // 3. Baseline English political sentiment words
  const positiveWords = ['lead', 'strong', 'growth', 'rebound', 'hope', 'victory', 'transparent', 'solution', 'support', 'win', 'relief', 'deliver', 'electric', 'progress'];
  const negativeWords = ['crisis', 'inflation', 'suffer', 'hardship', 'fail', 'reject', 'corrupt', 'banditry', 'expensive', 'drop', 'deficit', 'pain', 'worst', 'rig', 'fraud', 'shatter'];
  const satiricalWords = ['spiritual father', 'dey play', 'cup', 'skit', 'joke', 'miracle', 'clown', 'stories'];

  let positiveScore = 0;
  let negativeScore = 0;

  positiveWords.forEach(w => {
    if (lowerText.includes(w)) positiveScore += 0.4;
  });
  negativeWords.forEach(w => {
    if (lowerText.includes(w)) negativeScore += 0.45;
  });

  // Calculate composite polarity
  let netPolarity = (positiveScore - negativeScore);
  if (pidginCount > 0) {
    netPolarity += (pidginSentimentSum / pidginCount) * 0.8;
  }

  // Normalize between -1.0 and 1.0
  const clampedPolarity = Math.max(-1.0, Math.min(1.0, Number(netPolarity.toFixed(2))));

  // Satire check
  const isSatirical = satiricalWords.some(w => lowerText.includes(w)) || (lowerText.includes('😂') || lowerText.includes('laugh'));

  // Determine Emotion
  let dominantEmotion: EmotionType = 'Disappointment';
  if (isSatirical) {
    dominantEmotion = 'Satire';
  } else if (clampedPolarity > 0.3) {
    dominantEmotion = 'Hope';
  } else if (clampedPolarity < -0.4 && (lowerText.includes('shege') || lowerText.includes('petrol') || lowerText.includes('hardship') || lowerText.includes('anger') || lowerText.includes('pro max'))) {
    dominantEmotion = 'Anger';
  } else if (lowerText.includes('wahala') || lowerText.includes('security') || lowerText.includes('fail') || lowerText.includes('rig') || lowerText.includes('fear')) {
    dominantEmotion = 'Fear';
  } else {
    dominantEmotion = clampedPolarity < 0 ? 'Disappointment' : 'Hope';
  }

  // Determine Sentiment Polarity
  let sentiment: SentimentPolarity = 'Neutral';
  if (clampedPolarity >= 0.25) {
    sentiment = 'Positive';
  } else if (clampedPolarity <= -0.25) {
    sentiment = 'Negative';
  } else if (positiveScore > 0.3 && negativeScore > 0.3) {
    sentiment = 'Polarized';
  }

  // Intensity score 1 to 5
  const intensity = Math.min(5, Math.max(1, Math.round(Math.abs(clampedPolarity) * 3 + (pidginCount > 0 ? 1.5 : 1))));

  // Confidence estimation based on length and matched features
  const wordsLength = rawText.trim().split(/\s+/).length;
  const confidenceScore = Math.min(96, Math.max(68, 70 + (pidginCount * 5) + Math.min(15, wordsLength)));

  let explanation = '';
  if (detectedLanguage === 'Nigerian Pidgin') {
    explanation = `Captured Pidgin expressions (${detectedPidginKeywords.map(k => k.word).join(', ') || 'idiomatic syntax'}) indicating ${dominantEmotion.toLowerCase()} tone with ${intensity}/5 intensity.`;
  } else if (detectedLanguage === 'Mixed') {
    explanation = `Hybrid English-Pidgin discourse detected. Contextualized political sentiment score: ${clampedPolarity > 0 ? '+' : ''}${clampedPolarity}.`;
  } else {
    explanation = `Standard English syntax parsed with domain political lexicon. Polarity: ${clampedPolarity > 0 ? '+' : ''}${clampedPolarity}.`;
  }

  return {
    text: rawText,
    detectedLanguage,
    detectedPidginKeywords,
    polarityScore: clampedPolarity,
    sentiment,
    intensityScore: intensity,
    dominantEmotion,
    detectedCandidate,
    isSatirical,
    confidenceScore,
    explanation,
  };
}
