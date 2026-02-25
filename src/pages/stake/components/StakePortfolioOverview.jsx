import "./stake.css";

export default function StakePortfolioOverview() {
  const rows = [
    { symbol: "SOL", sub: "$4,830", rightTop: "23.45 SOL", rightSub: "$4,920" },
    { symbol: "USDC", sub: "$1,800", rightTop: "1,200", rightSub: "$1,220" },
    { symbol: "STRK", sub: "$3,920", rightTop: "3,450", rightSub: "$3,260" },
    { symbol: "RAY", sub: "$1,600", rightTop: "8,500", rightSub: "$1,600" },
  ];

  return (
    <div className="stake-card stake-portfolioCard">
      <div className="stake-cardHeader">
        <div className="stake-cardTitle">Portfolio Overview</div>
      </div>

      <div className="stake-portfolioList">
        {rows.map((r) => (
          <div key={r.symbol} className="stake-portfolioRow">
            <div className="stake-tokenLeft">
              <div className={`stake-tokenIcon ${r.symbol.toLowerCase()}`}>
                {r.symbol[0]}
              </div>
              <div>
                <div className="stake-tokenSym">{r.symbol}</div>
                <div className="stake-tokenSub">{r.sub}</div>
              </div>
            </div>

            <div className="stake-tokenRight">
              <div className="stake-tokenTop">{r.rightTop}</div>
              <div className="stake-tokenSub">{r.rightSub}</div>
            </div>
          </div>
        ))}

        <button className="stake-viewAll">View All →</button>
      </div>
    </div>
  );
}