import { useEffect, useMemo, useState } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
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

  // ✅ theme persisted
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
        muted: "#a9b7d0",
        btnBg: "#15233a",
      }
    : {
        pageBg: "#f6f7fb",
        cardBg: "#ffffff",
        border: "#e8e8e8",
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
    background: theme.pageBg,
    padding: 24,
    color: theme.text,
    transition: "all 0.3s ease",
  }}
>

            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              {/* Top bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  padding: 18,
                  borderRadius: 16,
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>Solana Wallet Dashboard</div>
                  <div style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>
                    Network: <b>Devnet</b>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Dark mode toggle */}
                  <button
                    onClick={() => setDark((v) => !v)}
                    style={{
                      background: theme.btnBg,
                      color: theme.text,
                      border: `1px solid ${theme.border}`,
                      padding: "10px 12px",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                    title="Toggle theme"
                  >
                    {dark ? "🌙 Dark" : "☀️ Light"}
                  </button>

                  <WalletMultiButton />
                </div>
              </div>

              {/* Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 16,
                  marginTop: 16,
                }}
              >
                <div
  style={{
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 16,
    transition: "all 0.3s ease",
  }}
>

                  <div style={{ padding: 16 }}>
                    <WalletInfo />
                  </div>
                </div>

              <div
  style={{
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 16,
    transition: "all 0.3s ease",
  }}
>

                  <div style={{ padding: 16 }}>
                    <SendSol />
                  </div>
                </div>
<div
  style={{
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 16,
    transition: "all 0.3s ease",
  }}
>

                  <div style={{ padding: 16 }}>
                    <TransactionHistory />
                  </div>
                </div>
                <div
  style={{
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 16,
    transition: "all 0.3s ease",
  }}
>
  <div style={{ padding: 16 }}>
    <CreateToken />
  </div>
</div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: 18, color: theme.muted, fontSize: 12, textAlign: "center" }}>
                Built with React + Solana Web3.js + Phantom (Devnet)
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
