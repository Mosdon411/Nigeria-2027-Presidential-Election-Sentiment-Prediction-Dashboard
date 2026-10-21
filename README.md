# NaijaPulse 2027 🇳🇬
### Nigeria 2027 Presidential Election Sentiment & Prediction Intelligence Dashboard

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

An advanced electoral intelligence dashboard tracking real-time audience engagement, multi-platform social media sentiment, scientific vs. digital polling divergences, urban-rural geopolitical dynamics, and constitutional scenario simulations for Nigeria's 2027 Presidential Election.

---

## 📌 Executive Summary

Based on the September 2026 intelligence wave and polling data, Nigeria's 2027 presidential race exhibits a **"three-way contest with a tightening margin"**:

- **Peter Obi (NDC)** maintains a scientific polling plurality (**42.2%**), but his lead over the incumbent has narrowed from a 46.1-point advantage in May (57.4%) to 16.7 points in September.
- **Bola Ahmed Tinubu (APC)** has rebounded from ~11% to **25.5%**, underpinned by entrenched rural grassroots machinery and softening inflation indicators.
- **Atiku Abubakar (ADC)** maintains strong digital enthusiasm (**73.6%** in online opt-in surveys like TMG), but faces critical urban/smartphone sample selection biases.
- **Urban vs. Rural Polarization**: In urban hubs, NDC leads APC **49.5% to 20.9%**; in rural and small-town wards, APC leads NDC **35.2% to 27.6%**. National aggregates without geographic disaggregation produce misleading averages.
- **Economic Referendum Factor**: Petrol deregulation remains the single most decisive policy issue (rated **1.69 / 4.0** with **67.4% voter rejection**).

---

## 🚀 Key Features

### 1. Multi-Platform Social Sentiment Stream & Live Ingestion
- **Continuous Cross-Platform Monitoring**: Ingests discourse from **X (Twitter)**, **Facebook**, **Nairaland**, and **TikTok Comments**.
- **Audience Velocity & Engagement Metrics**: Tracks viral retweets, reply-to-retweet ratios, sentiment polarity, and emotional intensity (anger, hope, frustration, satirical irony).
- **Interactive Post Injection**: Test user-generated posts in real time to witness instant classification and live stream updates.

### 2. Nigerian Pidgin & Multilingual NLP Engine
- **Culturally Grounded Tokenizer**: Handles Nigerian informal political discourse, mixed languages (English, Pidgin, Yoruba, Hausa, Igbo loanwords), and irony.
- **Slang & Idiom Normalization**: Classifies high-frequency tokens including:
  - *“dey”* (aspect marker), *“shege”* (extreme hardship/disapproval), *“sapa”* (economic destitution).
  - *“spiritual father”* (political godfatherism), *“wahala”* (trouble), *“e choke”* (overwhelming event).
- **Sub-Text Explanation & Translation**: Automatically translates colloquial Pidgin political commentary into standard analytical English with sentiment confidence scores.

### 3. Scientific vs. Digital Polling Audit
- **Methodological Confidence Framework**:
  - 🟢 **High Confidence (Scientific Probability Sampling)**: Exemplified by the **SBM Intelligence Voter Sentiment Tracker** ($N=1,103$ face-to-face across 12 representative states and the FCT across all 6 geopolitical zones).
  - 🟡 **Medium Confidence (Digital Opt-In Polling)**: Exemplified by **Oxford-Metro Analytics** ($N=69,110$). High volume but concentrated heavily in smartphone-connected urban centers (54.4% in Lagos and Abuja FCT).
  - 🔴 **Low / Indicative (Activist & Online Straw Polls)**: Exemplified by the **TMG Online Poll** ($N=109,240$) and raw social media metrics, subject to echo chambers and self-selection bias.
- **The 2023 Precedent Rule (Governor Uba Sani Caution)**: Prevents equating viral social media sentiment with physical voter mobilization at polling units in rural precincts.

### 4. 6 Geopolitical Zones & Constitutional Geometry
- **Zone-by-Zone Breakdown**: South-West (SW), South-East (SE), South-South (SS), North-Central (NC), North-West (NW), and North-East (NE).
- **The 25% Constitutional Rule Tracker**: Evaluates whether a candidate meets the Nigerian constitutional threshold:
  $$\text{Highest Nationwide Votes} \quad \text{AND} \quad \ge 25\% \text{ of votes in at least 24 of 36 States} + \text{FCT}$$
- Identifies critical battleground states (Lagos, Kano, Rivers, Kaduna, Oyo, Benue, Plateau).

### 5. Petrol & Macroeconomic Salience Barometer
- **Fuel Price Volatility Index**: Correlates real-time pump price data (e.g. MRS Abuja benchmark at ₦1,370/L) with candidate net favorability curves.
- **Sector Issue Priority**: Compares citizen rejection and government performance scores on Petrol, Electricity Tariffs, National Security, and Food Inflation.

### 6. 2027 Scenario Forecaster (Monte Carlo Simulation Engine)
- Adjust variables and test real-time electoral impacts:
  - **National Voter Turnout Rate** (25% to 65% — testing whether lower turnout contracts or expands rural machine politics).
  - **Urban vs. Rural Mobilization Shifts**.
  - **Petrol Price Range** (₦1,100 to ₦1,850/L).
  - **Opposition Coalition Dynamics** (Divided Opposition vs. Joint NDC-ADC Ticket vs. Electoral Endorsement Pact).
  - **INEC Institutional Credibility Factor**.
