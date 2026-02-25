import "./stake.css";

export default function StakeTransactionHistory() {
  const txs = [
    { label: "Deposit", amount: "$600", tone: "pos" },
    { label: "Stake", amount: "$1,200", tone: "neutral" },
    { label: "STRK", amount: "-$500", tone: "neg" },
    { label: "1.5 SOL", amount: "$310", tone: "neutral" },
  ];

  return (
    <div className="stake-card stake-txCard">
      <div className="stake-txHeader">
        <div className="stake-cardTitle">Transaction History</div>
        <button className="stake-miniBtn">View All</button>
      </div>

      <div className="stake-txList">
        {txs.map((t, idx) => (
          <div key={idx} className="stake-txRow">
            <div className="stake-txLeft">
              <div className={`stake-txDot ${t.tone}`} />
              <div className="stake-txName">{t.label}</div>
            </div>

            <div className={`stake-txAmt ${t.tone}`}>{t.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}