import { useMemo } from "react";
import "./Navbar.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar({ activeTab, setActiveTab, dark, setDark }) {
  const tabs = useMemo(
    () => [
      { id: "dashboard", label: "Dashboard" },
      { id: "stake", label: "Stake" },
      { id: "portfolio", label: "Portfolio" },
      { id: "pools", label: "Pools" },
      { id: "governance", label: "Governance" },
    ],
    []
  );

  return (
    <header className="nb-wrap">
      <div className="nb-glass">
        <div className="nb-inner">
          {/* Left */}
          <div className="nb-left">
            <div className="nb-brand" onClick={() => setActiveTab("dashboard")}>
              <div className="nb-logo">S</div>
              <div className="nb-brandText">
                <div className="nb-title">SolanaBlocks</div>
                <div className="nb-sub">DeFi Dashboard</div>
              </div>
            </div>

            <nav className="nb-tabs">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={`nb-tab ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                  <span className="nb-underline" />
                </button>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="nb-right">
            <div className="nb-pill">
              <span className="nb-dot" />
              <span className="nb-pillText">Devnet</span>
            </div>

            <button
              className="nb-themeBtn"
              onClick={() => setDark((v) => !v)}
              title="Toggle theme"
            >
              {dark ? "🌙" : "☀️"}
              <span className="nb-themeText">{dark ? "Dark" : "Light"}</span>
            </button>

            <div className="nb-wallet">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}