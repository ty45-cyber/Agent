// src/pages/Agents.jsx

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { api } from '../api/client.js'

const TYPE_COLORS = {
  market:    { color: 'var(--accent)',  label: 'MARKET'    },
  wallet:    { color: '#44aaff',        label: 'WALLET'    },
  sentiment: { color: '#cc88ff',        label: 'SENTIMENT' },
  risk:      { color: 'var(--hold)',    label: 'RISK'      },
}

export default function Agents() {
  const [agents, setAgents]   = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')

  useEffect(() => {
    api.getAgents()
      .then(setAgents)
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all'
    ? agents
    : agents.filter((a) => a.agent_type === filter)

  const activeCount = agents.filter((a) => a.is_active).length

  return (
    <div>
      <div style={styles.header} className="fade-up">
        <div>
          <h1 style={styles.title}>Agent Registry</h1>
          <p style={styles.subtitle}>
            {activeCount} active · {agents.length} total · SAP-discovered
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={styles.filterRow} className="fade-up fade-up-1">
        {['all', 'market', 'wallet', 'sentiment', 'risk'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              ...styles.filterBtn,
              ...(filter === t ? styles.filterBtnActive : {}),
              ...(t !== 'all' ? { color: TYPE_COLORS[t]?.color } : {}),
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={centeredMsg}>SYNCING REGISTRY...</div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} delay={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function AgentCard({ agent, delay }) {
  const tc = TYPE_COLORS[agent.agent_type] || { color: 'var(--text-dim)', label: 'UNKNOWN' }

  return (
    <div
      style={{ ...styles.card, opacity: agent.is_active ? 1 : 0.45 }}
      className={`fade-up fade-up-${Math.min(delay + 1, 5)}`}
    >
      {/* Card header */}
      <div style={styles.cardTop}>
        <div style={styles.agentNameRow}>
          <div style={{ ...styles.typeDot, background: tc.color, boxShadow: `0 0 8px ${tc.color}` }} />
          <span style={styles.agentName}>{agent.name}</span>
        </div>
        <span style={{
          ...styles.statusBadge,
          color:      agent.is_active ? 'var(--buy)'  : 'var(--text-dim)',
          background: agent.is_active ? 'var(--buy-bg)' : 'transparent',
          borderColor: agent.is_active ? 'var(--buy)' : 'var(--border)',
        }}>
          {agent.is_active ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>

      {/* Type tag */}
      <div style={styles.typeTag}>
        <span style={{ color: tc.color, fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em' }}>
          {tc.label} ANALYST
        </span>
      </div>

      {/* Capabilities */}
      <div style={styles.capsRow}>
        {agent.capabilities.map((cap) => (
          <span key={cap} style={styles.capTag}>{cap.replace(/_/g, ' ').toUpperCase()}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={styles.cardFooter}>
        <div style={styles.footerItem}>
          <span style={styles.footerKey}>SAP ID</span>
          <span style={styles.footerVal}>{agent.sap_id.slice(0, 18)}…</span>
        </div>
        <div style={styles.footerItem}>
          <span style={styles.footerKey}>LAST SEEN</span>
          <span style={styles.footerVal}>
            {formatDistanceToNow(new Date(agent.last_seen_at), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  )
}

const centeredMsg = { padding: '80px 0', textAlign: 'center', color: 'var(--text-dim)', fontSize: '11px', letterSpacing: '0.2em' }

const styles = {
  header:   { marginBottom: '24px' },
  title:    { fontSize: '26px', fontFamily: 'var(--font-display)', fontWeight: 800 },
  subtitle: { fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', letterSpacing: '0.08em' },

  filterRow:       { display: 'flex', gap: '4px', marginBottom: '20px' },
  filterBtn:       { background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '5px 14px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-dim)', cursor: 'pointer', fontFamily: 'var(--font-mono)', transition: 'all 0.15s' },
  filterBtnActive: { background: 'var(--accent-glow)', borderColor: 'var(--accent)', color: 'var(--accent)' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' },

  card:        { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'border-color 0.15s', cursor: 'default' },
  cardTop:     { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  agentNameRow:{ display: 'flex', alignItems: 'center', gap: '8px' },
  typeDot:     { width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0 },
  agentName:   { fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' },
  statusBadge: { fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', padding: '2px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid' },

  typeTag:  { borderTop: '1px solid var(--border-dim)', paddingTop: '10px' },

  capsRow:  { display: 'flex', flexWrap: 'wrap', gap: '5px' },
  capTag:   { fontSize: '9px', letterSpacing: '0.1em', color: 'var(--text-dim)', padding: '2px 7px', border: '1px solid var(--border-dim)', borderRadius: 'var(--radius-sm)' },

  cardFooter:  { borderTop: '1px solid var(--border-dim)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' },
  footerItem:  { display: 'flex', gap: '10px', alignItems: 'center' },
  footerKey:   { fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-dim)', minWidth: '64px' },
  footerVal:   { fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' },
}