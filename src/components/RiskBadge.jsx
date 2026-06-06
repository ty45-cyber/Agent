// src/components/RiskBadge.jsx

const CONFIG = {
  low:      { color: 'var(--low)',      label: 'LOW RISK'      },
  medium:   { color: 'var(--medium)',   label: 'MED RISK'      },
  high:     { color: 'var(--high)',     label: 'HIGH RISK'     },
  critical: { color: 'var(--critical)', label: 'CRITICAL RISK' },
}

export default function RiskBadge({ value }) {
  const cfg = CONFIG[value] || CONFIG.medium
  return (
    <span style={{
      fontSize:     '10px',
      fontWeight:   600,
      letterSpacing:'0.1em',
      color:        cfg.color,
      padding:      '1px 7px',
      border:       `1px solid ${cfg.color}`,
      borderRadius: 'var(--radius-sm)',
      opacity:      0.9,
    }}>
      {cfg.label}
    </span>
  )
}