- Projects whether the result yields an **Outright First-Round Victor** or triggers a **Mandatory Constitutional Run-Off**.

### 7. Executive Intelligence Briefing
- One-click print-ready memorandum export for campaign managers, policy analysts, journalists, and researchers.

---

## 🛠️ Architecture & Tech Stack

```
                          ┌─────────────────────────────────────┐
                          │     Multi-Platform Data Sources     │
                          │   (X, Facebook, Nairaland, TikTok)  │
                          └──────────────────┬──────────────────┘
                                             │
                                             ▼
                          ┌─────────────────────────────────────┐
                          │   Nigerian Pidgin NLP & Tokenizer   │
                          │     (/src/utils/nlpEngine.ts)       │
                          └──────────────────┬──────────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
          ┌──────────────────────────┐               ┌──────────────────────────┐
          │   Sentiment & Polarity   │               │   Scientific Polling     │
          │   Categorization Engine  │               │   (SBM Intelligence Wave)│
          └────────────┬─────────────┘               └─────────────┬────────────┘
                       │                                           │
                       └─────────────────────┬─────────────────────┘
                                             │
                                             ▼
                          ┌─────────────────────────────────────┐
                          │      2027 Electoral Simulator       │
                          │  (Turnout, Fuel, Zones, Coalitions) │
                          │   (/src/utils/simulatorEngine.ts)   │
                          └──────────────────┬──────────────────┘
                                             │
                                             ▼
                          ┌─────────────────────────────────────┐
                          │    Clean High-Contrast React UI     │
                          │   (Vite + Tailwind CSS v4 + Motion) │
                          └─────────────────────────────────────┘
```

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";` theme architecture)
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion v12)
- **Design Standard**: High-density SaaS dashboard, WCAG AA compliance, zero-pill typographic discipline, clean white theme.

---

## 📁 Repository Structure

```
.
├── index.html                  # HTML entry point with meta tags & Google Fonts
├── metadata.json               # Application metadata and capabilities
├── package.json                # Dependencies and build scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite + Tailwind configuration
├── src/
│   ├── main.tsx                # React application entry point
│   ├── App.tsx                 # Top-level application container & navigation
│   ├── index.css               # Global CSS & Tailwind theme tokens
│   ├── types/
│   │   └── election.ts         # TypeScript definitions (Candidates, Polls, Posts, Zones)
│   ├── data/
│   │   └── electionData.ts     # Baseline polling, candidate profiles & Pidgin dictionary
│   ├── utils/
│   │   ├── nlpEngine.ts        # Nigerian Pidgin NLP & sentiment classifier
│   │   └── simulatorEngine.ts  # 2027 Electoral simulation & constitutional logic
│   └── components/
│       ├── TopNav.tsx              # Header navigation & quick simulation action
│       ├── MethodologyAlert.tsx    # Visual Confidence Level legend & sampling audit
│       ├── OverviewView.tsx        # Executive KPIs, candidate profiles & urban-rural split
│       ├── SocialStreamView.tsx    # Multi-platform post feed & interactive NLP sandbox
│       ├── PollComparisonView.tsx  # Scientific (SBM) vs digital poll comparisons
│       ├── GeopoliticalZonesView.tsx # 6 geopolitical zones & 36-state battlegrounds
│       ├── EconomicIssuesView.tsx  # Petrol prices & macroeconomic issue radar
│       ├── ForecasterView.tsx      # Scenario simulation controls & run-off projection
│       ├── AddPostModal.tsx        # Custom social post creation & testing modal
│       ├── BriefingModal.tsx       # Printable executive intelligence report
│       └── CandidateModal.tsx      # Comprehensive candidate dossier & policy stances
└── README.md
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm`, `pnpm`, or `bun`

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nigeria-2027-election-sentiment.git
   cd nigeria-2027-election-sentiment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional):
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

5. **Typecheck & Lint**:
   ```bash
   npm run lint
   ```

6. **Build for Production**:
   ```bash
   npm run build
   ```
   The production-ready output will be generated in the `dist/` directory.

---

## 🔬 Data Sources & Methodological Grounding

1. **SBM Intelligence**: *Voter Sentiment Tracker* (Wave 2, September 2026). Face-to-face scientific probability survey of 1,103 respondents across 12 states plus the Federal Capital Territory (FCT).
2. **Oxford-Metro Analytics**: Digital survey of 69,110 opt-in participants, capturing urban, smartphone-connected demographic opinions.
3. **TMG Online Poll**: 109,240 online participants, tracked as an activist indicator with noted self-selection bias.
4. **Independent National Electoral Commission (INEC)**: Official guidelines, geopolitical zone compositions, and the 1999 Constitution of the Federal Republic of Nigeria (Section 133/134 presidential election thresholds).
5. **Macroeconomic Benchmarks**: National Bureau of Statistics (NBS) inflation trackers and regional pump price reports across NNPC, MRS, and independent petroleum marketers.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/pidgin-vocabulary-expansion`).
3. Commit your changes (`git commit -m 'feat: Add Niger Delta regional slang terms'`).
4. Push to the branch (`git push origin feature/pidgin-vocabulary-expansion`).
5. Open a Pull Request.

---

## 📄 License & Disclaimer

This project is licensed under the **Apache-2.0 License**.

> **Disclaimer**: This application is built for research, academic analysis, and civic technological demonstration. Projections generated by the scenario simulator are mathematical models based on polling data and theoretical voting weightings; they do not constitute official election outcomes. Official election results are determined exclusively by the Independent National Electoral Commission (INEC).
