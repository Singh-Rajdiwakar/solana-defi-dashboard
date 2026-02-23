import { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import Toast from "./Toast";

export default function CreateToken() {
  const { publicKey, sendTransaction } = useWallet();
  const [toast, setToast] = useState(null);
  const [mintAddr, setMintAddr] = useState("");

  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const connection = useMemo(() => new Connection(endpoint, "confirmed"), [endpoint]);

  const createToken = async () => {
    try {
      if (!publicKey) {
        setToast({ message: "❌ Connect wallet first", type: "error" });
        return;
      }

      setToast({ message: "⏳ Creating token...", type: "info" });

      const mintKeypair = Keypair.generate();
      const decimals = 6;

      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const ata = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);

      const tx = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(mintKeypair.publicKey, decimals, publicKey, null),
        createAssociatedTokenAccountInstruction(publicKey, ata, publicKey, mintKeypair.publicKey),
        createMintToInstruction(mintKeypair.publicKey, ata, publicKey, 100n * 10n ** 6n)
      );

      const sig = await sendTransaction(tx, connection, { signers: [mintKeypair] });
      await connection.confirmTransaction(sig, "confirmed");

      setMintAddr(mintKeypair.publicKey.toBase58());
      setToast({ message: "✅ Token created & minted (100)", type: "success" });
    } catch (e) {
      console.error(e);
      setToast({ message: `❌ ${e?.message || "Create token failed"}`, type: "error" });
    }
  };

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Create SPL Token</h3>

      <button
        onClick={createToken}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #161616",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Create Token (Devnet)
      </button>

      {mintAddr && (
        <p style={{ marginTop: 10 }}>
          <b>Mint:</b>{" "}
          <a
            href={`https://explorer.solana.com/address/${mintAddr}?cluster=devnet`}
            target="_blank"
            rel="noreferrer"
          >
            {mintAddr.slice(0, 6)}...{mintAddr.slice(-6)}
          </a>
        </p>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
