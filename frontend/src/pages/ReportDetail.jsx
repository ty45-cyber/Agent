// src/pages/ReportDetail.jsx

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { api } from '../api/client.js'
import RecommendationBadge from '../components/RecommendationBadge.jsx'
import RiskBadge from '../components/RiskBadge.jsx'
import ConfidenceBar from '../components/ConfidenceBar.jsx'

export default function ReportDetail() {
  const { id } = useParams()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    api.getReport(id)
      .then(setReport)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div style={centeredMsg}>LOADING REPORT...</div>
  if (error)   return <div style={{ ...centeredMsg, color: 'var(--sell)' }}>ERROR: {error}</div>
  if (!report) return null

  const m = report.raw_findings?.market    || {}
  const w = report.raw_findings?.wallet    || {}
  const s = report.raw_findings?.sentiment || {}
  const r = report.raw_findings?.risk      || {}

  return (
    <div style={styles.page}>
      {/* ── Breadcrumb ── */}
      <div style={styles.breadcrumb} className="fade-up">
        <Link to="/" style={styles.backLink}>← REPORTS</Link>
        <span style={styles.breadSep}>/</span>
        <span style={{ color: 'var(--text-secondary)' }}>{report.asset}</span>
      </div>

      {/* ── Header ── */}
      <div style={styles.header} className="fade-up fade-up-1">
        <div style={styles.headerLeft}>
          <h1 style={styles.assetTitle}>{report.asset}</h1>
          <div style={styles.headerBadges}>
            <RecommendationBadge value={report.recommendation} large />
            <RiskBadge value={r.risk_level} />
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.confidenceBlock}>
            <span style={styles.confLabel}>CONFIDENCE</span>
            <span style={styles.confValue}>{report.confidence}%</span>
            <ConfidenceBar value={report.confidence} showLabel={false} />
          </div>
          <div style={styles.metaBlock}>
            <div style={styles.metaRow}>
              <span style={styles.metaKey}>CYCLE</span>
              <span style={styles.metaVal}>{report.cycle_id.slice(0, 8)}…</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaKey}>PUBLISHED</span>
              <span style={styles.metaVal}>{format(new Date(report.created_at), 'dd MMM yyyy HH:mm')}</span>
            </div>
            {report.ipfs_cid && (
              <div style={styles.metaRow}>
                <span style={styles.metaKey}>IPFS</span>
                <span style={{ ...styles.metaVal, color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                  {report.ipfs_cid.slice(0, 20)}…
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Signal grid ── */}
      <div style={styles.signalGrid} className="fade-up fade-up-2">
        <SignalCard label="PRICE" value={`$${m.price_usd < 0.01 ? m.price_usd?.toFixed(8) : m.price_usd?.toFixed(4)}`}
          sub={`${m.price_change_24h >= 0 ? '+' : ''}${m.price_change_24h?.toFixed(2)}% 24h`}
          subColor={m.price_change_24h >= 0 ? 'var(--buy)' : 'var(--sell)'} />
        <SignalCard label="VOLUME 24H" value={formatUSD(m.volume_24h_usd)}
          sub={`TREND: ${(m.trend || 'N/A').toUpperCase()}`}
          subColor={m.trend === 'bullish' ? 'var(--buy)' : m.trend === 'bearish' ? 'var(--sell)' : 'var(--text-dim)'} />
        <SignalCard label="WHALES" value={w.whales_accumulating ? 'ACCUMULATING' : 'DISTRIBUTING'}
          sub={`${w.active_wallets_24h?.toLocaleString()} active wallets`}
          valueColor={w.whales_accumulating ? 'var(--buy)' : 'var(--sell)'}
          subColor="var(--text-dim)" />
        <SignalCard label="SENTIMENT" value={`${s.score}/100`}
          sub={`${s.social_mentions?.toLocaleString()} mentions · ${(s.sentiment || '').toUpperCase()}`}
          subColor={s.sentiment === 'positive' ? 'var(--buy)' : s.sentiment === 'negative' ? 'var(--sell)' : 'var(--text-dim)'} />
        <SignalCard label="LIQUIDITY" value={`${r.liquidity_score}/100`}
          sub={`RUG RISK: ${r.rug_risk_score}/100`}
          subColor={r.rug_risk_score > 50 ? 'var(--sell)' : r.rug_risk_score > 25 ? 'var(--hold)' : 'var(--buy)'} />
        <SignalCard label="WALLET SCORE" value={`${w.wallet_score}/100`}
          sub={`TOP-10: ${w.top_holders_change?.toFixed(1)}% of supply`}
          subColor="var(--text-dim)" />
      </div>

      {/* ── Report body ── */}
      <div style={styles.reportBody} className="fade-up fade-up-3">
        <div style={styles.sectionLabel}>FULL REPORT</div>
        <div style={styles.summaryText}>
          {report.summary.split('\n\n').map((para, i) => (
            <p key={i} style={styles.summaryPara}>{para}</p>
          ))}
        </div>
      </div>

      {/* ── Risk signals ── */}
      {r.smart_contract_signals?.length > 0 && (
        <div style={styles.riskSignalsCard} className="fade-up fade-up-4">
          <div style={styles.sectionLabel}>SMART CONTRACT SIGNALS</div>
          <div style={styles.signalsList}>
            {r.smart_contract_signals.map((sig, i) => (
              <div key={i} style={styles.signalItem}>
                <span style={styles.signalBullet}>⚠</span>
                <span>{sig}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Top headline ── */}
      {s.top_headline && (
        <div style={styles.headlineCard} className="fade-up fade-up-5">
          <div style={styles.sectionLabel}>TOP HEADLINE</div>
          <p style={styles.headlineText}>{s.top_headline}</p>
        </div>
      )}
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SignalCard({ label, value, sub, valueColor = 'var(--text-primary)', subColor = 'var(--text-dim)' }) {
  return (
    <div style={sigStyles.card}>
      <div style={sigStyles.label}>{label}</div>
      <div style={{ ...sigStyles.value, color: valueColor }}>{value}</div>
      <div style={{ ...sigStyles.sub, color: subColor }}>{sub}</div>
    </div>
  )
}

const sigStyles = {
  card:  { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 18px' },
  label: { fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-dim)', marginBottom: '8px' },
  value: { fontSize: '17px', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '4px' },
  sub:   { fontSize: '10px', letterSpacing: '0.06em' },
}

function formatUSD(n) {
  if (!n) return '$0'
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`
  return `$${n}`
}

const centeredMsg = { padding: '80px 0', textAlign: 'center', color: 'var(--text-dim)', fontSize: '11px', letterSpacing: '0.2em' }

const styles = {
  page:        { maxWidth: '960px' },
  breadcrumb:  { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '11px', letterSpacing: '0.1em' },
  backLink:    { color: 'var(--text-dim)', textDecoration: 'none', transition: 'color 0.15s' },
  breadSep:    { color: 'var(--text-dim)' },

  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '24px' },
  headerLeft:  { display: 'flex', flexDirection: 'column', gap: '12px' },
  assetTitle:  { fontSize: '42px', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.02em' },
  headerBadges:{ display: 'flex', gap: '10px', alignItems: 'center' },
  headerRight: { display: 'flex', gap: '20px', alignItems: 'flex-start' },

  confidenceBlock: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px 18px', minWidth: '140px' },
  confLabel:       { fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' },
  confValue:       { fontSize: '28px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)', display: 'block', marginBottom: '8px' },

  metaBlock: { display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' },
  metaRow:   { display: 'flex', gap: '10px', alignItems: 'center' },
  metaKey:   { fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-dim)', minWidth: '70px' },
  metaVal:   { fontSize: '11px', color: 'var(--text-secondary)' },

  signalGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' },

  reportBody:  { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '16px' },
  sectionLabel:{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '16px' },
  summaryText: { display: 'flex', flexDirection: 'column', gap: '14px' },
  summaryPara: { lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '13px' },

  riskSignalsCard: { background: 'var(--sell-bg)', border: '1px solid var(--sell)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: '16px' },
  signalsList:     { display: 'flex', flexDirection: 'column', gap: '8px' },
  signalItem:      { display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--sell)', fontSize: '12px' },
  signalBullet:    { flexShrink: 0, marginTop: '1px' },

  headlineCard: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '18px 24px' },
  headlineText: { color: 'var(--text-primary)', fontSize: '13px', lineHeight: '1.7', fontStyle: 'italic' },
}