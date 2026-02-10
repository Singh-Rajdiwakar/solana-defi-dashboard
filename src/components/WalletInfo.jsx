import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function WalletInfo() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState(false);

  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const connection = useMemo(() => new Connection(endpoint, "confirmed"), [endpoint]);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!publicKey) {
        setBalance(null);
        return;
      }
      const lamports = await connection.getBalance(publicKey, "confirmed");
      if (active) setBalance(lamports / LAMPORTS_PER_SOL);
    }

    load();
    const id = connected ? setInterval(load, 10000) : null;

    return () => {
      active = false;
      if (id) clearInterval(id);
    };
  }, [publicKey, connected, connection]);

  const shortAddress = publicKey
    ? publicKey.toBase58().slice(0, 4) +
      "..." +
      publicKey.toBase58().slice(-4)
    : "";

  const copyAddress = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Wallet Info</h3>

      {!publicKey ? (
        <p>Connect Phantom to see address & balance.</p>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <p style={{ margin: 0 }}>
              <b>Address:</b> {shortAddress}
            </p>

            <button
              onClick={copyAddress}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid #ccc",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              {copied ? "✅ Copied" : "Copy"}
            </button>
          </div>

          <p style={{ marginTop: 10 }}>
            <b>SOL Balance:</b>{" "}
            {balance === null ? "Loading..." : balance.toFixed(4)}
          </p>
        </>
      )}
    </>
  );
}
