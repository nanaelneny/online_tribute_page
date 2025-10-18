import { useState } from "react";
import { motion } from "framer-motion";
import TributeForm from "./components/TributeForm.jsx";
import TributeList from "./components/TributeList.jsx";

/** Use one image for all three, or import three different ones */
import centerPortrait from "./components/AnyConv.com__G1NeKZvWsAExEmg.jpg";  // change if you have another
import leftPortrait from "./components/AnyConv.com__G1NeKZvWsAExEmg.jpg";   // change if you have another
import rightPortrait from "./components/AnyConv.com__G1NeKZvWsAExEmg.jpg";  // change if you have another

export default function App() {
  const [showForm, setShowForm] = useState(false);

  const onLeaveTribute = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('tribute-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Text you can change anytime
  const nameScript = "Professor Emeritus Daniel Mireku-Gyimah";
  const nameBlock  = "Professor Emeritus Daniel Mireku-Gyimah";
  const lifespan   = "1952–2025";
  const epitaph    = "Forever in Our Hearts";

   return (
    <div className="min-h-screen flex flex-col">
      {/* ===================== HERO ===================== */}
      <header className="relative min-h-[92vh] overflow-hidden">
        {/* Full-bleed image (robust) */}
        <img
          src={centerPortrait}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />

      {/* Subtle grain texture over the hero */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml;utf8,\
        <svg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\' viewBox=\'0 0 140 140\'>\
        <filter id=\'n\'>\
        <feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/>\
        <feColorMatrix type=\'saturate\' values=\'0\'/>\
        </filter>\
        <rect width=\'100%\' height=\'100%\' filter=\'url(#n)\' opacity=\'0.6\'/>\
        </svg>")'
          }}
        />

      {/* Gold vignette + bottom fade so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(90%_60%_at_50%_10%,rgba(212,175,55,0.15)_0%,transparent_60%)]"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)'
        }}
      />


      {/* Content pinned near the bottom, centered */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-3xl px-5 pt-16 pb-10 flex flex-col items-center text-center"
      >
        <p className="tracking-[.18em] text-[11px] sm:text-xs text-white/80">IN LOVING MEMORY OF</p>

        <div className="mt-1 text-[34px] sm:text-[42px] font-['Great_Vibes'] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
          {nameScript}
        </div>

        <div className="mt-2 text-[13px] text-white/85">{lifespan}</div>

        <div className="mt-3 flex items-center gap-3 text-white/80">
          <span className="h-px w-8 bg-white/50" />
          <span className="text-[12px] italic">{epitaph}</span>
          <span className="h-px w-8 bg-white/50" />
        </div>

        {/* CTA with gold accent */}
        <div className="mt-6">
          <button className="gold-button" onClick={onLeaveTribute}>
            {showForm ? "Hide Tribute Form" : "Leave a Tribute"}
          </button>
        </div>
      </motion.div>
    </header>


      {/* ===================== MAIN ===================== */}
      <main className="-mt-10 relative z-20">
        {/* glass panel that sits on the lower part of the photo */}
        <section className="mx-auto max-w-3xl px-5">
          {showForm && (
            <section id="tribute-form" className="mx-auto max-w-3xl px-5 mt-6">
              <div className="glass rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
                <TributeForm />
              </div>
            </section>
          )}
        </section>

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


      {/* ===================== FOOTER ===================== */}
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