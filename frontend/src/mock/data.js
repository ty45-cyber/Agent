// src/mock/data.js

import { subMinutes, subHours } from 'date-fns'

const now = new Date()

export const MOCK_AGENTS = [
  {
    id:            'a1000000-0000-0000-0000-000000000001',
    sap_id:        'sap-market-jup-001',
    name:          'MarketSight Alpha',
    agent_type:    'market',
    solana_wallet: 'MktALPHA1111111111111111111111111111111111',
    endpoint_url:  'https://agents.ard.io/market/alpha',
    capabilities:  ['price_analysis', 'volume_trend', 'ohlcv_analysis'],
    is_active:     true,
    last_seen_at:  subMinutes(now, 4).toISOString(),
  },
  {
    id:            'a2000000-0000-0000-0000-000000000002',
    sap_id:        'sap-wallet-jup-001',
    name:          'ChainScope Wallet Intel',
    agent_type:    'wallet',
    solana_wallet: 'WltSCOPE1111111111111111111111111111111111',
    endpoint_url:  'https://agents.ard.io/wallet/chainscope',
    capabilities:  ['whale_tracking', 'wallet_intelligence', 'holder_analysis'],
    is_active:     true,
    last_seen_at:  subMinutes(now, 7).toISOString(),
  },
  {
    id:            'a3000000-0000-0000-0000-000000000003',
    sap_id:        'sap-sentiment-jup-001',
    name:          'PulseRead Sentiment',
    agent_type:    'sentiment',
    solana_wallet: 'SntPULSE1111111111111111111111111111111111',
    endpoint_url:  'https://agents.ard.io/sentiment/pulseread',
    capabilities:  ['news_sentiment', 'social_analysis', 'influencer_signals'],
    is_active:     true,
    last_seen_at:  subMinutes(now, 2).toISOString(),
  },
  {
    id:            'a4000000-0000-0000-0000-000000000004',
    sap_id:        'sap-risk-jup-001',
    name:          'RiskGuard Protocol',
    agent_type:    'risk',
    solana_wallet: 'RskGUARD1111111111111111111111111111111111',
    endpoint_url:  'https://agents.ard.io/risk/riskguard',
    capabilities:  ['contract_audit', 'liquidity_analysis', 'rug_detection'],
    is_active:     true,
    last_seen_at:  subMinutes(now, 11).toISOString(),
  },
  {
    id:            'a5000000-0000-0000-0000-000000000005',
    sap_id:        'sap-market-sol-002',
    name:          'VelocityMkt Node',
    agent_type:    'market',
    solana_wallet: 'VelMKT11111111111111111111111111111111111',
    endpoint_url:  'https://agents.ard.io/market/velocity',
    capabilities:  ['price_analysis', 'volume_trend'],
    is_active:     false,
    last_seen_at:  subHours(now, 3).toISOString(),
  },
]

