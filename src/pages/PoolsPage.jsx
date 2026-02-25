export default function PoolsPage({ cardBg, border, muted }) {
  const cardStyle = { background: cardBg, border: `1px solid ${border}` };

  return (
    <div className="grid">
      <div className="card" style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Liquidity Pools</h2>
        <p style={{ color: muted, marginTop: 6 }}>
          Pools list + Add Liquidity (simulation first)
        </p>
      </div>

      <div className="card" style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>AMM Simulation</h3>
        <p style={{ color: muted, marginTop: 6 }}>
          Price impact, fees, output estimation (next)
        </p>
      </div>
    </div>
  );
}