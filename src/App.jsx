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

  // Text you can change anytime
  const nameScript = "Professor Emeritus Daniel Mireku-Gyimah";
  const nameBlock  = "Professor Emeritus Daniel Mireku-Gyimah";
  const lifespan   = "1952–2025";
  const epitaph    = "Forever in Our Hearts";

   return (
    <div className="min-h-screen flex flex-col">
      {/* ===================== HERO ===================== */}
      <header className="pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl px-5"
        >
          {/* Three-phone composition */}
          <div className="relative mx-auto max-w-6xl h-[560px] md:h-[620px]">
            {/* gold glow behind */}
            <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
              <div className="mt-6 h-[420px] w-[420px] md:h-[520px] md:w-[520px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(212,175,55,0.16)_0%,rgba(212,175,55,0.06)_40%,transparent_70%)]" />
            </div>

            {/* LEFT phone (decor) */}
            <div
              className="hidden sm:block absolute left-1/2 -translate-x-[140%] top-16
                         rounded-[2rem] overflow-hidden
                         w-[190px] md:w-[230px] aspect-[9/16]
                         border border-black/10
                         shadow-[0_18px_60px_rgba(0,0,0,0.25)]
                         -rotate-6"
              style={{
                backgroundImage: `url(${leftPortrait})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 rounded-[2rem] pointer-events-none" style={{ boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.35)" }} />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />
            </div>

            {/* RIGHT phone (decor) */}
            <div
              className="hidden sm:block absolute left-1/2 translate-x-[140%] top-20
                         rounded-[2rem] overflow-hidden
                         w-[190px] md:w-[230px] aspect-[9/16]
                         border border-black/10
                         shadow-[0_18px_60px_rgba(0,0,0,0.25)]
                         rotate-6"
              style={{
                backgroundImage: `url(${rightPortrait})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 rounded-[2rem] pointer-events-none" style={{ boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.35)" }} />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />
            </div>

            {/* CENTER phone (main) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0">
              <div
                className="relative rounded-[2.2rem] overflow-hidden
                           w-[300px] sm:w-[360px] md:w-[420px] aspect-[9/16]
                           border border-black/10
                           shadow-[0_25px_90px_rgba(0,0,0,0.35)] bg-black"
                style={{
                  backgroundImage: `url(${centerPortrait})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top", // face-first crop
                }}
              >
                {/* subtle gold rim & vignette */}
                <div className="absolute inset-0 rounded-[2.2rem] pointer-events-none" style={{ boxShadow: "inset 0 0 0 2px rgba(212,175,55,0.28)" }} />
                <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.22)_100%)]" />
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1 w-20 rounded-full bg-black/30" />
              </div>
            </div>
          </div>

          {/* Text block under phones */}
          <div className="text-center mt-2">
            <p className="tracking-[.18em] text-[11px] sm:text-xs text-black/60">
              IN LOVING MEMORY OF
            </p>

            <div className="mt-1 text-[30px] sm:text-[36px] font-['Great_Vibes'] text-black/80">
              {nameScript}
            </div>

            <div className="mt-1 text-[13px] text-black/60">{lifespan}</div>

            <div className="mt-3 flex items-center justify-center gap-3 text-black/60">
              <span className="h-px w-8 bg-[#D4AF37]/60" />
              <span className="text-[12px] italic">{epitaph}</span>
              <span className="h-px w-8 bg-[#D4AF37]/60" />
            </div>

            <div className="mt-6">
              <button className="gold-button" onClick={() => setShowForm(v => !v)}>
                {showForm ? "Hide Tribute Form" : "Leave a Tribute"}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* ===================== MAIN ===================== */}
      <main className="flex-1">
        {showForm && (
          <section className="mx-auto max-w-3xl px-5 mt-6">
            <TributeForm />
          </section>
        )}

        <section className="mx-auto max-w-3xl px-5 mt-8 mb-16">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold tracking-wide text-black/80">Tributes</h2>
            <p className="text-sm text-black/50">Newest messages appear first</p>
          </div>

          {/* contained scroll area */}
          <div className="max-h-[520px] overflow-y-auto pr-1">
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