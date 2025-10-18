import { useState } from "react";
import { motion } from "framer-motion";
import TributeForm from "./components/TributeForm.jsx";
import TributeList from "./components/TributeList.jsx";
import centerPortrait from "./components/AnyConv_LE_upscale_balanced_x4.jpg";

export default function App() {
  const [showForm, setShowForm] = useState(false);

  // Click handler that actually toggles
  const onToggleTribute = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
      setTimeout(() => {
        document.getElementById("tribute-form")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  // Text
  const nameScript = "Professor Emeritus Daniel Mireku-Gyimah";
  const nameBlock  = "Professor Emeritus Daniel Mireku-Gyimah"; // used in footer
  const lifespan   = "1952–2025";
  const epitaph    = "Forever in Our Hearts";

  return (
    <div className="min-h-screen flex flex-col">
      {/* ============== HERO ============== */}
      <header className="relative min-h-[92vh] overflow-hidden">
        {/* Full-bleed image (object position nudged so face sits higher) */}
        <img
          src={centerPortrait}
          alt=""
          className="hero-img absolute inset-0 w-full h-full object-cover object-[50%_22%] sm:object-[50%_20%]"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />

        {/* Subtle grain (doesn't block clicks) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\' viewBox=\'0 0 140 140\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix type=\'saturate\' values=\'0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(#n)\' opacity=\'0.6\'/></svg>")',
          }}
        />

        {/* Overlays: gold glow + bottom dark fade (click-through) */}
        <div className="hero-bottom-fade" />

        {/* Content anchored to bottom (safe-area aware) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="
            relative z-10 mx-auto max-w-3xl px-5
            min-h-[92vh] flex flex-col items-center justify-end text-center
            pt-[max(12px,env(safe-area-inset-top))]
            pb-[max(28px,env(safe-area-inset-bottom))]
          "
        >
          <p className="hero-name _strokeBright tracking-[.18em] text-[11px] sm:text-xs text-white/90">
            IN LOVING MEMORY OF
          </p>

          <div className="hero-caption mt-2 text-white/95">
            <div className="hero-name text-[34px] sm:text-[42px] font-['Great_Vibes'] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              {nameScript}
            </div>

            <div className="hero-name _strokeBright mt-1 text-[13px]">{lifespan}</div>

            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-white/60" />
              <span className="hero-name _strokeBright text-[12px] italic">{epitaph}</span>
              <span className="h-px w-8 bg-white/60" />
            </div>
          </div>

          <div className="mt-4">
            <button className="gold-button" onClick={onToggleTribute}>
              {showForm ? "Hide Tribute Form" : "Leave a Tribute"}
            </button>
          </div>
        </motion.div>
      </header>

      {/* ============== MAIN ============== */}
      <main className="-mt-10 relative z-20">
        {/* Glass panel sits on the lower part of the photo */}
        {showForm && (
          <section id="tribute-form" className="mx-auto max-w-3xl px-5 mt-6">
            <div className="glass rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
              <TributeForm />
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-5 mt-6 mb-14">
          <div className="text-center mb-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            <h2 className="text-lg font-semibold tracking-wide">Tributes</h2>
            <p className="text-sm opacity-90">Newest messages appear first</p>
          </div>

          <div className="glass rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.15)] max-h-[56vh] overflow-y-auto">
            <TributeList />
          </div>
        </section>
      </main>

      {/* ============== FOOTER ============== */}
      <footer className="py-10 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <div className="w-full h-[1px]" style={{ backgroundColor: "#D4AF37" }} />
          <p className="mt-4 font-serif text-sm text-black/70">
            In Eternal Memory of {nameBlock} — Forever in Our Hearts.
          </p>
        </div>
      </footer>
    </div>
  );
}
