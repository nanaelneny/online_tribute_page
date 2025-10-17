import { motion } from 'framer-motion'
import TributeForm from './components/TributeForm.jsx'
import TributeList from './components/TributeList.jsx'
import portraitUrl from '/vite.svg'

export default function App() {
  const name = 'Full Name Here'
  const lifespan = '1945–2025'
  const epitaph = 'Forever in Our Hearts'

  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl px-5 text-center"
        >
          <div className="inline-block p-1 rounded-full" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4" style={{ borderColor: '#D4AF37' }}>
              <img src={portraitUrl} alt="Portrait" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-widest uppercase">{name}</h1>
          <p className="mt-2 text-lg tracking-wide opacity-80">{lifespan}</p>
          <p className="mt-4 italic font-serif text-xl text-black/80">{epitaph}</p>
          <div className="mt-6 w-24 h-[2px] mx-auto" style={{ backgroundColor: '#D4AF37' }} />
        </motion.div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-5">
          <TributeForm />
        </section>

        <section className="mx-auto max-w-3xl px-5 mt-8 mb-16">
          <TributeList />
        </section>
      </main>

      <footer className="py-10 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <div className="w-full h-[1px]" style={{ backgroundColor: '#D4AF37' }} />
          <p className="mt-4 font-serif text-sm text-black/70">In Eternal Memory of {name} — Forever in Our Hearts.</p>
        </div>
      </footer>
    </div>
  )
}


