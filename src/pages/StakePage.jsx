import StakeStatsRow from "./stake/components/StakeStatsRow";
import StakeLeftPortfolioCard from "./stake/components/StakeLeftPortfolioCard";
import StakeRewardsCalculator from "./stake/components/StakeRewardsCalculator";
import StakePortfolioOverview from "./stake/components/StakePortfolioOverview";
import LockPeriodOptions from "./stake/components/LockPeriodOptions";
import StakeTransactionHistory from "./stake/components/StakeTransactionHistory";

export default function StakePage() {
  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ margin: 0 }}>Staking Dashboard</h2>
        <p style={{ marginTop: 6, opacity: 0.65 }}>
          Stake your tokens and earn rewards
        </p>
      </div>

      {/* ✅ MAIN GRID (2 columns like reference) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1.1fr",
          gap: 14,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ display: "grid", gap: 14 }}>
          {/* Row 1: Stats */}
          <StakeStatsRow />

          {/* Row 2: Two cards side-by-side */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            <StakeLeftPortfolioCard />
            <StakeRewardsCalculator />
          </div>

          {/* Row 3: Lock period */}
          <LockPeriodOptions />
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "grid", gap: 14 }}>
          {/* Portfolio list */}
          <StakePortfolioOverview />

          {/* Transaction history under it */}
          <StakeTransactionHistory />
        </div>
      </div>
    </div>
  );
}