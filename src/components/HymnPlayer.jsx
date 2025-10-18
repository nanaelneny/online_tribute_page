import { useEffect, useRef, useState } from "react";

export default function HymnPlayer() {
  const audioRef = useRef(null);
  const gainNodeRef = useRef(null);
  const ctxRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [needsConsent, setNeedsConsent] = useState(false);

  // Create WebAudio chain for gentle fades
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    // WebAudio context + gain node
    ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const source = ctxRef.current.createMediaElementSource(el);
    gainNodeRef.current = ctxRef.current.createGain();
    gainNodeRef.current.gain.value = 0; // start silent
    source.connect(gainNodeRef.current).connect(ctxRef.current.destination);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem("hymn_autoplay_ok") === "1";
    if (consent) {
      attemptPlay();
    } else {
      const unlock = () => {
        attemptPlay();
        window.removeEventListener("pointerdown", unlock, { capture: true });
        window.removeEventListener("touchstart", unlock, { capture: true });
        window.removeEventListener("keydown", unlock, { capture: true });
      };
      window.addEventListener("pointerdown", unlock, { capture: true, once: true });
      window.addEventListener("touchstart", unlock, { capture: true, once: true });
      window.addEventListener("keydown", unlock, { capture: true, once: true });
      setNeedsConsent(true);
    }

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: "Memorial Hymn",
        artist: "",
        album: "In Eternal Memory",
      });
    }
  }, []);

  const ramp = (to = 0.35, ms = 400) => {
    const g = gainNodeRef.current;
    if (!g) return;
    const now = ctxRef.current.currentTime;
    g.gain.cancelScheduledValues(now);
    g.gain.setValueAtTime(g.gain.value, now);
    g.gain.linearRampToValueAtTime(to, now + ms / 1000);
  };

  const attemptPlay = async () => {
    try {
      const el = audioRef.current;
      if (!el) return;
      // iOS resumes context only on gesture
      if (ctxRef.current?.state === "suspended") {
        await ctxRef.current.resume();
      }
      el.volume = 1; // we control loudness via gain node
      await el.play(); // may throw if blocked
      ramp(0.35, 450); // fade in
      setIsPlaying(true);
      setNeedsConsent(false);
      localStorage.setItem("hymn_autoplay_ok", "1");
    } catch {
      setNeedsConsent(true);
      setIsPlaying(false);
    }
  };

  const pause = () => {
    const el = audioRef.current;
    if (!el) return;
    // fade out then pause
    ramp(0, 350);
    setTimeout(() => {
      el.pause();
      setIsPlaying(false);
    }, 360);
  };

  const toggle = () => (isPlaying ? pause() : attemptPlay());

  return (
    <>
      {/* Hidden audio element (loops until paused) */}
      <audio ref={audioRef} loop preload="metadata">
        <source src="/audio/For All the Saints  Hymn with Lyrics  Dementia friendly - Spiritual Eldercare.mp3" type="audio/mpeg" />
        <source src="/audio/For All the Saints  Hymn with Lyrics  Dementia friendly - Spiritual Eldercare.ogg" type="audio/ogg" />
      </audio>

      {/* Consent pill (refined look). Shows only if autoplay is blocked. */}
      {needsConsent && (
        <button
          type="button"
          onClick={attemptPlay}
          className="
            fixed left-1/2 -translate-x-1/2 bottom-5 z-[60]
            px-4 py-2 rounded-full text-sm font-medium
            bg-[#D4AF37] text-white
            shadow-[0_10px_30px_rgba(0,0,0,.25)]
            border border-white/40
            hover:translate-y-[-1px] transition
          "
          aria-label="Tap to play hymn"
        >
          🎵 Tap to play hymn
        </button>
      )}

      {/* Floating circular control (bottom-right) */}
      <button
        type="button"
        onClick={toggle}
        title={isPlaying ? "Pause hymn" : "Play hymn"}
        aria-label={isPlaying ? "Pause hymn" : "Play hymn"}
        className="
          fixed right-4 bottom-4 z-[60]
          w-12 h-12 rounded-full
          bg-[#D4AF37] text-white
          backdrop-blur-md border border-white/30
          shadow-[0_10px_30px_rgba(0,0,0,.25)]
          hover:bg-black/65 transition grid place-items-center
        "
      >
        {/* Simple SVG icons so no deps */}
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7-11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
