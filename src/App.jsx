import { useEffect, useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

import WalletInfo from "./components/WalletInfo";
import SendSol from "./components/SendSol";
import TransactionHistory from "./components/TransactionHistory";
import CreateToken from "./components/CreateToken";

export default function App() {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  // Theme state (persisted)
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const theme = dark
    ? {
        pageBg: "#0b1220",
        cardBg: "#0f1a2b",
        border: "#1f2a3a",
        text: "#e7eefc",
        muted: "#9fb0c9",
        btnBg: "#15233a",
      }
    : {
        pageBg: "#f6f7fb",
        cardBg: "#ffffff",
        border: "#e5e7eb",
        text: "#111827",
        muted: "#6b7280",
        btnBg: "#ffffff",
      };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div
            style={{
              minHeight: "100vh",
              background: dark
  ? "radial-gradient(1200px 600px at 20% 0%, rgba(99,102,241,0.18), transparent 60%), #0b1220"
  : "radial-gradient(1200px 600px at 20% 0%, rgba(99,102,241,0.12), transparent 60%), #f6f7fb",

              color: theme.text,
              transition: "all 0.3s ease",
            }}
          >
            <div className="container">
              {/* Top Bar */}
              <div
                className="topbar"
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>
                    Solana Wallet Dashboard
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: theme.muted,
                      marginTop: 4,
                    }}
                  >
                    Network: <b>Devnet</b>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    onClick={() => setDark((v) => !v)}
                    style={{
                      background: theme.btnBg,
                      color: theme.text,
                      border: `1px solid ${theme.border}`,
                      padding: "10px 12px",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {dark ? "🌙 Dark" : "☀️ Light"}
                  </button>

                  <WalletMultiButton />
                </div>
              </div>

              {/* Grid */}
              <div className="grid">
                <div
                  className="card"
                  style={{
                    background: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <WalletInfo />
                </div>

                <div
                  className="card"
                  style={{
                    background: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <SendSol />
                </div>

                <div
                  className="card"
                  style={{
                    background: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <TransactionHistory />
                </div>

                <div
                  className="card"
                  style={{
                    background: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <CreateToken />
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: 18,
                  color: theme.muted,
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Built with React + Solana Web3.js + Phantom (Devnet)
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
