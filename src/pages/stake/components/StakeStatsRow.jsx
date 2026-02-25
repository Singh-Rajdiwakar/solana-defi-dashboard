import "./stake.css";

export default function StakeStatsRow() {
  const stats = [
    {
      label: "Total Staked",
      value: "₹152,000",
      delta: "+0.5%",
      trend: "up",
    },
    {
      label: "Total Earned",
      value: "12,465",
      delta: "+0.4%",
      trend: "up",
    },
    {
      label: "Total Stakers",
      value: "5,200",
      delta: "+7.15%",
      trend: "up",
    },
  ];

  return (
    <div className="stake-statsRow">
      {stats.map((s) => (
        <div key={s.label} className="stake-card stake-statCard">
          <div className="stake-statTop">
            <div className="stake-statLabel">{s.label}</div>
            <Sparkline />
          </div>

          <div className="stake-statBottom">
            <div className="stake-statValue">{s.value}</div>
            <div className={`stake-statDelta ${s.trend}`}>
              {s.delta}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Sparkline() {
  // simple SVG sparkline (looks like reference)
  return (
    <svg
      className="stake-spark"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 28 L18 22 L30 26 L42 16 L54 18 L66 12 L78 15 L90 10 L102 14 L116 8"
        stroke="rgba(52,211,153,0.85)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 28 L18 22 L30 26 L42 16 L54 18 L66 12 L78 15 L90 10 L102 14 L116 8"
        stroke="rgba(52,211,153,0.25)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}