export const MOCK_REPORTS = [
  {
    id:             'r1000000-0000-0000-0000-000000000001',
    asset:          'JUP',
    cycle_id:       'c1000000-0000-0000-0000-000000000001',
    recommendation: 'BUY',
    confidence:     82,
    summary: `1. EXECUTIVE SUMMARY: Jupiter (JUP) presents a compelling near-term accumulation opportunity. Whale wallets are net-buying, sentiment is broadly positive, and smart contract risk is low. The risk/reward favours entry at current levels.

2. MARKET ANALYSIS: JUP is trading at $1.24 (+4.2% 24h), with volume elevated 1.8x above the 7-day average at $312M. The bullish trend is confirmed by both 24h and 7d momentum. Order book depth is healthy with a 0.18% spread, indicating institutional participation.

3. WALLET INTELLIGENCE: Top-10 holders control 38% of supply — within the healthy 20–60% band. Whale net flow is +$2.4M over 24h, with 14,200 active wallets (above 7d daily average of 11,800). On-chain signals point to quiet accumulation.

4. SENTIMENT ANALYSIS: News sentiment scores 71/100 across 18 qualifying articles. Social mentions total 24,300 with 68% positive bias. Fear/Greed index at 64 (Greed). Top headline: [CoinDesk] Jupiter DEX volumes hit 3-month high ahead of governance vote.

5. RISK ASSESSMENT: Contract audited by OtterSec — zero critical issues. Liquidity at $8.2M across 4 pools (healthy). No insider unlocks within 30 days. Deployer holds 1.2% — negligible risk. Overall risk: LOW (score 14/100).

6. RECOMMENDATION: BUY — strong on-chain accumulation, clean risk profile, and positive sentiment convergence justify a position. Monitor governance vote outcome as a potential catalyst.`,
    raw_findings: {
      market:    { asset: 'JUP', price_usd: 1.24, volume_24h_usd: 312000000, price_change_24h: 4.2, trend: 'bullish', confidence: 82 },
      wallet:    { asset: 'JUP', whales_accumulating: true, top_holders_change: 38.0, wallet_score: 79, active_wallets_24h: 14200 },
      sentiment: { asset: 'JUP', sentiment: 'positive', score: 74, news_count_24h: 18, social_mentions: 24300, top_headline: '[CoinDesk] Jupiter DEX volumes hit 3-month high' },
      risk:      { asset: 'JUP', risk_level: 'low', liquidity_score: 86, rug_risk_score: 14, smart_contract_signals: [] },
    },
    ipfs_cid:       'QmX9kL2mN4pR8sT6vW3yA1bC5dE7fG0hI2jK4lM6nO8p',
    walrus_blob_id: 'walrus-blob-jup-001-abc123',
    created_at:     subMinutes(now, 28).toISOString(),
  },
  {
    id:             'r2000000-0000-0000-0000-000000000002',
    asset:          'SOL',
    cycle_id:       'c1000000-0000-0000-0000-000000000001',
    recommendation: 'HOLD',
    confidence:     61,
    summary: `1. EXECUTIVE SUMMARY: Solana (SOL) shows mixed signals this cycle. Price action is neutral, on-chain activity is healthy, but sentiment has cooled from recent highs. No strong directional conviction.

2. MARKET ANALYSIS: SOL trades at $148.30 (-0.8% 24h), volume at $892M — roughly in line with the 7-day average. No clear trend breakout. The 7d change of +1.2% suggests consolidation after the recent rally.

3. WALLET INTELLIGENCE: Whale net flow is marginally positive at +$340K — inconclusive. Active wallets at 87,400. Top-10 holders control 22% of circulating supply — well distributed.

4. SENTIMENT ANALYSIS: News sentiment is neutral at 52/100. Social mentions at 198,000 with roughly balanced positive/negative split. Fear/Greed at 58 (Neutral leaning Greed).

5. RISK ASSESSMENT: Solana's on-chain risk profile remains exemplary. Fully verified contracts, deep liquidity at $420M, no unlock events. Risk score: 8/100 (LOW).

6. RECOMMENDATION: HOLD — insufficient directional signal to justify adding or reducing exposure. Wait for trend confirmation or sentiment shift.`,
    raw_findings: {
      market:    { asset: 'SOL', price_usd: 148.30, volume_24h_usd: 892000000, price_change_24h: -0.8, trend: 'neutral', confidence: 61 },
      wallet:    { asset: 'SOL', whales_accumulating: true, top_holders_change: 22.0, wallet_score: 71, active_wallets_24h: 87400 },
      sentiment: { asset: 'SOL', sentiment: 'neutral', score: 54, news_count_24h: 44, social_mentions: 198000, top_headline: '[The Block] Solana TVL holds steady at $5.2B amid market consolidation' },
      risk:      { asset: 'SOL', risk_level: 'low', liquidity_score: 92, rug_risk_score: 8, smart_contract_signals: [] },
    },
    ipfs_cid:       'QmY7mK3nP5qS9tU7wX4zA2cD6eF8gH1iJ3kL5mN7oP9q',
    walrus_blob_id: 'walrus-blob-sol-001-def456',
    created_at:     subMinutes(now, 26).toISOString(),
  },
  {
    id:             'r3000000-0000-0000-0000-000000000003',
    asset:          'BONK',
    cycle_id:       'c1000000-0000-0000-0000-000000000001',
    recommendation: 'SELL',
    confidence:     71,
    summary: `1. EXECUTIVE SUMMARY: BONK is showing early distribution signals. Whale wallets are net-selling, liquidity declined 14% in 24h, and sentiment has shifted negative following a major unlock event. Risk profile has deteriorated.

2. MARKET ANALYSIS: BONK trades at $0.0000248 (-6.1% 24h, -12.4% 7d). Volume is 2.3x above average — elevated on a down move, which is bearish. Trend classified as bearish with confidence 71.

3. WALLET INTELLIGENCE: Whale net flow is -$1.8M over 24h — clear distribution. Active wallets declined slightly. Top-10 holders increased concentration by 3.2pp, suggesting retail selling while large holders consolidate.

4. SENTIMENT ANALYSIS: Sentiment score 31/100 (negative). 8,200 social mentions, 61% negative. Fear/Greed at 38 (Fear). Top headline: [Decrypt] BONK sells off as team wallet unlock period begins.

5. RISK ASSESSMENT: Liquidity dropped 14% in 24h — flagged as a rug precursor signal. Deployer still holds 4.8% of supply. No audit on the most recent contract upgrade. Risk score: 58/100 (HIGH).

6. RECOMMENDATION: SELL — converging negative signals across all four analyst dimensions. Exit or reduce exposure.`,
    raw_findings: {
      market:    { asset: 'BONK', price_usd: 0.0000248, volume_24h_usd: 48000000, price_change_24h: -6.1, trend: 'bearish', confidence: 71 },
      wallet:    { asset: 'BONK', whales_accumulating: false, top_holders_change: 3.2, wallet_score: 38, active_wallets_24h: 32100 },
      sentiment: { asset: 'BONK', sentiment: 'negative', score: 31, news_count_24h: 12, social_mentions: 8200, top_headline: '[Decrypt] BONK sells off as team wallet unlock begins' },
      risk:      { asset: 'BONK', risk_level: 'high', liquidity_score: 42, rug_risk_score: 58, smart_contract_signals: ['Liquidity dropped 14% in 24h', 'Deployer holds 4.8% of supply', 'Contract upgrade unaudited'] },
    },
    ipfs_cid:       null,
    walrus_blob_id: null,
    created_at:     subMinutes(now, 24).toISOString(),
  },
  {
    id:             'r4000000-0000-0000-0000-000000000004',
    asset:          'WIF',
    cycle_id:       'c1000000-0000-0000-0000-000000000001',
    recommendation: 'HOLD',
    confidence:     55,
    summary: `1. EXECUTIVE SUMMARY: WIF presents unclear signals. Price is range-bound, sentiment is mixed, and on-chain activity is below average. No strong thesis in either direction.

2. MARKET ANALYSIS: WIF at $2.18 (+0.4% 24h). Volume is 0.7x below the 7-day average — low participation. Neutral trend confirmed by flat 7d performance of +1.1%.

3. WALLET INTELLIGENCE: Whale flow near zero (-$82K). Active wallets at 8,900 — below the 7d daily average. Holder concentration healthy at 29%.

4. SENTIMENT ANALYSIS: Social mentions at 14,700. Sentiment score 50/100 (neutral). Fear/Greed 55. No strong headline catalyst.

5. RISK ASSESSMENT: Contract audited, no critical issues. Liquidity at $3.1M (adequate). No near-term unlocks. Risk score: 22/100 (LOW).

6. RECOMMENDATION: HOLD — insufficient signal for a directional trade. Monitor volume for breakout confirmation.`,
    raw_findings: {
      market:    { asset: 'WIF', price_usd: 2.18, volume_24h_usd: 62000000, price_change_24h: 0.4, trend: 'neutral', confidence: 55 },
      wallet:    { asset: 'WIF', whales_accumulating: false, top_holders_change: 29.0, wallet_score: 58, active_wallets_24h: 8900 },
      sentiment: { asset: 'WIF', sentiment: 'neutral', score: 50, news_count_24h: 9, social_mentions: 14700, top_headline: null },
      risk:      { asset: 'WIF', risk_level: 'low', liquidity_score: 78, rug_risk_score: 22, smart_contract_signals: [] },
    },
    ipfs_cid:       'QmZ8nL4oQ6rT0uV8xY5zA3dE7gI1jK3mN5pR7tV9wX1y',
    walrus_blob_id: null,
    created_at:     subMinutes(now, 22).toISOString(),
  },
  {
    id:             'r5000000-0000-0000-0000-000000000005',
    asset:          'PYTH',
    cycle_id:       'c2000000-0000-0000-0000-000000000002',
    recommendation: 'BUY',
    confidence:     78,
    summary: `1. EXECUTIVE SUMMARY: PYTH shows a high-conviction accumulation setup. Oracle infrastructure demand is rising, whale wallets are adding, and the risk profile is among the cleanest in the tracked universe.

2. MARKET ANALYSIS: PYTH at $0.412 (+5.8% 24h, +11.2% 7d). Volume 1.6x above average. Strong bullish trend confirmation across both timeframes. Spread at 0.22%.

3. WALLET INTELLIGENCE: Whale net flow +$1.1M. Active wallets 19,800 (above 7d average). Top-10 holders at 31% — healthy. Accumulation pattern consistent.

4. SENTIMENT ANALYSIS: Score 68/100 (positive). 11,400 mentions, 72% positive. Fear/Greed 66. Top headline: [Blockworks] Pyth Network integrations surpass 400 protocols.

5. RISK ASSESSMENT: Fully audited by Trail of Bits. Zero issues. Liquidity $12.4M. No unlocks. Risk score: 11/100 (LOW).

6. RECOMMENDATION: BUY — clean risk, strong on-chain accumulation, and positive narrative momentum make this the highest-conviction setup in the current cycle.`,
    raw_findings: {
      market:    { asset: 'PYTH', price_usd: 0.412, volume_24h_usd: 88000000, price_change_24h: 5.8, trend: 'bullish', confidence: 78 },
      wallet:    { asset: 'PYTH', whales_accumulating: true, top_holders_change: 31.0, wallet_score: 81, active_wallets_24h: 19800 },
      sentiment: { asset: 'PYTH', sentiment: 'positive', score: 68, news_count_24h: 22, social_mentions: 11400, top_headline: '[Blockworks] Pyth Network integrations surpass 400 protocols' },
      risk:      { asset: 'PYTH', risk_level: 'low', liquidity_score: 89, rug_risk_score: 11, smart_contract_signals: [] },
    },
    ipfs_cid:       'QmA9oM5pR7sU1vW9yZ6aB4eF8hJ2lN4pR8tV0xY2zA4b',
    walrus_blob_id: 'walrus-blob-pyth-001-ghi789',
    created_at:     subMinutes(now, 18).toISOString(),
  },
]

