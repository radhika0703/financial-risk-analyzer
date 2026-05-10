import React from "react";

function StatCard({ label, value, icon, color, sub }) {
  return (
    <div style={{ ...cardStyles.statCard, borderColor: color + '33' }}>
      <div style={{ ...cardStyles.statIcon, background: color + '18', color }}>{icon}</div>
      <div>
        <div style={cardStyles.statValue}>{value}</div>
        <div style={cardStyles.statLabel}>{label}</div>
        {sub && <div style={cardStyles.statSub}>{sub}</div>}
      </div>
    </div>
  );
}

function RiskMeter({ probability }) {
  const pct = Math.round((probability || 0) * 100);
  const color = pct > 70 ? '#f87171' : pct > 40 ? '#fbbf24' : '#34d399';
  const angle = (pct / 100) * 180;
  return (
    <div style={cardStyles.meterWrap}>
      <svg viewBox="0 0 200 110" style={{ width: '100%', maxWidth: '220px' }}>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" strokeLinecap="round"/>
        <path
          d={`M 20 100 A 80 80 0 0 1 180 100`}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${(pct/100)*251} 251`}
          opacity="0.85"
        />
        <text x="100" y="95" textAnchor="middle" fill={color} fontSize="28" fontWeight="800" fontFamily="Syne,sans-serif">{pct}%</text>
        <text x="100" y="108" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="DM Sans,sans-serif">Risk Score</text>
      </svg>
    </div>
  );
}

function Dashboard({ user, result, history }) {
  const totalAnalyses = history.length;
  const highRiskCount = history.filter(h => h.prediction === "HIGH RISK").length;
  const avgProb = history.length > 0
    ? (history.reduce((s, h) => s + h.probability, 0) / history.length * 100).toFixed(1)
    : "—";

  return (
    <div style={dashStyles.root}>
      {/* Header */}
      <div style={dashStyles.header}>
        <div>
          <h1 style={dashStyles.title}>Risk Dashboard</h1>
          <p style={dashStyles.subtitle}>Monitor and analyze financial risk profiles</p>
        </div>
        <div style={dashStyles.badge}>
          <span style={dashStyles.dot} />
          Live Analysis
        </div>
      </div>

      {/* Stats row */}
      <div style={dashStyles.statsRow}>
        <StatCard label="Total Analyses" value={totalAnalyses} icon="📊" color="#38bdf8" />
        <StatCard label="High Risk Detected" value={highRiskCount} icon="⚠️" color="#f87171" />
        <StatCard label="Avg Risk Score" value={avgProb !== "—" ? avgProb + "%" : "—"} icon="📈" color="#fbbf24" />
        <StatCard label="Analyst" value={user} icon="👤" color="#818cf8" />
      </div>

      {/* Result + Meter */}
      {result ? (
        <div style={dashStyles.resultSection}>
          <div style={dashStyles.meterCard}>
            <h3 style={dashStyles.cardTitle}>Risk Assessment</h3>
            <RiskMeter probability={result.probability} />
            <div style={{
              ...dashStyles.riskBadge,
              background: result.prediction === "HIGH RISK" ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.12)',
              border: `1px solid ${result.prediction === "HIGH RISK" ? 'rgba(248,113,113,0.4)' : 'rgba(52,211,153,0.4)'}`,
              color: result.prediction === "HIGH RISK" ? '#f87171' : '#34d399',
            }}>
              {result.prediction === "HIGH RISK" ? "⚠ HIGH RISK" : "✅ LOW RISK"}
            </div>
            <p style={dashStyles.riskNote}>
              {result.prediction === "HIGH RISK"
                ? "This profile indicates elevated financial risk. Recommend further review."
                : "This profile shows a healthy financial risk level. Looks good!"}
            </p>
          </div>

          <div style={dashStyles.detailCard}>
            <h3 style={dashStyles.cardTitle}>Analysis Details</h3>
            <div style={dashStyles.detailRow}>
              <span style={dashStyles.detailLabel}>Prediction</span>
              <span style={{
                color: result.prediction === "HIGH RISK" ? '#f87171' : '#34d399',
                fontWeight: 700,
              }}>{result.prediction}</span>
            </div>
            <div style={dashStyles.divider} />
            <div style={dashStyles.detailRow}>
              <span style={dashStyles.detailLabel}>Probability</span>
              <span style={{ color: '#e2e8f0', fontWeight: 600 }}>
                {(result.probability * 100).toFixed(1)}%
              </span>
            </div>
            <div style={dashStyles.divider} />
            <div style={dashStyles.detailRow}>
              <span style={dashStyles.detailLabel}>Confidence</span>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>
                {result.probability > 0.85 || result.probability < 0.15 ? "Very High" :
                 result.probability > 0.65 || result.probability < 0.35 ? "High" : "Moderate"}
              </span>
            </div>
            <div style={dashStyles.divider} />
            <div style={dashStyles.detailRow}>
              <span style={dashStyles.detailLabel}>Time</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={dashStyles.emptyState}>
          <div style={dashStyles.emptyIcon}>🔍</div>
          <h3 style={dashStyles.emptyTitle}>No Analysis Yet</h3>
          <p style={dashStyles.emptyText}>Submit a risk assessment using the form on the right to see results here.</p>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div style={dashStyles.historyCard}>
          <h3 style={dashStyles.cardTitle}>Analysis History</h3>
          <div style={dashStyles.historyList}>
            {history.map((h, i) => (
              <div key={i} style={dashStyles.historyRow}>
                <div style={{
                  ...dashStyles.historyDot,
                  background: h.prediction === "HIGH RISK" ? '#f87171' : '#34d399',
                }} />
                <span style={dashStyles.historyPred}>{h.prediction}</span>
                <span style={dashStyles.historyProb}>{(h.probability * 100).toFixed(1)}%</span>
                <span style={dashStyles.historyTime}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyles = {
  statCard: {
    flex: '1',
    minWidth: '140px',
    background: 'rgba(13,18,32,0.8)',
    border: '1px solid',
    borderRadius: '14px',
    padding: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  statIcon: {
    width: '42px', height: '42px',
    borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '20px', flexShrink: 0,
  },
  statValue: {
    fontFamily: 'Syne, sans-serif',
    fontSize: '22px',
    fontWeight: 800,
    color: '#e2e8f0',
    lineHeight: 1.1,
  },
  statLabel: { fontSize: '12px', color: '#64748b', marginTop: '3px' },
  statSub: { fontSize: '11px', color: '#475569', marginTop: '2px' },
  meterWrap: {
    display: 'flex', justifyContent: 'center',
    margin: '16px 0 8px',
  },
};

const dashStyles = {
  root: {
    padding: '32px',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 64px)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '28px',
  },
  title: {
    fontFamily: 'Syne, sans-serif',
    fontSize: '28px',
    fontWeight: 800,
    color: '#e2e8f0',
  },
  subtitle: { color: '#64748b', fontSize: '14px', marginTop: '4px' },
  badge: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(52,211,153,0.1)',
    border: '1px solid rgba(52,211,153,0.25)',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '13px',
    color: '#34d399',
    fontWeight: 500,
  },
  dot: {
    width: '8px', height: '8px',
    borderRadius: '50%',
    background: '#34d399',
    boxShadow: '0 0 8px #34d399',
    animation: 'pulse 2s infinite',
    display: 'inline-block',
  },
  statsRow: {
    display: 'flex',
    gap: '14px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  resultSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
  },
  meterCard: {
    background: 'rgba(13,18,32,0.8)',
    border: '1px solid rgba(56,189,248,0.12)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: '16px',
    fontWeight: 700,
    color: '#94a3b8',
    marginBottom: '4px',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    fontSize: '12px',
  },
  riskBadge: {
    padding: '10px 24px',
    borderRadius: '12px',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: '16px',
    letterSpacing: '1px',
    marginTop: '4px',
  },
  riskNote: {
    color: '#64748b',
    fontSize: '13px',
    textAlign: 'center',
    marginTop: '12px',
    lineHeight: 1.5,
  },
  detailCard: {
    background: 'rgba(13,18,32,0.8)',
    border: '1px solid rgba(56,189,248,0.12)',
    borderRadius: '16px',
    padding: '24px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  detailLabel: { color: '#64748b', fontSize: '14px' },
  divider: { height: '1px', background: 'rgba(255,255,255,0.05)' },
  emptyState: {
    background: 'rgba(13,18,32,0.6)',
    border: '1px dashed rgba(56,189,248,0.15)',
    borderRadius: '16px',
    padding: '60px 40px',
    textAlign: 'center',
    marginBottom: '24px',
  },
  emptyIcon: { fontSize: '48px', marginBottom: '16px' },
  emptyTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: '20px',
    color: '#475569',
    marginBottom: '8px',
  },
  emptyText: { color: '#334155', fontSize: '14px', maxWidth: '360px', margin: '0 auto', lineHeight: 1.6 },
  historyCard: {
    background: 'rgba(13,18,32,0.8)',
    border: '1px solid rgba(56,189,248,0.12)',
    borderRadius: '16px',
    padding: '24px',
  },
  historyList: { marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' },
  historyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '8px',
  },
  historyDot: { width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 },
  historyPred: { flex: 1, fontSize: '13px', fontWeight: 600, color: '#e2e8f0' },
  historyProb: { fontSize: '13px', color: '#94a3b8', fontWeight: 500 },
  historyTime: { fontSize: '12px', color: '#475569' },
};

export default Dashboard;
