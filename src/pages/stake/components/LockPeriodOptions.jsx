import "./stake.css";

export default function LockPeriodOptions() {
  const plans = [
    { days: 7, reward: "$5.77", apy: "—", btn: "Stake", tone: "violet" },
    { days: 30, reward: "12%", apy: "APY", btn: "Stake", tone: "cyan" },
    { days: 90, reward: "13.86", apy: "+% TRV", btn: "Stake", tone: "blue" },
    { days: 200, reward: "35.05", apy: "% APY", btn: "Stake", tone: "teal" },
  ];

  return (
    <div className="stake-card stake-lockWrap">
      <div className="stake-lockHeader">
        <div>
          <div className="stake-cardTitle">Lock Period Options</div>
          <div className="stake-tokenSub">Choose duration to earn higher rewards</div>
        </div>

        <div className="stake-lockMeta">
          <span className="pill">3.1055 USD</span>
          <span className="pill">~ 4.77 APY</span>
        </div>
      </div>

      <div className="stake-lockGrid">
        {plans.map((p) => (
          <div key={p.days} className={`stake-lockCard ${p.tone}`}>
            <div className="stake-lockTop">
              <div className="stake-lockDays">
                <span className="big">{p.days}</span> Days
              </div>
              <div className="stake-lockReward">
                <div className="val">{p.reward}</div>
                <div className="sub">{p.apy}</div>
              </div>
            </div>

            <button className={`stake-lockBtn ${p.tone}`}>{p.btn}</button>
          </div>
        ))}
      </div>

      <div className="stake-lockHint">
        🔒 Lock up your tokens longer to earn higher rewards
      </div>
    </div>
  );
}