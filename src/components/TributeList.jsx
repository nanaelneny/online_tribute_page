import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { motion, AnimatePresence } from 'framer-motion'

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const intervals = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [label, secs] of intervals) {
    const count = Math.floor(seconds / secs)
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

export default function TributeList() {
  const [tributes, setTributes] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'tributes'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => {
        const data = d.data()
        const ts = data.createdAt?.toDate ? data.createdAt.toDate() : new Date()
        return { id: d.id, ...data, createdAtDate: ts }
      })
      setTributes(items)
    })
    return () => unsub()
  }, [])

  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {tributes.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="card p-5"
          >
            <p className="font-serif text-lg leading-relaxed">{t.message}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="opacity-80">
                <span className="font-medium">{t.name}</span>
                {t.title ? <span className="opacity-75"> — {t.title}</span> : null}
              </div>
              <div className="opacity-60">{timeAgo(t.createdAtDate)}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}


