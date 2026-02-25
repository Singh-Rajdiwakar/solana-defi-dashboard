import "./stake.css";

export default function StakeLeftPortfolioCard() {
  return (
    <div className="stake-card stake-leftPortfolio">
      <div className="stake-cardHeader">
        <div className="stake-cardTitle">Portfolio Overview</div>
      </div>

      <div className="stake-leftRow">
        <div className="stake-leftToken">
          <div className="stake-tokenIcon sol">S</div>
          <div>
            <div className="stake-tokenSym">SOL</div>
            <div className="stake-tokenSub">$4,920</div>
          </div>
        </div>

        <div className="stake-leftValue">
          <div className="stake-bigValue">23.45 SOL</div>
          <div className="stake-tokenSub">▲ 4,820</div>
        </div>
      </div>

      <div className="stake-divider" />

      <div className="stake-leftRow">
        <div className="stake-leftToken">
          <div className="stake-tokenIcon usdc">$</div>
          <div>
            <div className="stake-tokenSym">Value of all staked</div>
            <div className="stake-tokenSub">100coins</div>
          </div>
        </div>

        <div className="stake-leftValue">
          <div className="stake-bigValue">$10,365</div>
          <div className="stake-tokenSub">$11,856</div>
        </div>
      </div>
    </div>
  );
}