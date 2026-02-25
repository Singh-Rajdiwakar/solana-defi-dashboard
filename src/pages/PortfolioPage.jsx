export default function PortfolioPage({ cardBg, border, muted }) {
  const cardStyle = { background: cardBg, border: `1px solid ${border}` };

  return (
    <div className="grid">
      <div className="card" style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Portfolio</h2>
        <p style={{ color: muted, marginTop: 6 }}>
          SOL + SPL token balances (next)
        </p>
      </div>

      <div className="card" style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>Token List</h3>
        <p style={{ color: muted, marginTop: 6 }}>
          Token name, mint, balance, value (optional prices)
        </p>
      </div>
    </div>
  );
}