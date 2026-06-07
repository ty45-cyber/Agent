// src/components/ConfidenceBar.jsx

export default function ConfidenceBar({ value, showLabel = true }) {
  const color = value >= 70
    ? 'var(--accent)'
    : value >= 50
      ? 'var(--hold)'
      : 'var(--sell)'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        flex:        1,
        height:      '3px',
        background:  'var(--border)',
        borderRadius:'2px',
        overflow:    'hidden',
      }}>
        <div style={{
          width:       `${value}%`,
          height:      '100%',
          background:  color,
          borderRadius:'2px',
          transition:  'width 0.6s ease',
          boxShadow:   value >= 70 ? `0 0 6px ${color}` : 'none',
        }} />
      </div>
      {showLabel && (
        <span style={{
          fontSize:  '11px',
          color:     color,
          fontWeight:600,
          minWidth:  '32px',
          textAlign: 'right',
        }}>
          {value}%
        </span>
      )}
    </div>
  )
}