export const MOCK_STATS = [
  { asset: 'SOL',  report_count: 48 },
  { asset: 'JUP',  report_count: 42 },
  { asset: 'PYTH', report_count: 38 },
  { asset: 'WIF',  report_count: 31 },
  { asset: 'BONK', report_count: 29 },
]

export const MOCK_JOBS = [
  {
    id:                   'j1000000-0000-0000-0000-000000000001',
    agent_id:             'a1000000-0000-0000-0000-000000000001',
    asset:                'JUP',
    status:               'completed',
    escrow_tx_signature:  '3xK9mN2pQ4sT6vW8yA1cE5gI7jL0nP2rU4wX6zA8bD',
    payment_tx_signature: '5zA8bD3xK9mN2pQ4sT6vW8yA1cE5gI7jL0nP2rU4w',
    payment_lamports:     10000000,
    error_message:        null,
    dispatched_at:        subMinutes(now, 35).toISOString(),
    completed_at:         subMinutes(now, 29).toISOString(),
    created_at:           subMinutes(now, 36).toISOString(),
  },
  {
    id:                   'j2000000-0000-0000-0000-000000000002',
    agent_id:             'a2000000-0000-0000-0000-000000000002',
    asset:                'JUP',
    status:               'completed',
    escrow_tx_signature:  '7bE0cF4dG8eH2iJ6kL9mN3oP7qR1sT5uV9wX3yZ7a',
    payment_tx_signature: '9yZ7aB1cD5eF9gH3iJ7kL1mN5oP9qR3sT7uV1wX5y',
    payment_lamports:     10000000,
    error_message:        null,
    dispatched_at:        subMinutes(now, 34).toISOString(),
    completed_at:         subMinutes(now, 28).toISOString(),
    created_at:           subMinutes(now, 35).toISOString(),
  },
]