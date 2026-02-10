import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";

export default function TransactionHistory() {
  const { publicKey } = useWallet();
  const [txs, setTxs] = useState([]);

  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const connection = useMemo(() => new Connection(endpoint, "confirmed"), [endpoint]);

  useEffect(() => {
    let cancelled = false;

    async function fetchTxs() {
      if (!publicKey) return;

      try {
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 5 });
        if (!cancelled) setTxs(signatures);
      } catch (e) {
        console.error(e);
        if (!cancelled) setTxs([]);
      }
    }

    fetchTxs();

    return () => {
      cancelled = true;
    };
  }, [publicKey, connection]);

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Recent Transactions</h3>

      {!publicKey && <p>Connect wallet to see transactions.</p>}

      {publicKey && txs.length === 0 && <p>No recent transactions.</p>}

      {txs.map((tx, index) => (
        <div key={index} style={{ marginBottom: 8 }}>
          <a
            href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
            target="_blank"
            rel="noreferrer"
          >
            {tx.signature.slice(0, 20)}...
          </a>
        </div>
      ))}
    </>
  );
}
