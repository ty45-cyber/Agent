// src/pages/CycleMonitor.jsx

import { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import { api } from '../api/client.js'

const PIPELINE_STEPS = [
  { key: 'sap_sync',    label: 'SAP Agent Sync',         duration: 800  },
  { key: 'job_create',  label: 'Job Creation + Escrow',  duration: 1200 },
  { key: 'dispatch',    label: 'Analyst Dispatch',       duration: 2400 },
  { key: 'collect',     label: 'Result Collection',      duration: 1600 },
  { key: 'synthesize',  label: 'LLM Synthesis',          duration: 1800 },
  { key: 'publish',     label: 'IPFS + Walrus Publish',  duration: 900  },
]

export default function CycleMonitor() {
  const [reports, setReports]   = useState([])
  const [running, setRunning]   = useState(false)
  const [stepIdx, setStepIdx]   = useState(-1)
  const [log, setLog]           = useState([])
  const logRef                  = useRef(null)

  useEffect(() => {
    api.getReports(10).then(setReports)
  }, [])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [log])

  const appendLog = (msg, type = 'info') => {
    const ts = format(new Date(), 'HH:mm:ss.SSS')
    setLog((prev) => [...prev, { ts, msg, type }])
  }

  const simulateCycle = async () => {
    if (running) return
    setRunning(true)
    setStepIdx(-1)
    setLog([])

    appendLog('Manager Agent: research cycle initiated', 'system')
    appendLog('Tracked assets: JUP, SOL, BONK, WIF, PYTH', 'info')
    await sleep(300)

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      const step = PIPELINE_STEPS[i]
      setStepIdx(i)
      appendLog(`[${step.label}] starting...`, 'info')
      await sleep(step.duration * 0.4)
      appendLog(`[${step.label}] processing 5 assets concurrently`, 'info')
      await sleep(step.duration * 0.6)
      appendLog(`[${step.label}] ✓ complete`, 'success')
    }

    appendLog('', 'divider')
    appendLog('Cycle complete: 5 reports generated', 'system')
    appendLog('JUP → BUY (82%) · SOL → HOLD (61%) · BONK → SELL (71%)', 'result')
    appendLog('WIF → HOLD (55%) · PYTH → BUY (78%)', 'result')
    appendLog('Reports published to IPFS + Walrus', 'success')
    appendLog('Escrow payments released to 4 analyst agents', 'success')

    setStepIdx(PIPELINE_STEPS.length) // all done
    setRunning(false)
  }

  return (
    <div>
      <div style={styles.header} className="fade-up">
        <div>
          <h1 style={styles.title}>Cycle Monitor</h1>
          <p style={styles.subtitle}>Autonomous research pipeline · 30-min interval</p>
        </div>
        <button
          onClick={simulateCycle}
          disabled={running}
          style={{ ...styles.runBtn, ...(running ? styles.runBtnDisabled : {}) }}
        >
          {running ? '⟳ RUNNING...' : '▶ SIMULATE CYCLE'}
        </button>
      </div>

      <div style={styles.grid}>
        {/* Pipeline visualiser */}
        <div style={styles.card} className="fade-up fade-up-1">
          <div style={styles.cardLabel}>PIPELINE STAGES</div>
          <div style={styles.pipeline}>
            {PIPELINE_STEPS.map((step, i) => {
              const done    = stepIdx > i
              const active  = stepIdx === i
              const pending = stepIdx < i

              return (
                <div key={step.key} style={styles.pipelineRow}>
                  <div style={{
                    ...styles.stepDot,
                    background:  done   ? 'var(--accent)' : active ? 'var(--hold)' : 'var(--border)',
                    boxShadow:   active ? '0 0 12px var(--hold)' : done ? '0 0 8px var(--accent-glow-strong)' : 'none',
                    animation:   active ? 'pulse-accent 1s infinite' : 'none',
                  }} />
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div style={{
                      ...styles.stepLine,
                      background: done ? 'var(--accent)' : 'var(--border)',
                    }} />
                  )}
                  <span style={{
                    ...styles.stepLabel,
                    color: done ? 'var(--text-primary)' : active ? 'var(--hold)' : 'var(--text-dim)',
                    fontWeight: active ? 600 : 400,
                  }}>
                    {step.label}
                  </span>
                  {done && <span style={styles.checkmark}>✓</span>}
                  {active && <span style={{ color: 'var(--hold)', fontSize: '10px', marginLeft: 'auto' }}>RUNNING</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity log */}
        <div style={styles.card} className="fade-up fade-up-2">
          <div style={styles.cardLabel}>ACTIVITY LOG</div>
          <div ref={logRef} style={styles.logBox}>
            {log.length === 0 ? (
              <span style={{ color: 'var(--text-dim)', fontSize: '11px' }}>
                Awaiting cycle start...
              </span>
            ) : (
              log.map((entry, i) => (
                entry.type === 'divider'
                  ? <div key={i} style={styles.logDivider} />
                  : (
                    <div key={i} style={styles.logLine}>
                      <span style={styles.logTs}>{entry.ts}</span>
                      <span style={{
                        ...styles.logMsg,
                        color: entry.type === 'success' ? 'var(--accent)'
                             : entry.type === 'system'  ? 'var(--hold)'
                             : entry.type === 'result'  ? '#44aaff'
                             : 'var(--text-secondary)',
                      }}>
                        {entry.msg}
                      </span>
                    </div>
                  )
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent reports mini-feed */}
      <div style={styles.miniFeed} className="fade-up fade-up-3">
        <div style={styles.cardLabel}>RECENT CYCLE OUTPUTS</div>
        <div style={styles.miniGrid}>
          {reports.map((r) => (
            <div key={r.id} style={styles.miniCard}>
              <span style={styles.miniAsset}>{r.asset}</span>
              <span style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
                color: r.recommendation === 'BUY' ? 'var(--buy)'
                     : r.recommendation === 'SELL' ? 'var(--sell)'
                     : 'var(--hold)',
              }}>
                {r.recommendation}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
                {r.confidence}%
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
                {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const styles = {
  header:  { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' },
  title:   { fontSize: '26px', fontFamily: 'var(--font-display)', fontWeight: 800 },
  subtitle:{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', letterSpacing: '0.08em' },

  runBtn:         { background: 'var(--accent)', color: 'var(--bg-void)', border: 'none', padding: '10px 22px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'var(--font-mono)' },
  runBtnDisabled: { background: 'var(--border)', color: 'var(--text-dim)', cursor: 'not-allowed' },

  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 22px' },
  cardLabel: { fontSize: '9px', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '16px' },

  pipeline:    { display: 'flex', flexDirection: 'column', gap: '0' },
  pipelineRow: { display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', minHeight: '36px' },
  stepDot:     { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, transition: 'all 0.3s', zIndex: 1 },
  stepLine:    { position: 'absolute', left: '4px', top: '24px', width: '2px', height: '24px', transition: 'background 0.3s' },
  stepLabel:   { fontSize: '12px', transition: 'color 0.3s', letterSpacing: '0.02em' },
  checkmark:   { marginLeft: 'auto', color: 'var(--accent)', fontSize: '11px' },

  logBox:     { height: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' },
  logLine:    { display: 'flex', gap: '10px', alignItems: 'flex-start' },
  logTs:      { fontSize: '10px', color: 'var(--text-dim)', flexShrink: 0, fontFamily: 'var(--font-mono)' },
  logMsg:     { fontSize: '11px', fontFamily: 'var(--font-mono)', lineHeight: '1.5' },
  logDivider: { height: '1px', background: 'var(--border-dim)', margin: '4px 0' },

  miniFeed: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 22px' },
  miniGrid: { display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border-dim)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' },
  miniCard: { background: 'var(--bg-surface)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '20px' },
  miniAsset:{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, width: '48px' },
}