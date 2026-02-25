import { useState } from "react";
import "./stake.css";

export default function StakeRewardsCalculator() {
  const [amount, setAmount] = useState("1000");
  const [duration, setDuration] = useState("30 Days");

  return (
    <div className="stake-card stake-rewardCard">
      <div className="stake-cardHeader">
        <div className="stake-cardTitle">Staking Rewards Calculator</div>
      </div>

      <div className="stake-calcRow">
        <div className="stake-inputGroup">
          <label>Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="stake-inputGroup">
          <label>Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option>7 Days</option>
            <option>30 Days</option>
            <option>90 Days</option>
            <option>200 Days</option>
          </select>
        </div>
      </div>

      <div className="stake-calcBottom">
        <div>
          <div className="stake-tokenSub">Estimated Reward:</div>
        </div>

        <button className="stake-calcBtn">Calculate</button>
      </div>
    </div>
  );
}