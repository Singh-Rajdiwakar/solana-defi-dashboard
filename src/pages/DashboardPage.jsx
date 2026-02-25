import WalletInfo from "../components/WalletInfo";
import SendSol from "../components/SendSol";
import TransactionHistory from "../components/TransactionHistory";
import CreateToken from "../components/CreateToken";

export default function DashboardPage({ cardBg, border }) {
  const cardStyle = { background: cardBg, border: `1px solid ${border}` };

  return (
    <div className="grid">
      <div className="card" style={cardStyle}>
        <WalletInfo />
      </div>

      <div className="card" style={cardStyle}>
        <SendSol />
      </div>

      <div className="card" style={cardStyle}>
        <TransactionHistory />
      </div>

      <div className="card" style={cardStyle}>
        <CreateToken />
      </div>
    </div>
  );
}