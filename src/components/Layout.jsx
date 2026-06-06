// src/components/Layout.jsx

import { NavLink, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../api/client.js'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export default function Layout() {
  const [tick, setTick] = useState(0)

  // Pulse the cycle counter every 30s (mirrors scheduler interval)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={styles.shell}>
      {/* ── Top bar ── */}
      <header style={styles.topBar}>
        <div style={styles.topBarInner}>
          <div style={styles.brand}>
            <span style={styles.brandAccent}>ARD</span>
            <span style={styles.brandSub}>AUTONOMOUS RESEARCH DAO</span>
          </div>

          <nav style={styles.nav}>
            {[
              { to: '/',        label: 'REPORTS'  },
              { to: '/agents',  label: 'AGENTS'   },
              { to: '/cycle',   label: 'CYCLE'    },
            ].map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.navLinkActive : {}),
              })}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div style={styles.statusRow}>
            {USE_MOCK && (
              <span style={styles.mockBadge}>MOCK MODE</span>
            )}
            <span style={styles.cycleLabel}>
              CYCLE #{String(tick + 1).padStart(4, '0')}
            </span>
            <span style={styles.liveIndicator} />
          </div>
        </div>
      </header>

      {/* ── Page ── */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <span>ARD v0.1.0 · Solana Mainnet · 5 assets tracked</span>
        <span>Manager Agent · SAP Discovery · x402 Escrow</span>
      </footer>
    </div>
  )
}

const styles = {
  shell: {
    display:       'flex',
    flexDirection: 'column',
    minHeight:     '100vh',
  },
  topBar: {
    background:   'var(--bg-surface)',
    borderBottom: '1px solid var(--border)',
    position:     'sticky',
    top:          0,
    zIndex:       100,
  },
  topBarInner: {
    maxWidth:      '1280px',
    margin:        '0 auto',
    padding:       '0 24px',
    height:        '52px',
    display:       'flex',
    alignItems:    'center',
    gap:           '32px',
  },
  brand: {
    display:    'flex',
    alignItems: 'baseline',
    gap:        '10px',
  },
  brandAccent: {
    fontFamily:  'var(--font-display)',
    fontSize:    '20px',
    fontWeight:  800,
    color:       'var(--accent)',
    letterSpacing: '0.08em',
  },
  brandSub: {
    fontSize:    '9px',
    color:       'var(--text-dim)',
    letterSpacing: '0.18em',
  },
  nav: {
    display:  'flex',
    gap:      '2px',
    flex:     1,
  },
  navLink: {
    padding:      '4px 14px',
    fontSize:     '11px',
    fontWeight:   500,
    letterSpacing:'0.12em',
    color:         'var(--text-secondary)',
    borderRadius: 'var(--radius-sm)',
    transition:   'all 0.15s',
  },
  navLinkActive: {
    color:      'var(--accent)',
    background: 'var(--accent-glow)',
  },
  statusRow: {
    display:    'flex',
    alignItems: 'center',
    gap:        '12px',
  },
  mockBadge: {
    fontSize:     '9px',
    fontWeight:   600,
    letterSpacing:'0.14em',
    color:        'var(--hold)',
    background:   'var(--hold-bg)',
    padding:      '2px 8px',
    borderRadius: 'var(--radius-sm)',
    border:       '1px solid var(--hold)',
  },
  cycleLabel: {
    fontSize:     '10px',
    color:        'var(--text-dim)',
    letterSpacing:'0.1em',
  },
  liveIndicator: {
    width:      '6px',
    height:     '6px',
    borderRadius:'50%',
    background: 'var(--accent)',
    animation:  'pulse-accent 2s infinite',
    boxShadow:  '0 0 6px var(--accent)',
  },
  main: {
    flex:    1,
    maxWidth:'1280px',
    width:   '100%',
    margin:  '0 auto',
    padding: '28px 24px',
  },
  footer: {
    borderTop:  '1px solid var(--border-dim)',
    padding:    '12px 24px',
    display:    'flex',
    justifyContent:'space-between',
    fontSize:   '10px',
    color:      'var(--text-dim)',
    letterSpacing:'0.08em',
    maxWidth:   '1280px',
    margin:     '0 auto',
    width:      '100%',
  },
}