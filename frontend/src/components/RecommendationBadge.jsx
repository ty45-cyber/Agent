// src/components/RecommendationBadge.jsx

const CONFIG = {
  BUY:   { color: 'var(--buy)',   bg: 'var(--buy-bg)',   label: '▲ BUY'   },
  HOLD:  { color: 'var(--hold)',  bg: 'var(--hold-bg)',  label: '◆ HOLD'  },
  SELL:  { color: 'var(--sell)',  bg: 'var(--sell-bg)',  label: '▼ SELL'  },
  AVOID: { color: 'var(--avoid)', bg: 'var(--avoid-bg)', label: '⛔ AVOID' },
}

export default function RecommendationBadge({ value, large = false }) {
  const cfg = CONFIG[value] || CONFIG.HOLD
  return (
    <span style={{
      display:      'inline-flex',
      alignItems:   'center',
      padding:      large ? '5px 14px' : '2px 9px',
      borderRadius: 'var(--radius-sm)',
      fontSize:     large ? '13px' : '10px',
      fontWeight:   600,
      letterSpacing:'0.1em',
      color:        cfg.color,
      background:   cfg.bg,
      border:       `1px solid ${cfg.color}`,
      whiteSpace:   'nowrap',
    }}>
      {cfg.label}
    </span>
  )
}