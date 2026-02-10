import { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import Toast from "./Toast";

export default function SendSol() {
  const { publicKey, sendTransaction } = useWallet();
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState(null);

  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const connection = useMemo(() => new Connection(endpoint, "confirmed"), [endpoint]);

 const onSend = async () => {
  try {
    if (!publicKey) {
      setToast({ message: "❌ Connect wallet first", type: "error" });
      return;
    }

    if (!toAddress) {
      setToast({ message: "❌ Enter receiver address", type: "error" });
      return;
    }

    const sol = Number(amount);
    if (!sol || sol <= 0) {
      setToast({ message: "❌ Enter valid amount", type: "error" });
      return;
    }

    const toPubkey = new PublicKey(toAddress.trim());

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey,
        lamports: Math.round(sol * LAMPORTS_PER_SOL),
      })
    );

    setToast({ message: "⏳ Sending transaction...", type: "info" });

    const signature = await sendTransaction(tx, connection);
    await connection.confirmTransaction(signature, "confirmed");

    setToast({ message: "✅ Transaction Successful!", type: "success" });

    setToAddress("");
    setAmount("");

  } catch (e) {
    console.error(e);
    setToast({
      message: `❌ ${e?.message || "Transaction failed"}`,
      type: "error",
    });
  }
};


  return (
    <>
      <h3 style={{ marginTop: 0 }}>Send SOL (Devnet)</h3>

      <input
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #ccc",
        }}
        placeholder="Receiver address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />

      <input
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #ccc",
        }}
        placeholder="Amount in SOL (e.g. 0.01)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={onSend}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #333",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Send
        
      </button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
