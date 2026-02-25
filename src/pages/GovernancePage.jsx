export default function GovernancePage({ cardBg, border, muted }) {
  const cardStyle = { background: cardBg, border: `1px solid ${border}` };

  return (
    <div className="grid">
      <div className="card" style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Governance Voting</h2>
        <p style={{ color: muted, marginTop: 6 }}>
          Proposals + Vote (next)
        </p>
      </div>

      <div className="card" style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>Vesting / Claim</h3>
        <p style={{ color: muted, marginTop: 6 }}>
          Claim rewards / tokens (next)
        </p>
      </div>

      <div className="card" style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>Admin Panel (later)</h3>
        <p style={{ color: muted, marginTop: 6 }}>
          Pause, reward rate, emergency controls (admin only)
        </p>
      </div>
    </div>
  );
}