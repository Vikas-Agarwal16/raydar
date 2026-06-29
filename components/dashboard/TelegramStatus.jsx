"use client";

import { useState } from "react";

function StatusDot({ active }) {
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        active ? "bg-[#34D399]" : "bg-white/20"
      }`}
    />
  );
}

export default function TelegramStatus({
  initiallyConnected,
  connectUrl,
}) {
  const [connected, setConnected] = useState(initiallyConnected);
  const [loading, setLoading] = useState(false);

  async function handleDisconnect() {
    setLoading(true);

    try {
      const res = await fetch("/api/telegram/disconnect", {
        method: "POST",
      });

      if (res.ok) {
        setConnected(false);
      }
    } catch (err) {
      console.error("Telegram disconnect failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
      <StatusDot active={connected} />

      {connected ? (
        <>
          <span className="text-xs font-mono text-white/60">
            Telegram
          </span>

          <button
            type="button"
            onClick={handleDisconnect}
            disabled={loading}
            className="text-white/30 hover:text-white/60 transition-colors disabled:opacity-50"
            aria-label="Disconnect Telegram"
          >
            ×
          </button>
        </>
      ) : (
        <a
          href={connectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-white/60 hover:text-white transition-colors"
        >
          Connect Telegram
        </a>
      )}
    </div>
  );
}