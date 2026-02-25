import { useEffect, useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

import Navbar from "./components/Navbar";

// Pages
import DashboardPage from "./pages/DashboardPage";
import StakePage from "./pages/StakePage";
import PortfolioPage from "./pages/PortfolioPage";
import PoolsPage from "./pages/PoolsPage";
import GovernancePage from "./pages/GovernancePage";

export default function App() {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // ✅ tab remember on refresh
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || "dashboard"
  );

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

 const bg = dark
  ? `
    radial-gradient(900px 420px at 18% 10%, rgba(99,102,241,0.22), transparent 62%),
    radial-gradient(700px 360px at 85% 25%, rgba(56,189,248,0.16), transparent 60%),
    radial-gradient(900px 520px at 50% 110%, rgba(34,211,238,0.12), transparent 62%),
    #0b1220
  `
  : "radial-gradient(1200px 600px at 20% 0%, rgba(99,102,241,0.12), transparent 60%), #f6f7fb";
  const text = dark ? "#e7eefc" : "#111827";
  const cardBg = dark ? "rgba(255,255,255,0.06)" : "#ffffff";
  const border = dark ? "rgba(255,255,255,0.10)" : "#e5e7eb";
  const muted = dark ? "rgba(255,255,255,0.60)" : "#6b7280";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div style={{ minHeight: "100vh", background: bg, color: text }}>
            <Navbar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              dark={dark}
              setDark={setDark}
            />

            <div className="container" style={{ paddingTop: 18 }}>
              {activeTab === "dashboard" && (
                <DashboardPage cardBg={cardBg} border={border} />
              )}

              {activeTab === "stake" && (
                <StakePage cardBg={cardBg} border={border} muted={muted} />
              )}

              {activeTab === "portfolio" && (
                <PortfolioPage cardBg={cardBg} border={border} muted={muted} />
              )}

              {activeTab === "pools" && (
                <PoolsPage cardBg={cardBg} border={border} muted={muted} />
              )}

              {activeTab === "governance" && (
                <GovernancePage
                  cardBg={cardBg}
                  border={border}
                  muted={muted}
                />
              )}

              {activeTab === "dashboard" && (
  <div
    style={{
      marginTop: 18,
      color: muted,
      fontSize: 12,
      textAlign: "center",
    }}
  >
    Built with React + Solana Web3.js + Phantom (Devnet)
  </div>
)}
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}