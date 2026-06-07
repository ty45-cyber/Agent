// src/pages/Dashboard.jsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { api } from '../api/client.js'
import RecommendationBadge from '../components/RecommendationBadge.jsx'
import ConfidenceBar from '../components/ConfidenceBar.jsx'
import RiskBadge from '../components/RiskBadge.jsx'

export default function Dashboard() {
  const [reports, setReports]   = useState([])
  const [stats, setStats]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    Promise.all([api.getReports(20), api.getReportStats()])
      .then(([r, s]) => { setReports(r); setStats(s) })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState />
  if (error)   return <ErrorState message={error} />

  const buyCount  = reports.filter((r) => r.recommendation === 'BUY').length
  const sellCount = reports.filter((r) => r.recommendation === 'SELL').length
  const avgConf   = reports.length
    ? Math.round(reports.reduce((a, r) => a + r.confidence, 0) / reports.length)
    : 0

  return (
    <div>
      {/* ── Page header ── */}
      <div style={styles.pageHeader} className="fade-up">
        <div>
          <h1 style={styles.pageTitle}>Intelligence Feed</h1>
          <p style={styles.pageSubtitle}>
            Autonomous reports · {reports.length} cycles processed
          </p>
        </div>
        <div style={styles.headerMeta}>
          <span style={styles.metaTag}>SOLANA MAINNET</span>
          <span style={styles.metaTag}>5 ASSETS</span>
        </div>
      </div>

      {/* ── Signal summary bar ── */}
      <div style={styles.signalBar} className="fade-up fade-up-1">
        {[
          { label: 'BUY SIGNALS',     value: buyCount,  color: 'var(--buy)'  },
          { label: 'SELL SIGNALS',    value: sellCount, color: 'var(--sell)' },
          { label: 'AVG CONFIDENCE',  value: `${avgConf}%`, color: 'var(--accent)' },
          { label: 'REPORTS TODAY',   value: reports.length, color: 'var(--text-primary)' },
        ].map(({ label, value, color }) => (
          <div key={label} style={styles.signalCell}>
            <span style={{ ...styles.signalValue, color }}>{value}</span>
            <span style={styles.signalLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div style={styles.grid}>
        {/* Reports table */}
        <div style={{ ...styles.card, gridColumn: 'span 2' }} className="fade-up fade-up-2">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>LATEST REPORTS</span>
            <span style={styles.cardMeta}>{reports.length} entries</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                {['ASSET', 'SIGNAL', 'CONFIDENCE', 'RISK', 'MARKET', 'PUBLISHED'].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr
                  key={r.id}
                  style={styles.tr}
                  className={`fade-up fade-up-${Math.min(i + 1, 5)}`}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-raised)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={styles.td}>
                    <Link to={`/reports/${r.id}`} style={styles.assetLink}>
                      <span style={styles.assetTicker}>{r.asset}</span>
                    </Link>
                  </td>
                  <td style={styles.td}>
                    <RecommendationBadge value={r.recommendation} />
                  </td>
                  <td style={{ ...styles.td, width: '140px' }}>
                    <ConfidenceBar value={r.confidence} />
                  </td>
                  <td style={styles.td}>
                    <RiskBadge value={r.raw_findings?.risk?.risk_level || 'medium'} />
                  </td>
                  <td style={styles.td}>
                    <div style={styles.marketCell}>
                      <span style={{
                        color: r.raw_findings?.market?.price_change_24h >= 0
                          ? 'var(--buy)' : 'var(--sell)',
                        fontWeight: 600,
                      }}>
                        {r.raw_findings?.market?.price_change_24h >= 0 ? '+' : ''}
                        {r.raw_findings?.market?.price_change_24h?.toFixed(1)}%
                      </span>
                      <span style={styles.priceTag}>
                        ${r.raw_findings?.market?.price_usd < 0.01
                          ? r.raw_findings?.market?.price_usd?.toFixed(8)
                          : r.raw_findings?.market?.price_usd?.toFixed(3)}
                      </span>
                    </div>
                  </td>
                  <td style={{ ...styles.td, color: 'var(--text-dim)' }}>
                    {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Asset stats panel */}
        <div style={styles.card} className="fade-up fade-up-3">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>ASSET COVERAGE</span>
          </div>
          <div style={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.asset} style={styles.statRow}>
                <span style={styles.statAsset}>{s.asset}</span>
                <div style={styles.statBarWrap}>
                  <div style={{
                    ...styles.statBar,
                    width: `${(s.report_count / Math.max(...stats.map(x => x.report_count))) * 100}%`,
                  }} />
                </div>
                <span style={styles.statCount}>{s.report_count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--text-dim)' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.2em', animation: 'pulse-accent 1.4s infinite' }}>
        FETCHING INTELLIGENCE...
      </div>
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div style={{ padding: '40px', background: 'var(--sell-bg)', border: '1px solid var(--sell)', borderRadius: 'var(--radius-md)' }}>
      <div style={{ color: 'var(--sell)', fontSize: '11px', letterSpacing: '0.1em' }}>ERROR</div>
      <div style={{ color: 'var(--text-primary)', marginTop: '6px' }}>{message}</div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  pageHeader:   { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' },
  pageTitle:    { fontSize: '26px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)' },
  pageSubtitle: { fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', letterSpacing: '0.08em' },
  headerMeta:   { display: 'flex', gap: '8px' },
  metaTag:      { fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--text-dim)', padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' },

  signalBar:  { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px', border: '1px solid var(--border)' },
  signalCell: { background: 'var(--bg-card)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' },
  signalValue:{ fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: 700 },
  signalLabel:{ fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '0.16em' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },

  card:       { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' },
  cardHeader: { padding: '14px 20px', borderBottom: '1px solid var(--border-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle:  { fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--text-dim)' },
  cardMeta:   { fontSize: '10px', color: 'var(--text-dim)' },

  table:    { width: '100%', borderCollapse: 'collapse' },
  th:       { padding: '10px 16px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text-dim)', textAlign: 'left', borderBottom: '1px solid var(--border-dim)' },
  tr:       { transition: 'background 0.12s', cursor: 'pointer' },
  td:       { padding: '12px 16px', borderBottom: '1px solid var(--border-dim)', verticalAlign: 'middle' },

  assetLink:   { textDecoration: 'none' },
  assetTicker: { fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em' },

  marketCell: { display: 'flex', flexDirection: 'column', gap: '2px' },
  priceTag:   { fontSize: '10px', color: 'var(--text-dim)' },

  statsGrid:  { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' },
  statRow:    { display: 'flex', alignItems: 'center', gap: '12px' },
  statAsset:  { width: '36px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.06em' },
  statBarWrap:{ flex: 1, height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' },
  statBar:    { height: '100%', background: 'var(--accent)', borderRadius: '2px', transition: 'width 0.8s ease', boxShadow: '0 0 6px var(--accent-glow-strong)' },
  statCount:  { fontSize: '11px', color: 'var(--text-dim)', minWidth: '24px', textAlign: 'right' },
}