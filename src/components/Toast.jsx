import { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg =
    type === "success" ? "#16a34a" : type === "error" ? "#dc2626" : "#2563eb";

  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        right: 18,
        zIndex: 999999, // ✅ very high so it always shows
        background: bg,
        color: "white",
        padding: "12px 14px",
        borderRadius: 12,
        fontWeight: 700,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        maxWidth: 360,
      }}
    >
      <div style={{ lineHeight: 1.2 }}>{message}</div>

      <button
        onClick={() => onClose?.()}
        style={{
          marginLeft: "auto",
          background: "rgba(255,255,255,0.2)",
          color: "white",
          border: "none",
          borderRadius: 10,
          padding: "6px 10px",
          cursor: "pointer",
          fontWeight: 800,
        }}
        title="Close"
      >
        ✕
      </button>
    </div>
  );
}
