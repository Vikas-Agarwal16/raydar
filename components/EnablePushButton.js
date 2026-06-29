"use client";

import { useState, useEffect } from "react";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  );
}

export default function EnablePushButton() {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }

    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.getSubscription().then((sub) => {
        if (sub) setStatus("subscribed");
      });
    });
  }, []);

  async function handleEnablePush() {
    setStatus("subscribing");

    try {
      const registration = await navigator.serviceWorker.register("/sw.js");

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setStatus("denied");
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription.toJSON()),
      });

      if (!res.ok) {
        throw new Error("Failed to save subscription");
      }

      setStatus("subscribed");
    } catch (err) {
      console.error("Push subscription failed:", err);
      setStatus("error");
    }
  }

  async function handleDisablePush() {
    setStatus("subscribing");

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
      }

      await fetch("/api/push/unsubscribe", {
        method: "POST",
      });

      setStatus("idle");
    } catch (err) {
      console.error("Push unsubscribe failed:", err);
      setStatus("error");
    }
  }

  if (status === "subscribed") {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-full border border-[#5B7FFF]/30 bg-[#5B7FFF]/10 text-[#7FA8FF]">
        Push Enabled

        <button
          type="button"
          onClick={handleDisablePush}
          className="text-[#7FA8FF]/60 hover:text-[#7FA8FF] transition-colors"
          aria-label="Disable push notifications"
        >
          ×
        </button>
      </span>
    );
  }

  if (status === "unsupported") {
    return (
      <span className="px-3 py-1.5 text-xs font-mono rounded-full border border-white/10 text-white/30">
        Push unsupported
      </span>
    );
  }

  return (
    <button
      onClick={handleEnablePush}
      disabled={status === "subscribing"}
      className="px-4 py-1.5 text-xs font-mono rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-colors disabled:opacity-50"
    >
      {status === "subscribing" && "Enabling..."}
      {status === "denied" && "Permission denied"}
      {status === "error" && "Try again"}
      {status === "idle" && "Enable push notifications"}
    </button>
  );
}